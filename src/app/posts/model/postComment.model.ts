import { SimpleUser } from 'src/app/social/model/simpleUser.model';

export default interface PostComment {
  postId: string;
  commentId: string;
  publishDate: Date;
  text: string;
  creator: SimpleUser;
  likes: number;
  likedByUser: boolean;
  userTags: SimpleUser[];
  tags: string[];
}