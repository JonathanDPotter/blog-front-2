export interface UserInput {
  username: string;
  password: string;
}

export interface UserDocument extends UserInput {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
