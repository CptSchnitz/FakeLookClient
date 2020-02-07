import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsService } from './services/TagsService/tags-service.service';
import { GeolocationService } from './services/geolocationService/geolocation.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TagsControlComponent } from './components/tags-control/tags-control.component';



@NgModule({
  declarations: [TagsControlComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    FontAwesomeModule
  ],
  exports: [TagsControlComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [TagsService, GeolocationService]
    };
  }
 }
