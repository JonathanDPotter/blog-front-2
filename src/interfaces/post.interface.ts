import { UserDocument } from "./user.interface";
import { Document } from "mongoose";

export interface PostInput {
  userId: UserDocument["_id"];
  title: string;
  body: string;
  published: boolean;
}

export interface PostDocument extends PostInput, Document {
  author: string;
  createdAt: Date;
  updatedAt: Date;
}
