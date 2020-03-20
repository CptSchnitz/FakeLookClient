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
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }),
          (error) => reject()
        );
      } else {
        reject();
      }
    });
  }
}
