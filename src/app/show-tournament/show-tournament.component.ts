import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-tournament',
  templateUrl: './show-tournament.component.html',
  styleUrls: ['./show-tournament.component.scss']
})
export class ShowTournamentComponent implements OnInit {

  tournaments: Observable<any[]>;
  db: AngularFirestore;
  authenticationService: AuthenticationService;

  constructor(db: AngularFirestore,
              authenticationService: AuthenticationService,
              private router: Router) {
    this.db = db;
    this.authenticationService = authenticationService;
    this.tournaments = this.db.collection('tournaments').valueChanges({idField: 'id'});
  }

  signIntoTournament(uid)
  {
    var docRef = this.db.collection('tournaments').doc(uid);
    docRef.get().toPromise().then(doc => this.pushArray(doc, uid)).catch(function(error) {
        console.log("Error getting document:", error);
    });


  }

  pushArray(doc, uid)
  {
        if(doc.exists){
            var members: string[]=[];
            var isAlreadyInList: boolean = false;
            var authenticationService: AuthenticationService = this.authenticationService;
            if(!(doc.data().members == undefined))
            {
              doc.data().members.forEach(function (value) {
                members.push(value);
                if(authenticationService.GetCurrentUserMail() === value)
                {
                  isAlreadyInList = true;
                }
              });
            }
            if(!isAlreadyInList)
            {
              members.push(this.authenticationService.GetCurrentUserMail());
              this.db.doc('tournaments/' + uid).update({members:members});
            }
        }
        else {
            console.log("No such document!");
        }

    }

  TournamentDetails(id: string){
    this.router.navigate(['tournaments', id]);
  }


  ngOnInit() {

  }

}
