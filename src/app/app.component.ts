import { Component, AfterViewInit, Inject, ElementRef } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
// import { environment } from 'src/environments/environment';
import {} from "googlemaps";
import { NotificationService } from './shared/services/notificationService/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent /** implements AfterViewInit */ {
  title = 'FakeLookClient';
  show:boolean = false;
  constructor(private notificationService: NotificationService) {
    
  }
  // constructor(@Inject(DOCUMENT) private document,
  //             private elementRef: ElementRef) { }
  // ngAfterViewInit(): void {
  //   const googleApiKey = environment.googleApiKey;
  //   const script = this.document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
  //   this.elementRef.nativeElement.appendChild(script);
  //}
}
