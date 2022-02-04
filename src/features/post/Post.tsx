import React, { FC } from 'react';
import { useGetPostQuery } from '../../api/fearless';

type Props = {
  id: string;
};

const Post: FC<Props> = ({ id }) => {
  const { data } = useGetPostQuery(id);

  return (
    <div>
      <h1>{data?.post.title}</h1>
      <p>{data?.post.content}</p>
    </div>
  );
};

export default Post;
