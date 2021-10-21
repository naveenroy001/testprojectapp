import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { Page404Component } from './views/common/page404/page404.component';
import { RegistrationComponent } from './views/registration/registration.component';
import { ResetPassLinkComponent } from './views/reset-pass-link/reset-pass-link.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

const routes: Routes = [


  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgotpassword', component: ResetPassLinkComponent},
  { path: 'password/reset/:token', component: ResetPasswordComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component },


 
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
