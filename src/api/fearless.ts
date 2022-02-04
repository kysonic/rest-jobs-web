// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginReturn = {
  ok: boolean;
  token?: string;
};

export type DataItem = {
  title: string;
};

export type DataReturn = {
  data: Array<DataItem>;
};

export type Post = {
  id: number;
  title: string;
  content: string;
};

export type PostsReturn = {
  ok: boolean;
  posts: Array<Post>;
};

export type PostReturn = {
  ok: boolean;
  post: Post;
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCzDOXOZld7XvPOpC1I5snuq0DRBLZt8Cc',
  authDomain: 'testingfbauth.firebaseapp.com',
  projectId: 'testingfbauth',
  storageBucket: 'testingfbauth.appspot.com',
  messagingSenderId: '742269544096',
  appId: '1:742269544096:web:930b46e5b4b33fcfd28bc5',
};

initializeApp(firebaseConfig);

export const fearlessApi = createApi({
  reducerPath: 'fearlessApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
    prepareHeaders: async (headers) => {
      const auth = getAuth();
      const idToken = await auth.currentUser?.getIdToken();

      if (idToken) {
        headers.set('Authorization', `Bearer ${idToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    // Auth
    register: builder.mutation<LoginReturn, LoginParams>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<LoginReturn, LoginParams>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    // Posts
    getPosts: builder.query<PostsReturn, void>({
      query: () => 'post',
      providesTags: (result) => {
        if (!result) {
          return [{ type: 'Posts', id: 'LIST' }];
        }

        return [
          ...result.posts.map(({ id }) => ({ type: 'Posts', id } as const)),
          { type: 'Posts', id: 'LIST' },
        ];
      },
    }),
    getPost: builder.query<PostReturn, string>({
      query: (id) => `post/${id}`,
    }),
    createPost: builder.mutation<PostReturn, Post>({
      query: (body) => ({
        url: 'post',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Add one to list
          dispatch(
            fearlessApi.util.updateQueryData(
              'getPosts',
              undefined,
              (draftPosts) => {
                draftPosts.posts.push(data.post);
              },
            ),
          );
          // Add one to exact match
          dispatch(
            fearlessApi.util.updateQueryData(
              'getPost',
              data.post.id.toString(),
              (draft) => {
                draft.post = data.post;
              },
            ),
          );
        } catch (err) {
          console.log(err);
        }
      },
      // invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetPostsQuery,
  useGetPostQuery,
  useLoginMutation,
  useCreatePostMutation,
} = fearlessApi;
