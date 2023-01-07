import axios from "axios";
import { UserInput } from "../components/interfaces/user.interface";
import { PostInput } from "../components/interfaces/post.interface";

const instance = axios.create({
  baseURL: "https://jonathan-potter-blog-api-2.herokuapp.com/",
});

const errorHandler = (error: any) => {
  console.log(error);
  alert(`${error.code} ${error.response.data}`);
};

const validate = async (token: string) => {
  try {
    const response = await instance.get("/api/user/validate", {
      headers: { authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error: any) {
    alert(`${error.code} ${error.response.data}`);
    return error;
  }
};

const register = async (user: UserInput) => {
  try {
    const response = await instance.post("/api/user/register", user);
    return response;
  } catch (error: any) {
    errorHandler(error);
  }
};

const login = async (user: UserInput) => {
  try {
    const response = await instance.post("/api/user/login", user);
    return response;
  } catch (error: any) {
    errorHandler(error);
  }
};

const makePost = async (post: PostInput, token: string) => {
  try {
    const response = await instance.post("/api/post/", post, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error: any) {
    errorHandler(error);
  }
};

const getPost = async (_id: string) => {
  try {
    const response = await instance.get(`api/post/${_id}`);
    return response;
  } catch (error: any) {
    errorHandler(error);
  }
};

const getAuthorPosts = async (_id: string) => {
  try {
    const response = await instance.get(`api/post/${_id}`);
    return response;
  } catch (error: any) {
    errorHandler(error);
  }
};

const updatePost = async (_id: string, token: string, edit: PostInput) => {
  try {
    const response = await instance.patch(`api/post/${_id}`, edit, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error: any) {
    errorHandler(error);
  }
};

const deletePost = async (_id: string, token: string) => {
  try {
    const response = await instance.delete(`api/post/${_id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error: any) {
    errorHandler(error);
  }
};

const api = {
  validate,
  register,
  login,
  makePost,
  getPost,
  getAuthorPosts,
  updatePost,
  deletePost
};

export default api;
