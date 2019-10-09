import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { ShowTournamentComponent } from './show-tournament/show-tournament.component';
import { SettingsComponent } from './settings/settings.component';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { MatchComponent } from './match/match.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';


const routes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'login-email', component: LoginEmailComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'members', component: MembersComponent},
    { path: 'create-tournament', component: CreateTournamentComponent},
    { path: 'show-tournament', component: ShowTournamentComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'tournaments/:id', component: TournamentDetailsComponent },
    { path: 'tournaments/:id/matches/:matchId', component: MatchComponent },
    { path: 'tournaments/:id/add-match', component: AddMatchComponent },
    { path: 'my-matches', component: MyMatchesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
