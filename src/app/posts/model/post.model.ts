import { GeoPoint } from 'src/app/shared/model/geoPoint.model';
import { SimpleUser } from 'src/app/social/model/simpleUser.model';
import PostComment from '../../comments/model/postComment.model';

export interface Post {
  postId: string;
  imageUuid: string;
  location: GeoPoint;
  publishDate: Date;
  text: string;
  creator: SimpleUser;
  likes: number;
  likedByUser: boolean;
  userTags: SimpleUser[];
  tags: string[];
  comments: PostComment[];
}
