export interface IUser {
  username: string;
  createdAt: string;
  updatedAt: string;
  ethAddress: string;
  displayName: string;
  posts: string[];
  likes?: any;
}
