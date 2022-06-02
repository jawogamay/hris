import React, { useContext, useEffect } from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import { Center, Loader } from '@mantine/core';
import { AuthContext } from '@/contexts/AuthProvider';
import API from '@/api/BaseApi';

const Logout = () => {
  const { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    const options = {
      method: 'POST',
      url: '/logout',
    };

    API.request(options).finally(() => {
      handleLogout()
    });
  }, []);

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <Center style={{ height: '100vh' }}>
        <Loader />
      </Center>
    </Main>
  );
};

export default Logout;
