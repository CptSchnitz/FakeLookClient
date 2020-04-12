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
import { AuthenticationModule } from './authentication/authentication.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotificationService } from './shared/services/notificationService/notification.service';
import { SocketService } from './shared/services/socketService/socket.service';


@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, NgbModule, BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center', progressBar: true }),
    HttpClientModule, FontAwesomeModule, SharedModule.forRoot(), AuthenticationModule, AppRoutingModule,],
  bootstrap: [AppComponent],
})
export class AppModule { }
