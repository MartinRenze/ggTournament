import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import 'moment/locale/de';



@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss']
})
export class AddMatchComponent implements OnInit {

  tournamentId: string;

  constructor(private route: ActivatedRoute, private router: Router, private firestore: AngularFirestore) { }

   onClickSubmit(formData) {
      this.firestore.collection('tournaments').doc(this.tournamentId).collection('matches').add(formData.value);
      formData.resetForm();
   }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params['id'];
    moment.locale('de');
  }

}
