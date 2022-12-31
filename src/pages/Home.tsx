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
    const checkValid = async (tokenToCheck: string) => {
      const response = await api.validate(tokenToCheck);
      if (response.status !== 200) dispatch(logOut());
    };

    data && setPublished(data.filter((datum: PostDocument) => datum.published));

    data && console.log(data);

    token && checkValid(token);
  }, [data, token, dispatch]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        published?.map((post) => {
          const { _id, title, body, createdAt, author } = post;
          return <Post {...{ _id, title, body, createdAt, author }} />;
        })
      )}
    </div>
  );
};

export default Home;
