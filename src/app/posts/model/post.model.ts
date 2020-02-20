import { GeoPoint } from 'src/app/shared/model/geoPoint.model';
import { SimpleUser } from 'src/app/social/model/simpleUser.model';
import PostComment from './postComment.model';

export interface Post {
  postId: number;
  imageUuid: string;
  location: GeoPoint;
  publishDate: Date;
  text: string;
  creator: SimpleUser;
  likes: number;
  likedByUser: boolean;
  userTags: SimpleUser[];
  tags: { id: number, name: string }[];
  comments: PostComment[];
}
