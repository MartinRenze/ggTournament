import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ggTournament';

  constructor(public authenticationService: AuthenticationService) {}

  signOut() {
    this.authenticationService.SignOut();
  }
}
