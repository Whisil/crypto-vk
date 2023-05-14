import { IUser } from './user';

export interface IComment {
  _id: string;
  createdAt: string;
  text: string;
  createdBy: IUser;
  mediaURL: string;
  likes: string[];
  onPost: string[];
}
