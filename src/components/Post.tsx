import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useLocation } from "react-router";

interface Props {
  _id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  userId: string;
}

const Post: FC<Props> = ({
  _id,
  userId,
  title,
  body,
  createdAt,
  updatedAt,
  author,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const location = useLocation();

  const [userIsAuthor, setUserIsAuthor] = useState(false);
  const [atHome, setAtHome] = useState(false);
  const [possibleEllipsis, setPossibleEllipsis] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  // length in characters of the preview on the home page
  const previewLength = 200;

  useEffect(() => {
    body.length > previewLength
      ? setPossibleEllipsis("...")
      : setPossibleEllipsis("");
  }, [body]);

  useEffect(() => {
    user?._id === userId ? setUserIsAuthor(true) : setUserIsAuthor(false);
  }, [user, userId]);

  useEffect(() => {
    location.pathname === "/" ? setAtHome(true) : setAtHome(false);
  }, [location]);

  useEffect(() => {
    updatedAt !== createdAt ? setIsEdited(true) : setIsEdited(false);
  });

  return (
    <div className="card m-4">
      <div className="card-header container-fluid">
        <div className="row">
          <div className="col-lg">
            <a href={`/fullpost/${_id}`} className="text-bg-light">
              <h3 title="Click to open full post.">{title}</h3>
            </a>
          </div>
          <div className="col-sm">
            <a
              href={`/authorposts/${userId}`}
              className="text-bg-light"
              title="Click to see all of this Author's posts."
            >
              <p>by: {author}</p>
            </a>
          </div>
        </div>
      </div>
      <div className="card-body">
        {atHome ? body.substring(0, previewLength) + possibleEllipsis : body}
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col">
            <p>{new Date(createdAt).toLocaleDateString()}</p>
          </div>
          <div className="col">
            {isEdited ? (
              <p>Edited: {new Date(updatedAt).toLocaleTimeString()}</p>
            ) : null}
          </div>
          <div className="col">
            {!atHome && userIsAuthor ? (
              <div>
                <button className="btn btn-danger">Delete</button>
                <button className="btn btn-primary">edit</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
