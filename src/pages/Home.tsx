import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import api from "../api";
import { PostDocument } from "../interfaces/post.interface";
import Post from "../components/Post";
import InfoToast from "../components/InfoToast";

const Home = () => {
  const { data, error, isLoading } = useGetAllPostsQuery("");
  const [publishedPosts, setPublishedPosts] = useState<PostDocument[] | null>(
    null
  );
  const [sortedPosts, setSortedPosts] = useState<PostDocument[] | null>(null);
  error && console.log(error);

  const [toast, setToast] = useState<{ title: string; message: string } | null>(
    null
  );

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
          setToast({ title: "Error", message: error.message });
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
    <>
      <h2>Welcome {user ? user.username : "Guest"}</h2>
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
      <InfoToast
        show={!!toast}
        setShow={setToast}
        message={toast?.message || ""}
        title={toast?.title || ""}
      />
    </>
  );
};

export default Home;
