import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import { Center, Loader } from '@mantine/core';
import { AuthContext } from '@/contexts/AuthProvider';

const GoogleLogin = () => {
  const router = useRouter();
  const { handleLogin } = useContext(AuthContext);

  useEffect(() => {
    if ( !router.query.token ) return;
    handleLogin(router.query)
  }, [router.query]);

  return (
    <Main meta={<Meta title='Food Plan It' description='Lorem Ipsum' />}>
      <Center style={{ height: '100vh' }}>
        <Loader />
      </Center>
    </Main>
  );
};

export default GoogleLogin;
