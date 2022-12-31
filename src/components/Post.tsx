import React, { FC } from "react";
import { PostDocument } from "../interfaces/post.interface";

interface Props {
  _id: string;
  title: string;
  body: string;
  createdAt: Date;
  author: string;
}

const Post: FC<Props> = ({ _id, title, body, createdAt, author }) => {
  return (
    <div className="card">
      <div className="card-header">
        {title}
        <br />
        {author}
      </div>
      <div className="card-body">{body}</div>
      <div className="card-footer">
        {new Date(createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Post;
