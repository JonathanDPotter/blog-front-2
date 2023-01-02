import React, { ChangeEvent, FormEvent, useState } from "react";
import api from "../api";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router";
import { setToken, setUser } from "../store/authSlice";

const Login = () => {
  const initialState = { username: "", password: "" };
  const [formState, setFormState] = useState(initialState);
  const { username, password } = formState;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await api.login(formState);
    const { token, user } = response?.data;
    dispatch(setToken(token));
    dispatch(setUser(user));
    setFormState(initialState);
    navigate("/");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setFormState({ ...formState, [id]: value });
  };

  return (
    <div className="d-flex h-100 align-items-center">
      <form onSubmit={handleSubmit} className="container">
        <div className="form-group">
          <label htmlFor="username">username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            title="Your username"
            placeholder="enter username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="formgroup">
          <label htmlFor="password">password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            title="Your password"
            placeholder="enter password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
