import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter } from "rxjs/operators";

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss']
})

export class TournamentDetailsComponent implements OnInit {

  id: string;
  db: AngularFirestore;
  matchesToday: Observable<any[]>;
  matchesTomorrow: Observable<any[]>;
  matchesRest: Observable<any[]>;
  tournament: Observable<any[]>;

  constructor(private route: ActivatedRoute, private router: Router, db: AngularFirestore) {
    this.db = db;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.tournament = this.db.collection('tournaments').doc(this.id).valueChanges() as Observable<any[]>;

    var todayStart = new Date();
    todayStart.setHours(0,0,-5,0);
    var tomorrowStart = new Date();
    tomorrowStart.setDate(todayStart.getDate()+2);
    tomorrowStart.setHours(0,0,0,0);
    var tomorrowEnd = new Date();
    tomorrowEnd.setDate(tomorrowStart.getDate()+1);
    tomorrowEnd.setHours(0,0,0,0);

    this.matchesToday = this.db.collection('tournaments')
    .doc(this.id).collection('matches', ref => ref.orderBy('startDateTime').startAt(todayStart).endAt(tomorrowStart)).valueChanges({idField: 'id'});

    this.matchesTomorrow = this.db.collection('tournaments')
    .doc(this.id).collection('matches', ref => ref.orderBy('startDateTime').startAt(tomorrowStart).endAt(tomorrowEnd)).valueChanges({idField: 'id'});

    this.matchesRest = this.db.collection('tournaments')
    .doc(this.id).collection('matches', ref => ref.orderBy('startDateTime').startAt(tomorrowEnd)).valueChanges({idField: 'id'});
  }

  MatchDetails(id, tournamentId)
  {
    this.router.navigate(['tournaments', tournamentId, 'matches', id]);
  }
}
