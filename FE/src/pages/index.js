import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import { Center, Loader } from '@mantine/core';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <Center style={{ height: '100vh' }}>
        <Loader />
      </Center>
    </Main>
  );
};

export default Index;
