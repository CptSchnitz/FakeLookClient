import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PostsService } from '../../services/posts-service/posts.service';
import { GeolocationService } from 'src/app/shared/services/geolocationService/geolocation.service';
import { PostSimple } from '../../model/postSimple.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-map-feed',
  templateUrl: './map-feed.component.html',
  styleUrls: ['./map-feed.component.css']
})
export class MapFeedComponent implements AfterViewInit, OnDestroy {

  private posts: PostSimple[] = [];
  private unsubscribe$ = new Subject<void>();
  postsToDisplay: PostSimple[] = [];
  private maxPostsOnMap = 100;
  private maxPostsAsImages = 1;

  clickedPost : PostSimple = null;

  @Input()
  Lng: number;

  @Input()
  Lat: number;

  center = {lat: 24, lng: 12};
  zoom = 4;
  @ViewChild('map',{static:false}) gmap: GoogleMap;
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

  getMarkerOptions(post:PostSimple) : google.maps.MarkerOptions{

    const options:google.maps.MarkerOptions = {draggable: false}
    if (this.postsToDisplay.length <= this.maxPostsAsImages){
      options.icon = {
        url: "http://localhost:4000/images/thumb/" + post.image, 
        scaledSize: new google.maps.Size(45,45,'px','px'),
      };
    } else {
      options.icon = null;
    }
    
    return options;
  }

  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    rotateControl: false,
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
        this.center = userLocation;
      });
    });
  }

  handleBoundsChange(){
    this.postsToDisplay = [];
    const mapBounds = this.gmap.getBounds();
    for (const post of this.posts) {
      if (mapBounds.contains(post.location)){
        this.postsToDisplay.push(post);
      }
    }
  }

  openPostWindow(marker, post:PostSimple){
    this.infoWindow.close();
    this.clickedPost = post;
    this.infoWindow.open(marker);
  } 

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
