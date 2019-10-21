import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/de';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})

export class MatchComponent implements OnInit {

  id: string;
  tournamentId: string;
  matchForm: FormGroup;
  match: Observable<any[]>;
  formVal: any;
  owlStartDateTime: any;
  matchSubscription: any;

  constructor(public fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private firestore: AngularFirestore,
              private authenticationService: AuthenticationService) {
    this.id = this.route.snapshot.params['matchId'];
    this.tournamentId = this.route.snapshot.params['id'];
    this.match = this.firestore.collection('tournaments')
    .doc(this.tournamentId)
    .collection('matches')
    .doc(this.id)
    .valueChanges() as Observable<any[]>;
  }

  ngOnInit() {

    moment.locale('de');

    this.matchSubscription = this.match.subscribe(val => {
        this.formVal = val;
        this.owlStartDateTime = this.formVal.startDateTime;
        this.updateForm();
        });
    this.updateFormClean();
  }

   ngOnDestroy() {
     this.matchSubscription.unsubscribe();
   }

  updateForm()
  {
    this.matchForm = this.fb.group({
        startDateTime: [this.formVal.startDateTime],
        spiel1Spieler1: [this.formVal.spiel1Spieler1],
        spiel2Spieler1: [this.formVal.spiel2Spieler1],
        spiel3Spieler1: [this.formVal.spiel3Spieler1],
        spiel1Spieler2: [this.formVal.spiel1Spieler2],
        spiel2Spieler2: [this.formVal.spiel2Spieler2],
        spiel3Spieler2: [this.formVal.spiel3Spieler2],
    })
  }

  updateFormClean()
  {
    this.matchForm = this.fb.group({
        startDateTime: new FormControl(),
        spiel1Spieler1: [''],
        spiel2Spieler1: [''],
        spiel3Spieler1: [''],
        spiel1Spieler2: [''],
        spiel2Spieler2: [''],
        spiel3Spieler2: [''],
    })
  }
  userIsPlayer() {
      if(this.formVal == undefined)
      {
          return false;
      }
        if(this.authenticationService.GetCurrentUserMail() === this.formVal.spieler1)
        {
            return true;
        }
        else if(this.authenticationService.GetCurrentUserMail() === this.formVal.spieler2)
        {
            return true;
        }
        else
        {
            return false;
        }
  }

  goToBannPage() {
    this.router.navigate(['tournaments/' + this.tournamentId + '/matches/' + this.id + '/doBann']);
  }

  onClickSubmit(formData) {
    this.firestore.collection('tournaments').doc(this.tournamentId).collection('matches').doc(this.id).update(formData.value);
    formData.resetForm();
  }
}
