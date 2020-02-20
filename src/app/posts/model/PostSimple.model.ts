import { GeoPoint } from 'src/app/shared/model/geoPoint.model';
import { SimpleUser } from 'src/app/social/model/simpleUser.model';


export interface PostSimple {
  postId: number;
  imageUuid: string;
  location: GeoPoint;
  publishDate: Date;
  text: string;
  creator: SimpleUser;
  likes: number;
  likedByUser: boolean;
}
