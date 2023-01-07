import { FC, SetStateAction, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useAppSelector } from "../store/hooks";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import api from "../api";
import ErrorToast from "./ErrorToast";

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
  const [editing, setEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    try {
      await api.updatePost(_id, token, input);
      refetch();
      setEditing(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const handleEdit = () => {
    setNewBody(body);
    setNewTitle(title);
    setIsPublished(published);
    setEditing(true);
  };

  const handleDelete = async () => {
    if (
      !window.confirm(`Are you sure that you want to delete ${title}?`) ||
      !token
    )
      return;

    try {
      const response = await api.deletePost(_id, token);
      alert(response?.data);
      refetch();
    } catch (error: any) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

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
    <Card>
      <Card.Header>
        <Row>
          <Col>
            {editing ? (
              <input
                id="newTitle"
                title="Post Title"
                value={newTitle}
                onChange={(event) => setNewTitle(event.currentTarget.value)}
              />
            ) : (
              <Card.Title
                onClick={atHome ? () => navigate(`fullpost/${_id}`) : () => {}}
                title={atHome ? "Click to open full post." : "Post Title"}
                className="pointer"
              >
                {title}
              </Card.Title>
            )}
          </Col>
          <Col>
            <Card.Text
              onClick={() => navigate(`/authorposts/${userId}`)}
              title="Click to see all of this Author's posts."
              className="pointer"
            >
              by: {author}
            </Card.Text>
          </Col>
          <Col>
            {userIsAuthor && published && !atHome && (
              <Card.Text className="text-sm">published</Card.Text>
            )}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {atHome ? (
          <Card.Text>
            {body.substring(0, previewLength) +
              (body.length > previewLength ? "..." : "")}
          </Card.Text>
        ) : editing ? (
          <Form.Control
            as="textarea"
            rows={5}
            id="newBody"
            title="Post Body"
            value={newBody}
            onChange={(event) => setNewBody(event.currentTarget.value)}
          />
        ) : (
          body
        )}

        {editing ? (
          <>
            <InputGroup className="mb-3">
              <Form.Check
                name="isPublished"
                id="isPublished"
                onChange={() => setIsPublished(!isPublished)}
                checked={isPublished}
                label="Published?"
                aria-label="Checkbox to toggle published status."
              />
            </InputGroup>
          </>
        ) : null}
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <Card.Text>{new Date(createdAt).toLocaleDateString()}</Card.Text>
            {isEdited ? (
              <Card.Text className="text-sm">
                Edited: {new Date(updatedAt).toLocaleDateString()}
              </Card.Text>
            ) : null}
          </Col>
          <Col>{/*intentionally empty*/}</Col>
          <Col>
            {!atHome && userIsAuthor ? (
              <>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
                {editing ? (
                  <Button variant="warning" onClick={saveEdits}>
                    Save
                  </Button>
                ) : (
                  <Button
                    className="ms-2"
                    variant="secondary"
                    onClick={handleEdit}
                  >
                    edit
                  </Button>
                )}
                {editing ? (
                  <Button
                    className="ms-2"
                    variant="secondary"
                    onClick={() => setEditing(false)}
                  >
                    cancel
                  </Button>
                ) : null}
              </>
            ) : null}
          </Col>
        </Row>
      </Card.Footer>
      <ErrorToast
        show={showError}
        setShow={setShowError}
        errorMessage={errorMessage}
      />
    </Card>
  );
};

export default Post;
