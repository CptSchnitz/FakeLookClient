import { GeoPoint } from 'src/app/shared/model/geoPoint.model';


export interface PostSimple {
  postId: number;
  image: string;
  location: GeoPoint;
  publishDate: Date;
  text: string;
  user: { Id: number; name: string };
  likes: number;
}
