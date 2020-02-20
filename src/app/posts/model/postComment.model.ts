import { SimpleUser } from 'src/app/social/model/simpleUser.model';
import Tag from 'src/app/shared/model/tag.model';

export default interface PostComment {
  postId: number;
  commentId: number;
  publishDate: Date;
  text: string;
  creator: SimpleUser;
  likes: number;
  likedByUser: boolean;
  userTags: SimpleUser[];
  tags: Tag[];
}