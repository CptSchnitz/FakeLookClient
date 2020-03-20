import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoPoint } from '../../model/geoPoint.model';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.css']
})
export class LocationSelectorComponent implements AfterViewInit {

  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    center: { lat: 41.9028, lng: 12.4964 },
    zoom: 7,
    rotateControl: false,
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
  @ViewChild('gmap', { static: false }) map: google.maps.Map;
  @ViewChild('input', { static: false }) input: ElementRef;

  @Input()
  set point(point: GeoPoint) {
    if (point) {
      this.location = { lat: point.lat, lng: point.lon };
      this.mapOptions.center = new google.maps.LatLng(point.lat, point.lon);
    }
  }

  location: google.maps.LatLngLiteral;

  constructor(public activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement);
    autocomplete.bindTo('bounds', this.map);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.input.nativeElement);
    // Specify just the place data fields that you need.
    autocomplete.setFields(['place_id', 'geometry', 'name']);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);
      }
      const point = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
      this.location = point;
    });
  }
  handleMapClick(clickArgs: google.maps.MouseEvent) {
    this.location = { lat: clickArgs.latLng.lat(), lng: clickArgs.latLng.lng() };
  }

  selectClicked() {
    this.activeModal.close({ lat: this.location.lat, lon: this.location.lng });
  }
}
