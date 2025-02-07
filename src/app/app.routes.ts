import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientsComponent } from './components/clients/clients.component';
import { HaircutsComponent } from './components/haircuts/haircuts.component';
import { VisitsComponent } from './components/visits/visits.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'haircuts', component: HaircutsComponent },
  { path: 'visits', component: VisitsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];
