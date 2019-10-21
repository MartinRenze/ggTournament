import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-find-start-time',
    templateUrl: './find-start-time.component.html',
    styleUrls: ['./find-start-time.component.scss']
})
export class FindStartTimeComponent implements OnInit {

    id: string;
    tournamentId: string;
    match: Observable<any[]>;
    bannSpieler: string = '';
    bannSpielerId: string;
    spielerNummer: any;
    matchSubscription: any;
    subscriptionForTime: any;
    oldFormVals: any;
    currentSelectedDateTime: any = { to: "", from: "" };
    maxArrayId: number = 0;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private firestore: AngularFirestore,
        public authenticationService: AuthenticationService) {

        this.id = this.route.snapshot.params['matchId'];
        this.tournamentId = this.route.snapshot.params['id'];
        this.match = this.firestore.collection('tournaments')
            .doc(this.tournamentId)
            .collection('matches')
            .doc(this.id)
            .valueChanges() as Observable<any[]>;
    }

    ngOnInit() {
        this.matchSubscription = this.match.subscribe(val => {
            this.oldFormVals = val;
            if (this.oldFormVals.spieler1 == this.authenticationService.GetCurrentUserMail()) {
                this.spielerNummer = 1;
                this.bannSpieler = this.oldFormVals.spieler1Bann.name_de;
                this.bannSpielerId = this.oldFormVals.spieler1Bann.key;
            }
            else if (this.oldFormVals.spieler2 == this.authenticationService.GetCurrentUserMail()) {
                this.spielerNummer = 2;
                this.bannSpieler = this.oldFormVals.spieler2Bann.name_de;
                this.bannSpielerId = this.oldFormVals.spieler2Bann.key;
            }
        });
    }

    ngOnDestroy() {
        this.matchSubscription.unsubscribe();
    }

    safeMaxId(value: number) {
        if (+value > +this.maxArrayId) {
            this.maxArrayId = value;
        }
    }

    addDatetimeToArray(value) {
        let nextId: number = 0;

        nextId = +this.maxArrayId + 1;

        var addDateTime = {};
        var addDateTimeSub = {};
        addDateTimeSub = { "from": this.currentSelectedDateTime.from, "to": this.currentSelectedDateTime.to };
        if (value == 1) {
            addDateTime['spieler1HasTime.' + nextId] = addDateTimeSub;
            this.checkIfTimematchExists(1);
        }
        else if (value == 2) {
            addDateTime['spieler2HasTime.' + nextId] = addDateTimeSub;
            this.checkIfTimematchExists(2);
        }

        this.firestore.collection('tournaments')
            .doc(this.tournamentId)
            .collection('matches')
            .doc(this.id)
            .update(addDateTime);


    }

    checkIfTimematchExists(value) {

        this.subscriptionForTime = this.match.subscribe(val => {
            this.oldFormVals = val;
            if (value == 1) {
                for (const [key, value] of Object.entries(this.oldFormVals.spieler2HasTime)) {
                    if (this.currentSelectedDateTime.from >= (value as any).from.toDate()) {
                        if (this.currentSelectedDateTime.from <= new Date((value as any).to.toDate() - 15 * 60000)) {
                            console.log("Erfolg", this.currentSelectedDateTime.from);
                            this.subscriptionForTime.unsubscribe();
                            this.firestore.collection('tournaments')
                                .doc(this.tournamentId)
                                .collection('matches')
                                .doc(this.id)
                                .update({startDateTime: this.currentSelectedDateTime.from});
                            break;
                        }
                    }
                    else if ((value as any).from.toDate() >= this.currentSelectedDateTime.from) {
                        if ((value as any).from.toDate() <= new Date(this.currentSelectedDateTime.to - 15 * 60000)) {
                            console.log("Erfolg 2: ", (value as any).from.toDate());
                            this.subscriptionForTime.unsubscribe();
                            this.firestore.collection('tournaments')
                                .doc(this.tournamentId)
                                .collection('matches')
                                .doc(this.id)
                                .update({startDateTime: (value as any).from.toDate()});
                            break;
                        }
                    }
                }
            } else if (value == 2) {
                for (const [key, value] of Object.entries(this.oldFormVals.spieler1HasTime)) {
                    if (this.currentSelectedDateTime.from >= (value as any).from.toDate()) {
                        if (this.currentSelectedDateTime.from <= new Date((value as any).to.toDate() - 15 * 60000)) {
                            console.log("Erfolg", this.currentSelectedDateTime.from);
                            this.subscriptionForTime.unsubscribe();
                            this.firestore.collection('tournaments')
                                .doc(this.tournamentId)
                                .collection('matches')
                                .doc(this.id)
                                .update({startDateTime: this.currentSelectedDateTime.from});
                            break;
                        }
                    }
                    else if ((value as any).from.toDate() >= this.currentSelectedDateTime.from) {
                        if ((value as any).from.toDate() <= new Date(this.currentSelectedDateTime.to - 15 * 60000)) {
                            console.log("Erfolg 2: ", (value as any).from.toDate());
                            this.subscriptionForTime.unsubscribe();
                            this.firestore.collection('tournaments')
                                .doc(this.tournamentId)
                                .collection('matches')
                                .doc(this.id)
                                .update({startDateTime: (value as any).from.toDate()});
                            break;
                        }
                    }
                }
            }
        });

    }

    deleteDateTime(id, spielerValue) {
        var deleteDateTime = {};
        if (spielerValue == 1) {
            deleteDateTime['spieler1HasTime.' + id] = firebase.firestore.FieldValue.delete();
        }
        else if (spielerValue == 2) {
            deleteDateTime['spieler2HasTime.' + id] = firebase.firestore.FieldValue.delete();
        }


        this.firestore.collection('tournaments')
            .doc(this.tournamentId)
            .collection('matches')
            .doc(this.id)
            .update(deleteDateTime);

    }


}
