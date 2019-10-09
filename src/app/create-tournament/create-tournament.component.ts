import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.scss']
})
export class CreateTournamentComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  onClickSubmit(formData) {
      this.firestore.collection('tournaments').add(formData.value);
      formData.resetForm();
   }

  ngOnInit() {
  }

}
