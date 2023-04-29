export interface IUser {
  username: string;
  createdAt: string;
  updatedAt: string;
  ethAddress: string;
  displayName: string;
  posts?: any;
  likes?: any;
}
