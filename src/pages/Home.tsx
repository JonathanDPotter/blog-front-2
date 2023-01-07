import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { logOut } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import api from "../api";
import { PostDocument } from "../interfaces/post.interface";
import Post from "../components/Post";
import ErrorToast from "../components/ErrorToast";

const Home = () => {
  const { data, error, isLoading } = useGetAllPostsQuery("");
  const [publishedPosts, setPublishedPosts] = useState<PostDocument[] | null>(
    null
  );
  const [sortedPosts, setSortedPosts] = useState<PostDocument[] | null>(null);
  error && console.log(error);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();

  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    data &&
      setPublishedPosts(data.filter((datum: PostDocument) => datum.published));

    token &&
      (async () => {
        try {
          await api.validate(token);
        } catch (error: any) {
          setErrorMessage(error.message);
          setShowError(true);
          dispatch(logOut());
        }
      })();
  }, [data, token, dispatch]);

  useEffect(() => {
    publishedPosts &&
      setSortedPosts(
        publishedPosts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      );
  }, [publishedPosts]);

  return (
    <div className="h-100">
      {user && <h2>{user.username}</h2>}
      {isLoading ? (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        sortedPosts?.map((post) => {
          const {
            _id,
            title,
            body,
            createdAt,
            updatedAt,
            author,
            userId,
            published,
          } = post;
          return (
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
              key={_id}
            />
          );
        })
      )}
      <ErrorToast
        show={showError}
        setShow={setShowError}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Home;
