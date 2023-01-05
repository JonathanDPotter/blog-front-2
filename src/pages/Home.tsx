import React, { useEffect, useState } from "react";
import { logOut } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import api from "../api";
import { PostDocument } from "../components/interfaces/post.interface";
import Post from "../components/Post";

const Home = () => {
  const { data, error, isLoading } = useGetAllPostsQuery("");
  const [publishedPosts, setPublishedPosts] = useState<PostDocument[] | null>(
    null
  );
  const [sortedPosts, setSortedPosts] = useState<PostDocument[] | null>(null);
  error && console.log(error);

  const dispatch = useAppDispatch();

  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    data &&
      setPublishedPosts(data.filter((datum: PostDocument) => datum.published));

    token &&
      (async () => {
        const response = await api.validate(token);
        if (response.status !== 200) dispatch(logOut());
      })();
  }, [data, token, dispatch]);

  useEffect(() => {
    publishedPosts &&
      setSortedPosts(
        publishedPosts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      );
  }, [publishedPosts]);

  return (
    <div>
      {user && <h2>{user.username}</h2>}
      {isLoading ? (
        <p>Loading...</p>
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
    </div>
  );
};

export default Home;
