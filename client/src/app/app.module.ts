import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobFormComponent } from './job-form/job-form.component';

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    SigninComponent,
    SignupComponent,
    JobDetailsComponent,
    JobFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
