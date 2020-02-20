import { GeoPoint } from 'src/app/shared/model/geoPoint.model';

export interface NewPost {
  text: string;
  image: File;
  location: GeoPoint;
  tags: string[];
  userTags: number[];
}
