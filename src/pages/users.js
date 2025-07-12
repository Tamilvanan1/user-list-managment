import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import UsersList from '../features/users/UsersList';
import { isLoggedIn } from '../utils/auth';

export default () => {
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn()) router.push('/');
  }, [router]);
  return <UsersList />;
};
