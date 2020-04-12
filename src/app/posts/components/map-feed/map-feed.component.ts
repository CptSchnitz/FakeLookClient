import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { PostsService } from '../../services/posts-service/posts.service';
import { GeolocationService } from 'src/app/shared/services/geolocationService/geolocation.service';
import { PostSimple } from '../../model/postSimple.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { PostFilter, OrderPostBy } from '../../model/postFilter.model';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { GeoPoint } from 'src/app/shared/model/geoPoint.model';
import { FeedService } from '../../services/feedService/feed.service';

@Component({
  selector: 'app-map-feed',
  templateUrl: './map-feed.component.html',
  styleUrls: ['./map-feed.component.css'],
  providers: [FeedService]
})
export class MapFeedComponent implements AfterViewInit, OnDestroy {
  private posts: PostSimple[] = [];
  private unsubscribe$ = new Subject<void>();
  postsToDisplay: PostSimple[] = [];
  private maxPostsOnMap = 50;
  private maxPostsAsImages = 3;

  clickedPost: PostSimple = null;

  centerOptions: google.maps.MarkerOptions = {
    icon: { url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
    title: 'your position',
  };

  @Input()
  Lng: number;

  @Input()
  Lat: number;

  center = { lat: 24, lng: 12 };
  zoom = 6;
  @ViewChild('map', { static: false }) gmap: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    rotateControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit.station',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };
  
  constructor(
    private feedService: FeedService,
    private geoService: GeolocationService,
    private toastrService: ToastrService,
  ) { }

  getMarkerOptions(post: PostSimple): google.maps.MarkerOptions {
    const options: google.maps.MarkerOptions = { draggable: false };
    if (this.postsToDisplay.length <= this.maxPostsAsImages) {
      options.icon = {
        url: environment.backendUrl + '/images/thumb/' + post.imageUuid,
        scaledSize: new google.maps.Size(45, 45, 'px', 'px')
      };
    } else {
      options.icon = null;
    }
    return options;
  }

  ngAfterViewInit() {
    this.geoService.getLocation().then(userLocation => {
      this.center = { lat: userLocation.lat, lng: userLocation.lon };
    });
    this.feedService.filterPosts({ orderBy: OrderPostBy.likes });
    this.feedService
      .getPosts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(posts => {
        this.posts = posts;
        this.handleBoundsChange();
      });
  }

  handleSearch(filters: PostFilter) {
    filters.orderBy = OrderPostBy.likes;
    this.feedService.filterPosts(filters);
  }

  handleBoundsChange() {
    this.postsToDisplay = [];
    const mapBounds = this.gmap.getBounds();
    if (mapBounds) {
      let i = 0;
      let currentInBounds = 0;
      while (i < this.posts.length && currentInBounds < this.maxPostsOnMap) {
        const location = this.posts[i].location;
        if (mapBounds.contains(new google.maps.LatLng(location.lat, location.lon))) {
          this.postsToDisplay.push(this.posts[i]);
          currentInBounds++;
        }
        i++;
      }
    }
  }

  openPostWindow(marker, post: PostSimple) {
    this.clickedPost = post;
    this.infoWindow.open(marker);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getLatLng(point: GeoPoint): google.maps.LatLng {
    return new google.maps.LatLng(point.lat, point.lon);
  }
}
