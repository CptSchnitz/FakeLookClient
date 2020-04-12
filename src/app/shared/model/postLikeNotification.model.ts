import { LikeAction } from './likeAction.enum';

export default interface PostLikeNotifData {
  postId: string;
  userId: number;
  count: number;
  action: LikeAction;
}