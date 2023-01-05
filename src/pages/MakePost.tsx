import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppSelector } from "../store/hooks";
import api from "../api";
import { UserDocument } from "../components/interfaces/user.interface";
import { useNavigate } from "react-router";
import { useGetAllPostsQuery } from "../store/postApiSlice";

const MakePost = () => {
  const initialFormState = { title: "", body: "", published: false };

  const [formState, setFormState] = useState(initialFormState);
  const { title, body, published } = formState;

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
    if (!user || !token) return alert("missing auth data");
    const userId = user._id as UserDocument["_id"];
    const submission = { ...formState, userId };
    await api.makePost(submission, token);
    setFormState(initialFormState);
    refetch();
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="container h-100">
      <div className="form-group">
        <label htmlFor="title">title</label>
        <input
          className="form-control"
          type="text"
          name="title"
          id="title"
          title="Post Title"
          placeholder="enter title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group h-50">
        <label htmlFor="body">body</label>
        <textarea
          className="form-control h-90"
          name="body"
          id="body"
          title="Post Body"
          placeholder="enter body"
          value={body}
          onChange={handleChange}
        />
      </div>
      <div className="input-group-prepend mb-2">
        <div className="input-group-text">
          <input
            type="checkbox"
            aria-label="Checkbox for following text input"
            name="published"
            id="published"
            onChange={handleChange}
            value="true"
          />
          <label className="mx-2" htmlFor="published">
            Publish Post?
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default MakePost;
