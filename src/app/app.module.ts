import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GeolocationService } from './shared/services/geolocationService/geolocation.service';
import { UsersService } from './social/services/users/users.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbModule, AppRoutingModule, HttpClientModule, FontAwesomeModule],
  providers: [GeolocationService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
