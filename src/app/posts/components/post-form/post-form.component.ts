import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { GeolocationService } from 'src/app/shared/services/geolocationService/geolocation.service';
import { UsersService } from 'src/app/social/services/users/users.service';
import { SimpleUser } from 'src/app/social/model/simpleUser.model';
import { Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  users: SimpleUser[] = [];
  postTags: string[] = [];
  userTags: SimpleUser[] = [];

  faTimes = faTimes;

  constructor(private geoService: GeolocationService, private userService: UsersService) { }

  postForm = new FormGroup({
    text: new FormControl('', Validators.maxLength(500)),
    image: new FormControl('', Validators.required),
    location: new FormGroup({
      lat: new FormControl(null, [Validators.min(-180), Validators.max(180), Validators.required]),
      lng: new FormControl(null, [Validators.min(-90), Validators.max(90), Validators.required]),
    }),
    tags: new FormArray([]),
    userTags: new FormArray([]),
  });

  get text() {
    return this.postForm.get('text');
  }

  get image() {
    return this.postForm.get('image');
  }

  get lng() {
    return this.postForm.get('location.lng');
  }

  get lat() {
    return this.postForm.get('location.lat');
  }


  ngOnInit() {
    this.geoService.getLocation().then((location) => {
      const locationGroup = this.postForm.get('location');
      locationGroup.get('lat').patchValue(location.lat);
      locationGroup.get('lng').patchValue(location.lng);
    });

    this.userService
      .getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users) => {
        this.users = users;
      });
  }

  addTag(tag: string) {
    if (tag.length && !this.postTags.find((t) => t === tag)) {
      this.postTags.push(tag);
      const tagsArray = this.postForm.get('tags') as FormArray;
      tagsArray.push(new FormControl(tag));
    }
  }

  removeTag(tagIndex: number) {
    this.postTags.splice(tagIndex, 1);
    const tagsArray = this.postForm.get('tags') as FormArray;
    tagsArray.removeAt(tagIndex);
  }

  addUserTag(selectedUser: NgbTypeaheadSelectItemEvent) {
    const user = selectedUser.item as SimpleUser;
    this.userTags.push(user);
    const tagsArray = this.postForm.get('userTags') as FormArray;
    tagsArray.push(new FormControl(user.userId));
  }

  removeUserTag(tagIndex: number) {
    this.userTags.splice(tagIndex, 1);
    const tagsArray = this.postForm.get('userTags') as FormArray;
    tagsArray.removeAt(tagIndex);
  }

  onSubmit() {
    console.log(this.postForm.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  userFormatter = (user: SimpleUser) => `${user.firstName} ${user.lastName}`;
  emptyFormatter = (user: SimpleUser) => '';

  searchUsers = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term) => term.length >= 2),
    map((term) => this.users.filter((user) => {
      const userName = `${user.firstName} ${user.lastName}`;
      const isUserTagged = this.userTags.findIndex((ut) => ut.userId === user.userId) !== -1;
      const isUserContainsTerm = new RegExp(term, 'iu').test(userName);
      return isUserContainsTerm && !isUserTagged;
    }).slice(0, 10)))

  onImageChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file);
      this.postForm.patchValue({
        image: file
      });
    } else {
      this.postForm.get('image').reset();
    }
  }
}
