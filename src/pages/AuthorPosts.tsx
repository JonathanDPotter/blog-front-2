import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useParams } from "react-router";
import { PostDocument } from "../interfaces/post.interface";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import Post from "../components/Post";
import { Spinner } from "react-bootstrap";

const AuthorPosts: FC = () => {
  const { user } = useAppSelector((store) => store.auth);
  const { id } = useParams();

  const [authorPosts, setAuthorPosts] = useState<PostDocument[] | null>(null);
  const [sortedPosts, setSortedPosts] = useState<PostDocument[] | null>(null);

  const { data, error, isLoading } = useGetAllPostsQuery("");
  error && console.log(error);

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

  useEffect(() => {
    authorPosts &&
      setSortedPosts(
        authorPosts?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      );
  }, [authorPosts]);

  return (
    <>
      {authorPosts && authorPosts.length > 0 && (
        <h2>{authorPosts[0].author}'s posts</h2>
      )}
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
    </>
  );
};

export default AuthorPosts;
