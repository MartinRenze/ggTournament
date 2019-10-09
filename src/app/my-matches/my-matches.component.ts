import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, filter } from "rxjs/operators";
import { AuthenticationService } from '../shared/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent implements OnInit {

  matches: Observable<any[]>;
  authenticationService: AuthenticationService;
  tournaments: Observable<any[]>;
  authSubscription: any;
  tournamentSubscription: any;

  constructor(private db: AngularFirestore, authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService = authenticationService;
    this.tournaments = this.db.collection('tournaments').valueChanges({idField: 'id'});
  }

  ngOnInit() {


    this.authSubscription = this.authenticationService.userData.subscribe(user => {
      if(user) {
        this.tournamentSubscription = this.tournaments.subscribe(tournaments => {
            tournaments.forEach(tournament => {
                if(this.matches == undefined)
                {
                    this.matches = this.orQuery(user.email, tournament.id);
                }
                else
                {
                    const $old = this.orQuery(user.email, tournament.id);//.subscribe(data => console.log(data));
                    const $neww = this.matches;

                    this.matches = combineLatest($old, $neww).pipe(
                        map(([old, neww]) => [...old, ...neww])
                    );
                }
            });
          });
      }
    });
  }

   ngOnDestroy() {
     if(this.authSubscription != undefined)
     {
       this.authSubscription.unsubscribe();
     }
     if(this.tournamentSubscription != undefined)
     {
       this.tournamentSubscription.unsubscribe();
     }


   }

  orQuery(myMail, tournamentId){
    const $player1 = this.db.collection('tournaments')
    .doc(tournamentId).collection('matches', ref => ref.where('spieler1', '==', myMail))
    .valueChanges({idField: 'id'});
    const $player2 = this.db.collection('tournaments')
    .doc(tournamentId).collection('matches', ref => ref.where('spieler2', '==', myMail))
    .valueChanges({idField: 'id'});

    return combineLatest($player1,$player2).pipe(
        map(([player1, player2]) => [...player1, ...player2])
    )
    }

  MatchDetails(id, tournamentId)
  {
    this.router.navigate(['tournaments', tournamentId, 'matches', id]);
  }

}
