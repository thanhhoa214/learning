export interface Commentable {
  comment: <T>(variable: T) => void;
  deleteComment: <T>(variable: T) => void;
  loadMoreComment: <T>(variable: T) => void;
  reply?: <T>(variable: T) => void;
  loadMoreReply?: <T>(variable: T) => void;
}
