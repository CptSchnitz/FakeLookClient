import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsService } from './services/TagsService/tags-service.service';
import { GeolocationService } from './services/geolocationService/geolocation.service';
import { NgbTypeaheadModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TagsControlComponent } from './components/tags-control/tags-control.component';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TagComponent } from './components/tag/tag.component';
import { NotificationService } from './services/notificationService/notification.service';
import { SocketService } from './services/socketService/socket.service';



@NgModule({
  declarations: [TagsControlComponent, LocationSelectorComponent, TagComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    FontAwesomeModule,
    GoogleMapsModule,
    NgbModalModule
  ],
  exports: [TagsControlComponent, LocationSelectorComponent, TagComponent],
  entryComponents: [LocationSelectorComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [TagsService, GeolocationService]
    };
  }
 }
