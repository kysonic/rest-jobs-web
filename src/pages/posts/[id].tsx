import { NextPage } from 'next';
import { useRouter } from 'next/router';
import PostComponent from '../../features/post/Post';

const Post: NextPage = () => {
  const router = useRouter();

  if (!router.query.id) {
    return null;
  }

  return <PostComponent id={router.query.id as string} />;
};

export default Post;
