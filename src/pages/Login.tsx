import React, { ChangeEvent, FormEvent, useState } from "react";
import api from "../api";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router";
import { setToken, setUser } from "../store/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import InfoToast from "../components/InfoToast";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";

const Login = () => {
  const initialState = { username: "Test User", password: "Password123" };
  const [formState, setFormState] = useState(initialState);
  const { username, password } = formState;
  const [register, setRegister] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [toast, setToast] = useState<{ title: string; message: string } | null>(
    null
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (register) {
      try {
        const response = await api.register(formState);
        if (!response) return null;
      } catch (error: any) {
        setToast({ title: "Error", message: error.message });
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
      setToast({ title: "Error", message: error.message });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setFormState({ ...formState, [id]: value });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Form.Text className="d-flex justify-content-end">
            <span className={showInfo ? "text-black" : "text-trans"}>
              You can register your own username or just use the provided
              default.
            </span>
            <FontAwesomeIcon
              icon={faInfoCircle}
              onMouseOver={() => setShowInfo(true)}
              onMouseOut={() => setShowInfo(false)}
            />
          </Form.Text>
          <InputGroup className="d-flex justify-content-end">
            <Form.Check
              type="checkbox"
              name="checkbox"
              id="checkbox"
              label="Register?"
              onChange={() => setRegister(!register)}
              checked={register}
            />
          </InputGroup>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              title="Your username"
              placeholder="enter username"
              value={username}
              onChange={handleChange}
            />
            {!username ? (
              <Form.Text className="text-danger">
                <strong>* required</strong>
              </Form.Text>
            ) : null}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password">password</Form.Label>
            <Form.Control
              type={register ? "new-password" : "password"}
              name="password"
              id="password"
              title="Your password"
              placeholder="enter password"
              value={password}
              onChange={handleChange}
            />
            {!password ? (
              <Form.Text className="text-danger">
                <strong>* required</strong>
              </Form.Text>
            ) : null}
          </Form.Group>

          {register ? (
            <Form.Group>
              <Form.Label>repeat password</Form.Label>
              <Form.Control
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
              {password !== repeatPassword ? (
                <Form.Text className="text-danger">
                  <strong>*passwords must match</strong>
                </Form.Text>
              ) : null}
            </Form.Group>
          ) : null}

          <Button
            className="ms-auto"
            children={"Submit"}
            type="submit"
            variant="dark"
            disabled={
              register
                ? !(password === repeatPassword && !!username)
                : !(!!username && !!password)
            }
          />
        </Stack>
      </Form>
      <InfoToast
        show={!!toast}
        setShow={setToast}
        message={toast?.message || ""}
        title={toast?.title || ""}
      />
    </Container>
  );
};

export default Login;
