import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useParams } from "react-router";
import { PostDocument } from "../interfaces/post.interface";
import api from "../api";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import Post from "../components/Post";

const AuthorPosts = () => {
  const { user } = useAppSelector((store) => store.auth);
  const { id } = useParams();

  const [authorPosts, setAuthorPosts] = useState<PostDocument[] | null>(null);

  const { data, error, isLoading } = useGetAllPostsQuery("");

  useEffect(() => {
    data &&
      setAuthorPosts(
        data.filter((doc: PostDocument) =>
          id === user?._id
            ? doc.userId === id
            : doc.published === true && doc.userId === id
        )
      );
  }, [data]);

  return (
    <div>
      {" "}
      <div>
        {user && <h2>{user.username}'s posts</h2>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          authorPosts?.map((post) => {
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
    </div>
  );
};

export default AuthorPosts;
