import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { GeolocationService } from 'src/app/shared/services/geolocationService/geolocation.service';
import { SimpleUser } from 'src/app/social/model/simpleUser.model';
import { Subject } from 'rxjs';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from '../../services/posts-service/posts.service';
import { ValidateImageType } from 'src/app/shared/validators/validateImageType.validator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationSelectorComponent } from 'src/app/shared/components/location-selector/location-selector.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  postTags: string[] = [];
  fileName = 'Image';

  faTimes = faTimes;

  constructor(private geoService: GeolocationService, private postsService: PostsService,
              private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  postForm = new FormGroup({
    text: new FormControl('', Validators.maxLength(500)),
    image: new FormControl('', [Validators.required, ValidateImageType]),
    location: new FormGroup({
      lat: new FormControl(null, [Validators.min(-90), Validators.max(90), Validators.required]),
      lng: new FormControl(null, [Validators.min(-180), Validators.max(180), Validators.required]),
    }),
    tags: new FormControl([]),
    userTags: new FormControl([]),
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
  }

  onSubmit() {
    const userArr = this.postForm.get('userTags').value as SimpleUser[];
    const post = { ...this.postForm.value, userTags: userArr.map((user) => user.userId) };
    this.postsService.createPost(post).subscribe(({ postId }) => {
      this.toastr.success('the post was created', 'we did it!',{progressBar: true});
      this.router.navigate(['/posts/details', postId]);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  onImageChange(event) {
    this.image.markAsTouched();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileName = file.name;
      this.postForm.patchValue({
        image: file
      });
    } else {
      this.postForm.get('image').reset();
      this.fileName = 'Image';
    }
  }

  openLocationSelector() {
    const modal = this.modalService.open(LocationSelectorComponent, { size: 'lg' });
    modal.componentInstance.point = this.postForm.get('location').value;
    modal.result.then((point) => {
      this.postForm.get('location').patchValue(point);
    }, () => { })
  }
}
