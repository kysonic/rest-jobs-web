import React from 'react';
import Link from 'next/link';
import { useGetPostsQuery } from '../../api/fearless';

export function Posts() {
  const { data } = useGetPostsQuery();

  return (
    <div>
      <div>
        <h1>Posts list</h1>
        {data?.posts.map((post) => (
          <Link key={post.id} passHref href={`/posts/${post.id}`}>
            <div style={{ border: '1px solid black', marginTop: 10 }}>
              <div>{post.title}</div>
              <div>{post.content}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
