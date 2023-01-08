import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";
import Post from "../components/Post";
import ErrorToast from "../components/ErrorToast";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import { Spinner } from "react-bootstrap";
import { PostDocument } from "../interfaces/post.interface";

const FullPost = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetAllPostsQuery("");
  error && console.log(error);

  const [post, setPost] = useState<PostDocument | null>(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    <div>
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
    </div>
  );
};

export default FullPost;
