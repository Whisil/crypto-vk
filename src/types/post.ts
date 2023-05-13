import { IUser } from './user';

export interface IPost {
  _id: string;
  createdAt: string;
  text: string;
  createdBy: IUser;
  mediaURL?: string;
  likes: string[];
  comments: string[];
}
