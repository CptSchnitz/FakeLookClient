import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PostsService } from '../../services/posts-service/posts.service';
import { GeolocationService } from 'src/app/shared/services/geolocationService/geolocation.service';
import { PostSimple } from '../../model/postSimple.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-map-feed',
  templateUrl: './map-feed.component.html',
  styleUrls: ['./map-feed.component.css']
})
export class MapFeedComponent implements AfterViewInit, OnDestroy {

  private posts: PostSimple[] = [];
  private markers: google.maps.Marker[] = [];

  private unsubscribe$ = new Subject<void>();

  @Input()
  Lng: number;

  @Input()
  Lat: number;

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 31.769317, lng: 35.201113 },
    streetViewControl: false,
    mapTypeControl: false,
    rotateControl: false,
    zoom: 8,
    styles: [
      {
        featureType: 'poi',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'transit.station',
        stylers: [
          { visibility: 'off' }
        ]
      }
    ]
  };

  constructor(private postsService: PostsService, private geoService: GeolocationService) { }

  ngAfterViewInit() {
    this.postsService.getPosts().pipe(takeUntil(this.unsubscribe$)).subscribe((posts) => {
      console.log(posts)
      this.posts = posts;
      this.geoService.getLocation().then((userLocation) => {
        this.mapOptions.center = userLocation;
        this.mapInitializer();
      });
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.setMarkers();
  }

  setMarkers() {
    if (this.map) {
      this.removeMarkers();

      this.posts.forEach((post) => {
        this.markers.push(new google.maps.Marker({
          position: post.location,
          map: this.map,
          icon: {
            url: 'http://localhost:4000/images/' + post.image,
            scaledSize: new google.maps.Size(20, 100),
            
          },
          animation: google.maps.Animation.DROP,
          title: post.postId.toString(),
        }));
      });
      console.log(this.markers.length);
    }
  }

  removeMarkers() {
    this.markers.forEach((marker) => marker.setMap(null));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
