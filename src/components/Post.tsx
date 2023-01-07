import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useLocation, useNavigate } from "react-router";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import api from "../api";

interface Props {
  _id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  userId: string;
  published: boolean;
}

const Post: FC<Props> = ({
  _id,
  userId,
  title,
  body,
  createdAt,
  updatedAt,
  author,
  published,
}) => {
  const { user, token } = useAppSelector((state) => state.auth);

  const { refetch } = useGetAllPostsQuery("");

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [userIsAuthor, setUserIsAuthor] = useState(false);
  const [atHome, setAtHome] = useState(false);
  const [possibleEllipsis, setPossibleEllipsis] = useState("");
  const [editing, setEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // length in characters of the preview on the home page
  const previewLength = 200;

  const saveEdits = async () => {
    const input = {
      userId,
      title: newTitle,
      body: newBody,
      published: isPublished,
    };

    if (!token) return navigate("/login");

    const response = await api.updatePost(_id, token, input);

    if (response?.status === 200) {
      refetch();
      window.location.reload();
    }
  };

  const handleEdit = () => {
    setNewBody(body);
    setNewTitle(title);
    setIsPublished(published);
    setEditing(true);
  };

  useEffect(() => {
    body.length > previewLength
      ? setPossibleEllipsis("...")
      : setPossibleEllipsis("");
  }, [body]);

  useEffect(() => {
    user?._id === userId ? setUserIsAuthor(true) : setUserIsAuthor(false);
  }, [user, userId]);

  useEffect(() => {
    pathname === "/" ? setAtHome(true) : setAtHome(false);
  }, [pathname]);

  useEffect(() => {
    updatedAt !== createdAt ? setIsEdited(true) : setIsEdited(false);
  });

  return (
    <div className="card m-4">
      <div className="card-header container-fluid">
        <div className="row">
          <div className="col-6">
            {editing ? (
              <input
                id="newTitle"
                title="Post Title"
                value={newTitle}
                onChange={(event) => setNewTitle(event.currentTarget.value)}
              />
            ) : (
              <button
                type="button"
                style={{ all: "unset", cursor: "pointer" }}
                onClick={atHome ? () => navigate(`/fullpost/${_id}`) : () => {}}
              >
                <h3 title={atHome ? "Click to open full post." : "Post Title"}>
                  {title}
                </h3>
              </button>
            )}
          </div>
          <div className="col-4">
            <a
              href={`/authorposts/${userId}`}
              className="text-bg-light"
              title="Click to see all of this Author's posts."
            >
              <p>by: {author}</p>
            </a>
          </div>
          <div className="col-2">
            {userIsAuthor && published && !atHome && (
              <p className="text-sm">published</p>
            )}
          </div>
        </div>
      </div>
      <div className="card-body">
        {atHome ? (
          body.substring(0, previewLength) + possibleEllipsis
        ) : editing ? (
          <textarea
            className="w-75 vh-20"
            id="newBody"
            title="Post Body"
            value={newBody}
            onChange={(event) => setNewBody(event.currentTarget.value)}
          />
        ) : (
          body
        )}

        {editing ? (
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input
                type="checkbox"
                name="isPublished"
                id="isPublished"
                onChange={() => setIsPublished(!isPublished)}
                checked={isPublished}
                aria-label="Checkbox to toggle published status."
              />
              <label htmlFor="isPublished" className="ms-2">
                Published?
              </label>
            </div>
          </div>
        ) : null}
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col">
            <p>{new Date(createdAt).toLocaleDateString()}</p>
            {isEdited ? (
              <p className="text-sm">
                Edited: {new Date(updatedAt).toLocaleDateString()}
              </p>
            ) : null}
          </div>
          <div className="col">{/*intentionally empty*/}</div>
          <div className="col">
            {!atHome && userIsAuthor ? (
              <div>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
                {editing ? (
                  <button
                    type="button"
                    className="btn btn-warning ms-2"
                    onClick={saveEdits}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={handleEdit}
                  >
                    edit
                  </button>
                )}
                {editing ? (
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setEditing(false)}
                  >
                    cancel
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
