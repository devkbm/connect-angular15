import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login/:id', component: LoginComponent },
  {path: 'login', component: LoginComponent },
  {path: 'test', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},
  {path: 'system', loadChildren: () => import('src/app/system/system-management.module').then(m => m.SystemManagementModule)},
  {path: 'hrm', loadChildren: () => import('src/app/hrm/hrm.module').then(m => m.HrmModule)},
  {path: 'grw', loadChildren: () => import('src/app/cooperation/cooperation.module').then(m => m.CooperationModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
