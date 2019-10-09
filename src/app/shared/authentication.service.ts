import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  GetCurrentUserMail() {
    return this.angularFireAuth.auth.currentUser.email;
  }

  GetCurrentUserMailBeforeLogin() {

      return new Promise((resolve, reject) => {
          try {
            var unsubscribe = this.angularFireAuth.auth
             .onAuthStateChanged(user => {
                 resolve(user.email);
                 unsubscribe();
             });
          } catch {
            reject('api failed')
          }
        });
    }

  OAuthProvider(provider) {
      return this.angularFireAuth.auth.signInWithPopup(provider);
  }

  SigninWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider())
        .then(res => {
            console.log('Successfully logged in!')
        }).catch(error => {
            console.log(error)
        });
  }

  SigninWithFacebook() {
    return this.OAuthProvider(new auth.FacebookAuthProvider())
        .then(res => {
            console.log('Successfully logged in!')
        }).catch(error => {
            console.log(error)
        });
  }


  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
  }
}
