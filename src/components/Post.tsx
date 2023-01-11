import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAppSelector } from "../store/hooks";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import api from "../api";
import InfoToast from "./InfoToast";
import { StringExpressionOperatorReturningBoolean } from "mongoose";

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
  const [toast, setToast] = useState<{
    title: string;
    message: string;
  } | null>(null);

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
      setToast({ title: "Error", message: error.message });
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
      setToast({ title: response?.statusText, message: response?.data });
      refetch();
    } catch (error: any) {
      setToast({ title: "Error", message: error.message });
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
    <Card className="my-4" border="dark">
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
              <strong>by: {author}</strong>
            </Card.Text>
          </Col>
          <Col>
            {userIsAuthor && published && !atHome ? (
              <Card.Text>
                <small>published</small>
              </Card.Text>
            ) : (
              <Card.Text>
                <small>not published</small>
              </Card.Text>
            )}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {editing ? (
          <>
            <Form.Control
              className="pre-wrap"
              as="textarea"
              rows={20}
              id="newBody"
              title="Post Body"
              value={newBody}
              onChange={(event) => setNewBody(event.currentTarget.value)}
            />{" "}
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
        ) : (
          <ReactMarkdown
            className="pre-wrap"
            children={
              atHome
                ? body.substring(0, previewLength) +
                  (body.length > previewLength ? "..." : "")
                : body
            }
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    // @ts-ignore
                    style={dark} // theme
                    language={match[1]}
                    PreTag="section" // parent tag
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        )}
      </Card.Body>
      <Card.Footer>
        <Row>
          <Card.Text className="d-flex justify-content-between">
            <span>{new Date(createdAt).toLocaleDateString()}</span>
            {isEdited ? (
              <small>Edited: {new Date(updatedAt).toLocaleDateString()}</small>
            ) : null}
          </Card.Text>
        </Row>
        {!atHome && userIsAuthor ? (
          <Row>
            <Col className="d-flex gap-2">
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
              {editing ? (
                <Button variant="success" onClick={saveEdits} children="save" />
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleEdit}
                  children="edit"
                />
              )}
              {editing ? (
                <Button
                  variant="secondary"
                  onClick={() => setEditing(false)}
                  children="cancel"
                />
              ) : null}
            </Col>
          </Row>
        ) : null}
      </Card.Footer>
      <InfoToast
        show={!!toast}
        setShow={setToast}
        message={toast?.message || ""}
        title={toast?.title || ""}
      />
    </Card>
  );
};

export default Post;
