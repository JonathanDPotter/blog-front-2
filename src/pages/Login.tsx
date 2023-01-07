import React, { ChangeEvent, FormEvent, useState } from "react";
import api from "../api";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router";
import { setToken, setUser } from "../store/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ErrorToast from "../components/ErrorToast";

const Login = () => {
  const initialState = { username: "Test User", password: "Password123" };
  const [formState, setFormState] = useState(initialState);
  const { username, password } = formState;
  const [register, setRegister] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (register) {
      try {
        const response = await api.register(formState);
        if (!response) return null;
      } catch (error: any) {
        setErrorMessage(error.message);
        setShowError(true);
      }
    }

    try {
      const response = await api.login(formState);
      const { token, user } = response?.data;
      dispatch(setToken(token));
      dispatch(setUser(user));
      setFormState(initialState);
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setFormState({ ...formState, [id]: value });
  };

  const forminputStyles = "form-group row my-1";
  const formLabelStyles = "col-sm-2 col-form-label";
  const formInputDivStyles = "col-sm-7";
  const formWarningStyles = "col-sm-3 col-form-label text-danger";

  return (
    <div className="d-flex h-100 align-items-center">
      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <div className="d-flex justify-content-end w-100">
          <p className={showInfo ? "text-black" : "text-white"}>
            You can register your own username or just use the provided default.
          </p>
          <FontAwesomeIcon
            icon={faInfoCircle}
            onMouseOver={() => setShowInfo(true)}
            onMouseOut={() => setShowInfo(false)}
          />
        </div>
        <div className={forminputStyles}>
          <label htmlFor="username" className={formLabelStyles}>
            username
          </label>
          <div className={formInputDivStyles}>
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
          {!username ? (
            <label className={formWarningStyles}>* required</label>
          ) : null}
        </div>

        <div className={forminputStyles}>
          <label htmlFor="password" className={formLabelStyles}>
            password
          </label>
          <div className={formInputDivStyles}>
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
          {!password ? (
            <label className={formWarningStyles}>* required</label>
          ) : null}
        </div>

        {register ? (
          <div className={forminputStyles}>
            <label htmlFor="repeatPassword" className={formLabelStyles}>
              repeat password
            </label>
            <div className={`${formInputDivStyles} vh-10`}>
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
            {password !== repeatPassword ? (
              <label className={formWarningStyles}>*must match</label>
            ) : null}
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
                checked={register}
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
      <ErrorToast
        show={showError}
        setShow={setShowError}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Login;
