import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public authenticationService: AuthenticationService) {}


  ngOnInit() {
  }

  SigninWithGoogle()
  {
    this.authenticationService.SigninWithGoogle();
  }

  SigninWithFacebook()
  {
    this.authenticationService.SigninWithFacebook();
  }

}
