import type { NextPage } from 'next';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { Counter } from '../features/counter/Counter';
import { Posts } from '../features/posts/Posts';
import { useRegisterMutation } from '../api/fearless';
import { RootState } from '../store';

// const signup = async () => {
//   const auth = getAuth();
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       'soooyc@gmail.com',
//       'doctor89',
//     );

//     console.log(userCredential.user);
//     await sendEmailVerification(userCredential.user);
//     console.log('Email sent');
//   } catch (err) {
//     console.log(err);
//   }
// };

// const signin = async () => {
//   const auth = getAuth();
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       'soooyc@gmail.com',
//       'doctor89',
//     );

//     console.log(userCredential.user);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const signout = async () => {
//   const auth = getAuth();
//   await signOut(auth);
//   console.log('Sign out sucessfully');
// };

// useEffect(() => {
//   const auth = getAuth();
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       console.log(user);
//     } else {
//       console.log('Signedout');
//     }
//   });
// });

const Home: NextPage = () => {
  const [
    register,
    { data: registerData, isLoading: registerIsLoading, error: registerError },
  ] = useRegisterMutation();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleRegister = async () => {
    await register({
      email: 'soooyc@gmail.com',
      password: 'doctor89',
    });

    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      'soooyc@gmail.com',
      'doctor89',
    );

    await sendEmailVerification(userCredential.user);

    await signOut(auth);
  };

  const signout = async () => {
    const auth = getAuth();
    await signOut(auth);
    console.log('Sign out sucessfully');
  };

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, 'soooyc@gmail.com', 'doctor89');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      <button onClick={signout}>signout</button>
      <Counter />
      <br />
      <br />
      <Link passHref href="/posts/create">
        <button>Create post</button>
      </Link>
      {user ? <Posts /> : null}
    </div>
  );
};

export default Home;
