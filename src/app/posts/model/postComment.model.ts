import { SimpleUser } from 'src/app/social/model/simpleUser.model';
import Tag from 'src/app/shared/model/tag.model';

export default interface PostComment {
  postId: number;
  publishDate: Date;
  text: string;
  creator: SimpleUser;
  likes: number;
  userTags: SimpleUser[];
  tags: Tag[];
}