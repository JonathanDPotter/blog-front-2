import React, { ChangeEvent, FormEvent, useState } from "react";
import api from "../api";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router";
import { setToken, setUser } from "../store/authSlice";

const Login = () => {
  const initialState = { username: "", password: "" };
  const [formState, setFormState] = useState(initialState);
  const { username, password } = formState;
  const [register, setRegister] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (register) {
      const response = await api.register(formState);
      if (!response) return null
    }

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
      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <div className="form-group row my-1">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            username
          </label>
          <div className="col-sm-10">
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
        </div>

        <div className="form-group row my-1">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            password
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type={register ? "new-password" : "password"}
              name="password"
              id="password"
              title="Your password"
              placeholder="enter password"
              value={password}
              onChange={handleChange}
            />
          </div>
        </div>

        {register ? (
          <div className="form-group row my-1">
            <label htmlFor="repeatPassword" className="col-sm-2 col-form-label">
              repeat password
            </label>
            <div className="col-sm-10 vh-10">
              <input
                className="form-control"
                type={register ? "new-password" : "password"}
                name="repeatPassword"
                id="repeatPassword"
                title="repeat password"
                placeholder="repeat password"
                value={repeatPassword}
                onChange={(event) =>
                  setRepeatPassword(event.currentTarget.value)
                }
              />
            </div>
          </div>
        ) : (
          <div className="col vh-10"></div>
        )}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                onChange={() => setRegister(!register)}
                value={register ? "on" : "off"}
                aria-label="Checkbox to toggle registration or login."
              />
              <label htmlFor="checkbox" className="ms-2">
                Register
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            register
              ? !(password === repeatPassword && !!username)
              : !(!!username && !!password)
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
