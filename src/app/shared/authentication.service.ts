import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userData: Observable<firebase.User>;
  public loginError: any;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
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
      return this.angularFireAuth.auth.signInWithPopup(provider).then((res) => {
        this.router.navigate(['']);
      }).catch((error) => {
        window.alert(error);
      });
  }

  SigninWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider())
        .then(res => {
            console.log('Successfully logged in!')
        }).catch(error => {
            console.log(error);
            this.loginError = error;
        });
  }

  SigninWithGoogleAlternative() {
    return this.OAuthProvider(new auth.GoogleAuthProvider())
        .then(res => {
            console.log('Successfully logged in!')
        }).catch(error => {
            console.log(error);
            this.loginError = error;
        });
  }

  SigninWithFacebook() {
    return this.OAuthProvider(new auth.FacebookAuthProvider())
        .then(res => {
            console.log('Successfully logged in!')
        }).catch(error => {
            console.log(error)
            this.loginError = error;
        });
  }


  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
        this.router.navigate(['']);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
        this.loginError = error.message;
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
        this.router.navigate(['']);
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
        this.loginError = err.message;
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
    this.router.navigate(['']);
  }
}
