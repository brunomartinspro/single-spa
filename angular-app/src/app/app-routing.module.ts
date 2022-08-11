import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {OceanComponent} from "./ocean/ocean.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {EmptyRouteComponent} from "./empty-route/empty-route.component";

const routes: Routes = [
  
  { path: 'angular', component: AppComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'ocean', component: OceanComponent },
  { path: '**', component: EmptyRouteComponent },

];

@NgModule({
  imports: [ 
    BrowserModule, 
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
