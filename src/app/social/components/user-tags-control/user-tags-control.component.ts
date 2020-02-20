import { Component, OnInit, OnDestroy, Input, forwardRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap, switchMap, catchError } from 'rxjs/operators';
import { SimpleUser } from '../../model/simpleUser.model';
import { Observable, Subject, of } from 'rxjs';
import { UsersService } from '../../services/users/users.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-user-tags-control',
  templateUrl: './user-tags-control.component.html',
  styleUrls: ['./user-tags-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserTagsControlComponent),
      multi: true
    }
  ]
})
export class UserTagsControlComponent implements OnDestroy, ControlValueAccessor {
  private unsubscribe$ = new Subject<void>();
  faTimes = faTimes;
  searching = false;
  searchFailed = false;
  @Input()
  disabled = false;

  @Input()
  label = 'Tag User';

  constructor(private userService: UsersService) { }

  userTags: SimpleUser[] = [];

  addUserTag(selectedUser: NgbTypeaheadSelectItemEvent) {
    if (!this.disabled) {
      const user = selectedUser.item as SimpleUser;
      this.userTags.push(user);
      this.onChange(this.userTags);
      this.onTouched();
    }
  }

  removeUserTag(tagIndex: number) {
    if (!this.disabled) {
      this.userTags.splice(tagIndex, 1);
      this.onChange(this.userTags);
      this.onTouched();
    }
  }

  userFormatter = (user: SimpleUser) => `${user.firstName} ${user.lastName}`;
  emptyFormatter = (user: SimpleUser) => '';

  searchUsers = (text$: Observable<string>) => text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter((term) => term.length >= 2),
    tap(() => this.searching = true),
    switchMap(term => this.userService.getUsers(term).pipe(
      tap(() => this.searchFailed = false),
      catchError(() => {
        this.searchFailed = true;
        return of([]);
      }))
    ),
    map((users) => users.filter(user => {
      const isUserTagged = this.userTags.findIndex((ut) => ut.userId === user.userId) !== -1;
      return !isUserTagged;
    }).slice(0, 10)),
    tap(() => this.searching = false)
  )
  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
  writeValue(obj: SimpleUser[]): void {
    this.userTags = obj;
    this.onChange(this.userTags);
  }
  registerOnChange(fn: (users: SimpleUser[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange = (users: SimpleUser[]) => { }
  onTouched = () => { }
}
