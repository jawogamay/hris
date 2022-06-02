import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Center, Loader } from '@mantine/core';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import { GuestRoutes } from '@/consts/routes';
import API from '@/api/BaseApi';

const initialState = {};
export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { push, pathname, asPath } = router;
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(null);
  const handleLogin = async (data) => {
    const token = data.data ? data.data.token : data.token;

    setAuthenticated(true);
    Cookies.set('token', token);
    API.defaults.headers.Authorization = `Bearer ${token}`;
  };

  const handleLogout = async () => {
    Cookies.remove('token');
    setAuthenticated(false);
  };

  const checkLogin = async () => {
    const TOKEN = Cookies.get('token');

    if (TOKEN) {
      const options = {
        method: 'GET',
        url: '/check-login',
      };

      API.request(options)
        .then(({ data }) => {
          const { isloggedIn } = data;
          if (isloggedIn) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        })
        .catch(({ response }) => {
          if (response.status === 401) {
            //Unauthorized
            setAuthenticated(false);
          }
        });
    } else {
      setAuthenticated(false);
    }
  };

  function delQueryParams(asPath) {
    return asPath.split('?')[0];
  }

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (authenticated === null || !router.isReady) {
      return;
    }

    if (
      authenticated === false &&
      !GuestRoutes.includes(pathname) &&
      !GuestRoutes.includes(delQueryParams(asPath))
    ) {
      handleLogout();
      return push('/login');
    }
    if (
      authenticated === true &&
      GuestRoutes.includes(pathname) &&
      GuestRoutes.includes(delQueryParams(asPath))
    ) {
      return push('/dashboard');
    }

    setLoading(false);
  }, [router.isReady, authenticated, pathname, asPath]);

  const stateValues = {
    authenticated,
    handleLogin,
    handleLogout,
    checkLogin,
  };

  return loading ? (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <Center style={{ height: '100vh' }}>
        <Loader />
      </Center>
    </Main>
  ) : (
    <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
