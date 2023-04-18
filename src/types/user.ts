export interface User {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  ethAddress: string;
  displayName: string;
  posts?: any;
  likes?: any;
}
