import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";
import Post from "../components/Post";
import ErrorToast from "../components/ErrorToast";

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
    published: true,
  };

  const [postParams, setPostParams] = useState(dummyParams);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    id &&
      (async () => {
        try {
          const response = await api.getPost(id);
          const {
            _id,
            title,
            body,
            createdAt,
            updatedAt,
            author,
            userId,
            published,
          } = response?.data;

          setPostParams({
            _id,
            title,
            body,
            createdAt,
            updatedAt,
            author,
            userId,
            published,
          });
        } catch (error: any) {
          setErrorMessage(error.message);
          setShowError(true);
        }
      })();
  }, []);

  return (
    <div>
      <Post {...postParams} />
      <ErrorToast
        show={showError}
        setShow={setShowError}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default FullPost;
