import { ChangeEvent, FormEvent, useState } from "react";
import { useAppSelector } from "../store/hooks";
import api from "../api";
import { UserDocument } from "../interfaces/user.interface";
import { useNavigate } from "react-router";
import { useGetAllPostsQuery } from "../store/postApiSlice";
import InfoToast from "../components/InfoToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { Button, Form, InputGroup, Stack } from "react-bootstrap";

const MakePost = () => {
  const initialFormState = { title: "", body: "", published: false };

  const [formState, setFormState] = useState(initialFormState);
  const { title, body, published } = formState;
  const [toast, setToast] = useState<{ message: string; title: string } | null>(
    null
  );

  const { refetch } = useGetAllPostsQuery("");
  const { user, token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.currentTarget;

    id === "published"
      ? setFormState({ ...formState, published: !published })
      : setFormState({ ...formState, [id]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user || !token)
      return setToast({ title: "Error", message: "missing auth data" });
    const userId = user._id as UserDocument["_id"];
    const submission = { ...formState, userId };
    try {
      await api.makePost(submission, token);
      setFormState(initialFormState);
      refetch();
      navigate("/");
    } catch (error: any) {}
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={2}>
        <Form.Group>
          <Form.Label htmlFor="title">title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            id="title"
            title="Post Title"
            placeholder="enter title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="body" className="d-flex justify-content-between">
            body
            <Form.Text>
              -you can enter plain text or markdown
              <a
                href="https://commonmark.org/"
                title="link to commonMark.org"
                className="text-dark"
              >
                <FontAwesomeIcon icon={faMarkdown} className="ms-2" />
              </a>
            </Form.Text>
          </Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: "40vh" }}
            name="body"
            id="body"
            title="Post Body"
            placeholder="enter body"
            value={body}
            onChange={handleChange}
          />
        </Form.Group>
        <InputGroup>
          <Form.Check
            label="Publish Post?"
            type="checkbox"
            name="published"
            id="published"
            onChange={handleChange}
            value="true"
          />
        </InputGroup>
        <Button type="submit" variant="success" className="ms-auto text-light">
          Submit
        </Button>
        <InfoToast
          show={!!toast}
          setShow={setToast}
          message={toast?.message || ""}
          title={toast?.title || ""}
        />
      </Stack>
    </Form>
  );
};

export default MakePost;
