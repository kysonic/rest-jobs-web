import React, { FC, FormEvent, useEffect } from 'react';
import { useCreatePostMutation, useGetPostsQuery } from '../../api/fearless';

const CreatePost: FC = () => {
  const [createPost, { data, error, isSuccess, isError }] =
    useCreatePostMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData: any = {};

    Array.from(e.target as any).forEach((element: any) => {
      if (element.name) {
        formData[element.name] = element.value;
      }
    });

    createPost(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      alert('Post created');
    }
  }, [isSuccess]);

  return (
    <div>
      <h1>Create new post</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="title" placeholder="Title" />
        <br />
        <br />
        <textarea name="content" placeholder="Content" />
        <br />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
