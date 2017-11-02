import { AmazonAutoCompleteService } from './services/amazon-auto-complete.service';
import { AutotcompleteService } from './services/autotcomplete.service';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AmazonComponent } from './amazon/amazon.component';
import { EbayComponent } from './ebay/ebay.component';

import * as alasql from 'alasql';
import { ZippyInstructionsComponent } from './zippy-instructions/zippy-instructions.component';
import { LoginComponent } from './login/login.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'amazon',
    component: AmazonComponent
  },
  {
    path: 'ebay',
    component: EbayComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpFormComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AmazonComponent,
    EbayComponent,
    ZippyInstructionsComponent,
    LoginComponent,
    SignUpFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [
    AmazonAutoCompleteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
