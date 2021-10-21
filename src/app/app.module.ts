import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { AuthService } from './guards/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EventEmitterService as EventEmitter } from './services/event-emitter.service';
import { HttpClientModule }    from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { MyComponents } from './view.components';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { GoogleChartsModule } from 'angular-google-charts';
import { RegistrationComponent } from './views/registration/registration.component';
import { ChartsModule } from 'ng2-charts';
import { ResetPassLinkComponent } from './views/reset-pass-link/reset-pass-link.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true 
};
   

// const JWT_Module_Options: JwtModuleOptions = {};

@NgModule({ 
  declarations: [
    AppComponent, 
    MyComponents,
    LoaderComponent,
    RegistrationComponent,
    ResetPassLinkComponent,
    ResetPasswordComponent
  ], 
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    PerfectScrollbarModule, 
    NgbModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    ChartsModule
    
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  providers: [
    AuthGuard,AuthService,EventEmitter,
    {provide: PERFECT_SCROLLBAR_CONFIG,useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
  ],
  bootstrap:[AppComponent]
 
})
export class AppModule { }


