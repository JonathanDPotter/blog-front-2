import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MakePost from "../pages/MakePost";
import About from "../pages/About";
import Login from "../pages/Login";
import LogOut from "../pages/LogOut";
import FullPost from "../pages/FullPost";
import NotFound from "../pages/NotFound";
import AuthorPosts from "../pages/AuthorPosts";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/makepost" element={<MakePost />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<LogOut />} />
      <Route path="/fullpost/:id" element={<FullPost />} />
      <Route path="/authorposts/:id" element={<AuthorPosts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
