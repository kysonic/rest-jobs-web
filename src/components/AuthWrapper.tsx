import { useEffect, FC } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';

const AuthWrapper: FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (fireBaseUser) => {
      if (fireBaseUser) {
        const claims: any = fireBaseUser.getIdTokenResult();
        dispatch(
          setUser({
            email: fireBaseUser.email,
            emailVerified: fireBaseUser.emailVerified,
            isAdmin: claims.admin,
          }),
        );
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  return <div>{children}</div>;
};

export default AuthWrapper;
