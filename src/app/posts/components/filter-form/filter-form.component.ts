import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { PostFilter } from '../../model/postFilter.model';
import { GeolocationService } from 'src/app/shared/services/geolocationService/geolocation.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements AfterViewInit {
  faCalendar = faCalendarAlt;
  constructor(private geoService: GeolocationService) {}
  filterForm = new FormGroup({
    minDate: new FormControl(),
    maxDate: new FormControl(),
    publishers: new FormControl([]),
    distance: new FormControl(''),
    tags: new FormControl([]),
    userTags: new FormControl([]),
    lat: new FormControl(41.9028),
    lng: new FormControl(12.4964)
  });

  @Output()
  searchSubmitted = new EventEmitter<PostFilter>();

  ngAfterViewInit(): void {
    this.geoService.getLocation().then(point => {
      this.filterForm.patchValue(point);
    });
  }

  onSubmit() {
    const userTags = this.filterForm
      .get('userTags')
      .value.map(user => user.userId);

    const publishers = this.filterForm
      .get('publishers')
      .value.map(user => user.userId);

    const minDate = this.filterForm.get('minDate').value as NgbDateStruct;
    const maxDate = this.filterForm.get('maxDate').value as NgbDateStruct;

    const filters: PostFilter = {
      ...this.filterForm.value,
      userTags,
      publishers,
      minDate: minDate
        ? new Date(minDate.year, minDate.month - 1, minDate.day)
        : null,
      maxDate: maxDate
        ? new Date(maxDate.year, maxDate.month - 1, maxDate.day)
        : null
    };
    filters.distance = filters.distance * 1000;
    this.searchSubmitted.emit(filters);
  }
}
