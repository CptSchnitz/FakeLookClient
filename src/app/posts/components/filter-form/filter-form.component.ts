import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { PostFilter } from '../../model/postFilter.model';
import { GeolocationService } from 'src/app/shared/services/geolocationService/geolocation.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {isBefore} from 'date-fns';

// The maximum distance of the buffer cannot exceed 
// 0.999 * π * minorAxis * minorAxis / majorAxis (~0.999 * 1/2 Earth's circumference) 
// of the full globe.
const MAX_DISTANCE = 20017.462;

const DateValidator = (form: FormGroup)=> {
  const minDateValue = form.get('minDate').value;
  const maxDateValue = form.get('maxDate').value;
  if (minDateValue && maxDateValue) {
    const minDate = new Date(minDateValue.year, minDateValue.month - 1, minDateValue.day);
    const maxDate = new Date(maxDateValue.year, maxDateValue.month - 1, maxDateValue.day);
    if (!isBefore(minDate, maxDate)) {
      return {invalidDates: true}
    }
  }
  return null;
}

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
    distance: new FormControl('', [Validators.min(0), Validators.max(MAX_DISTANCE)]),
    tags: new FormControl([]),
    userTags: new FormControl([]),
    lat: new FormControl(41.9028),
    lon: new FormControl(12.4964)
  }, [DateValidator]);

  get distance(){
    return this.filterForm.get('distance');
  }

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
