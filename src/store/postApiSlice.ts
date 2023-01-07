import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jonathan-potter-blog-api-2.herokuapp.com/",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({ query: () => "/api/post" }),
  }),
});

export const { useGetAllPostsQuery } = postApi;
