export interface IPost {
  id: string;
  createdAt: string;
  text: string;
  createdBy: string;
  media?: any;
  likesCount: number;
}
