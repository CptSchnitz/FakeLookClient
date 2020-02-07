import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/users/users.service';
import { HttpClientModule } from '@angular/common/http';
import { UserTagsControlComponent } from './components/user-tags-control/user-tags-control.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [UserTagsControlComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbTypeaheadModule,
    FontAwesomeModule
  ],
  exports: [UserTagsControlComponent],
  providers: [UsersService]
})
export class SocialModule { }
