import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VerticalNavComponent } from './vertical-nav/vertical-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MutualFundsComponent } from './mutual-funds/mutual-funds.component';
import { FixedDepositeComponent } from './fixed-deposite/fixed-deposite.component';
import { RDepositeComponent } from './r-deposite/r-deposite.component';
import { appRoutingModule } from './app-routing.module';
import { GoalsComponent } from './goals/goals.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { DashboardService } from './Services/dashboard.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpConfigInterceptor } from './Services/HttpConfigInterceptor';
import { AuthGuardService } from './Services/auth-guard.service';
import { AdminModule } from './AdminModule/admin/admin.module';
import { CanLoadGuard } from './Services/can-load.guard';
import { RefreshTokenInterceptor } from './Services/RefreshTokenInterface';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    VerticalNavComponent,
    DashboardComponent,
    MutualFundsComponent,
    FixedDepositeComponent,
    RDepositeComponent,
    GoalsComponent,
    LoginComponent,
    SignUpComponent
  ], 
  imports: [
    BrowserModule,
    FontAwesomeModule,
    appRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
 
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:RefreshTokenInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:HttpConfigInterceptor,multi:true},
    DashboardService,
    AuthGuardService,
    CanLoadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
