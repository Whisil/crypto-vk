export interface IUser {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  ethAddress: string;
  displayName: string;
  bannerURL: string | null;
  avatarURL: string | null;
  bio: string | null;
  websiteURL: string | null;
  posts: string[];
  likes: string[];
  comments: string[];
}
