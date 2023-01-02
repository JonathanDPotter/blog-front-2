import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";
import Post from "../components/Post";

const FullPost = () => {
  const { id } = useParams();

  const dummyParams = {
    _id: "",
    title: "",
    body: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: "",
    userId: "",
  };

  const [postParams, setPostParams] = useState(dummyParams);

  useEffect(() => {
    id &&
      (async () => {
        const response = await api.getPost(id);
        const { _id, title, body, createdAt, updatedAt, author, userId } =
          response?.data;

        setPostParams({
          _id,
          title,
          body,
          createdAt,
          updatedAt,
          author,
          userId,
        });
      })();
  }, []);

  return (
    <div>
      <Post {...postParams} />
    </div>
  );
};

export default FullPost;
