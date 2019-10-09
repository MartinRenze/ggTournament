import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../shared/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  angForm: FormGroup;
  isSubmitted = false;
  user: Observable<unknown>;
  subscription: any;

  constructor(private fb: FormBuilder, private db: AngularFirestore, public authenticationService: AuthenticationService) {
    this.createFormBlank();
    this.authenticationService.GetCurrentUserMailBeforeLogin().then(email => {
        this.createForm(email);
    }).catch(function (error) {
        console.log(error.message);
        console.log('You are not logged in!');
    });
  }

  createFormBlank() {
      this.angForm = this.fb.group({
      clan: [''],
      ingameName: [''],
      friendLink: [''],
    });
  }

  createForm(email) {
    this.subscription = this.db.collection('users').doc(email).valueChanges().subscribe(val => {
      this.angForm = this.fb.group({
        clan: [(val as any).clan],
        ingameName: [(val as any).ingameName],
        friendLink: [(val as any).friendLink],
      });
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      if(this.authenticationService.GetCurrentUserMail() != null)
      {
        this.db.collection('users').doc(this.authenticationService.GetCurrentUserMail()).set(this.angForm.value);
      }
    }
  }

  ngOnInit() {
  }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }


}
