import { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import CreatePost from '../../features/createPost/CreatePost';
import { RootState } from '../../store';

const CreatePostPage: NextPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <CreatePost />
      <br />
      <Link passHref href="/">
        Go back
      </Link>
    </div>
  );
};

export default CreatePostPage;
