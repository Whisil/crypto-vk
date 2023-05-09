export interface IUser {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  ethAddress: string;
  displayName: string;
  posts: string[];
  likes: string[];
}
