import PostLikeNotifData from './postLikeNotification.model';

export default interface CommentLikeNotifData extends PostLikeNotifData {
  commentId: string;
}