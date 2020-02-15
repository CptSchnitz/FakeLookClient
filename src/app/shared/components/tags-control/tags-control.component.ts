import { Component, OnInit, OnDestroy, Input, forwardRef } from '@angular/core';
import { TagsService } from '../../services/TagsService/tags-service.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject, Observable, of } from 'rxjs';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
  switchMap,
  catchError,
  map
} from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-tags-control',
  templateUrl: './tags-control.component.html',
  styleUrls: ['./tags-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsControlComponent),
      multi: true
    }
  ]
})
export class TagsControlComponent implements OnDestroy, ControlValueAccessor {
  private unsubscribe$ = new Subject<void>();
  faTimes = faTimes;
  searching = false;
  searchFailed = false;
  @Input()
  disabled = false;

  constructor(private tagService: TagsService) {}

  tags: string[] = [];

  addTag(tag: string) {
    if (!this.disabled) {
      this.tags.push(tag);
      this.onChange(this.tags);
      this.onTouched();
    }
  }

  removeTag(tagIndex: number) {
    if (!this.disabled) {
      this.tags.splice(tagIndex, 1);
      this.onChange(this.tags);
      this.onTouched();
    }
  }

  searchTags = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      tap(() => (this.searching = true)),
      switchMap(term =>
        this.tagService.getTags(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            console.log('error');
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      map(tags =>
        tags
          .filter(tag => !this.tags.includes(tag))
          .slice(0, 10)
          .map(tag => tag.name)
      ),
      tap(() => (this.searching = false))
    )
    
  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  writeValue(obj: string[]): void {
    this.tags = obj;
    this.onChange(this.tags);
  }

  registerOnChange(fn: (tags: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange = (tags: string[]) => {};
  onTouched = () => {};
}
