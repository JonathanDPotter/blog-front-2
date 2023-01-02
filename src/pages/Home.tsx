import React, { useEffect, useState } from "react";
import { logOut } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import api from "../api";
import { PostDocument } from "../interfaces/post.interface";
import Post from "../components/Post";

const Home = () => {
  const { data, error, isLoading } = useGetAllPostsQuery("");
  const [published, setPublished] = useState<PostDocument[] | null>(null);
  error && console.log(error);

  const dispatch = useAppDispatch();

  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    data && setPublished(data.filter((datum: PostDocument) => datum.published));

    token &&
      (async () => {
        const response = await api.validate(token);
        if (response.status !== 200) dispatch(logOut());
      })();

  }, [data, token, dispatch]);

  return (
    <div>
      {user && <h2>{user.username}</h2>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        published?.map((post) => {
          const { _id, title, body, createdAt, updatedAt, author, userId } = post;
          return (
            <Post {...{ _id, title, body, createdAt, updatedAt, author, userId }} key={_id} />
          );
        })
      )}
    </div>
  );
};

export default Home;
