import { Injectable } from '@angular/core';
import { GeoPoint } from '../../model/geoPoint.model';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() { }

  getLocation(): Promise<GeoPoint> {
    return new Promise<GeoPoint>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve({
              lng: position.coords.longitude,
              lat: position.coords.latitude
            }),
          (error) => reject()
        );
      } else {
        reject();
      }
    });
  }
}
