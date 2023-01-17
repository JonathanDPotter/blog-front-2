import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Post from "../components/Post";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import { Spinner } from "react-bootstrap";
import { PostDocument } from "../interfaces/post.interface";

const FullPost = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetAllPostsQuery("");
  error && console.log(error);

  const [post, setPost] = useState<PostDocument | null>(null);
  const { _id, title, body, createdAt, updatedAt, author, userId, published } =
    post || {
      _id: "",
      title: "",
      body: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      author: "",
      userId: "",
      published: false,
    };

  useEffect(() => {
    setPost(data?.find((post: PostDocument) => post._id === id));
  }, [data]);

  return (
    <>
      {isLoading ? (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Post
          {...{
            _id,
            title,
            body,
            createdAt,
            updatedAt,
            author,
            userId,
            published,
          }}
        />
      )}
    </>
  );
};

export default FullPost;
