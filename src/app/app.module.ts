import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbModule, BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center', progressBar: true }),
    AppRoutingModule, HttpClientModule, FontAwesomeModule, SharedModule.forRoot()],
  bootstrap: [AppComponent]
})
export class AppModule { }
