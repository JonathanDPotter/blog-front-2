import axios from "axios";
import { UserInput } from "../interfaces/user.interface";
import { PostInput } from "../interfaces/post.interface";

const instance = axios.create({
  baseURL: "https://jonathan-potter-blog-api-2.herokuapp.com/",
});

const validate = async (token: string) => {
  const response = await instance.get("/api/user/validate", {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
};

const register = async (user: UserInput) => {
  const response = await instance.post("/api/user/register", user);
  return response;
};

const login = async (user: UserInput) => {
  const response = await instance.post("/api/user/login", user);
  return response;
};

const makePost = async (post: PostInput, token: string) => {
  const response = await instance.post("/api/post/", post, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
};

const getPost = async (_id: string) => {
  const response = await instance.get(`api/post/${_id}`);
  return response;
};

const getAuthorPosts = async (_id: string) => {
  const response = await instance.get(`api/post/${_id}`);
  return response;
};

const updatePost = async (_id: string, token: string, edit: PostInput) => {
  const response = await instance.patch(`api/post/${_id}`, edit, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
};

const deletePost = async (_id: string, token: string) => {
  const response = await instance.delete(`api/post/${_id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
};

const api = {
  validate,
  register,
  login,
  makePost,
  getPost,
  getAuthorPosts,
  updatePost,
  deletePost,
};

export default api;
