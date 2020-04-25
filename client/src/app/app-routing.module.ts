import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from "./job-list/job-list.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { JobFormComponent } from "./job-form/job-form.component";
import { JobDetailsComponent } from "./job-details/job-details.component";

const routes: Routes = [
	{ path: "", component: JobListComponent },
	{ path: "signin", component: SigninComponent },
	{ path: "signup", component: SignupComponent },
	{ path: "new", component: JobFormComponent },
	{ path: ":job-slug", component: JobDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
