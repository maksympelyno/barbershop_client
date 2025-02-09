import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientsComponent } from './components/clients/clients.component';
import { HaircutsComponent } from './components/haircuts/haircuts.component';
import { VisitsComponent } from './components/visits/visits.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RoleGuard } from './guards/role.guard';
import { LoginGuard } from './guards/login.guard';
import { UserRole } from './enums/roles.enum';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.Manager },
  },
  {
    path: 'haircuts',
    component: HaircutsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.Manager },
  },
  {
    path: 'visits',
    component: VisitsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.Manager },
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.Admin },
  },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];
