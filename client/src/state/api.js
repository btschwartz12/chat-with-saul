import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL}),
  reducerPath: "main",
  tagTypes: [],
  endpoints: (build) => ({
    postAiText: build.mutation({
      query: (payload) => ({
        url: "openai/text",
        method: "POST",
        body: payload,
      }),
    }),
    postLogin: build.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    postSignUp: build.mutation({
      query: (payload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    postTokenLogin: build.mutation({
      query: (payload) => ({
        url: "auth/tokenlogin",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { 
  usePostAiTextMutation,
  usePostLoginMutation,
  usePostSignUpMutation, 
  usePostTokenLoginMutation, 
} = api;
