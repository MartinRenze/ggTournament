import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';

import { AuthenticationService } from './shared/authentication.service';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { ShowTournamentComponent } from './show-tournament/show-tournament.component';
import { SettingsComponent } from './settings/settings.component';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatchComponent } from './match/match.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import { UpdateMatchComponent } from './update-match/update-match.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { ConvertToIngameNamePipe } from './shared/convert-to-ingame-name.pipe';
import { MatIconModule } from '@angular/material';
import { LoginEmailComponent } from './login-email/login-email.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    SignupComponent,
    MembersComponent,
    CreateTournamentComponent,
    ShowTournamentComponent,
    SettingsComponent,
    TournamentDetailsComponent,
    MatchComponent,
    AddMatchComponent,
    MyMatchesComponent,
    UpdateMatchComponent,
    ConvertToIngameNamePipe,
    LoginEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    BrowserAnimationsModule,
    MatTabsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatGridListModule
  ],
  providers: [
    AuthenticationService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'de'}
  ],
  bootstrap: [AppComponent],
  exports: [
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatGridListModule
  ]
})

export class AppModule {

}
