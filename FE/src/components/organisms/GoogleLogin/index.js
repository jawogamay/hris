import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import API from '@/api/BaseApi';
import { GoogleLogin } from 'react-google-login';
import Image from 'next/image';
import {
  login as googleAuthLogin,
  register as googleAuthRegister,
} from '@/api/GoogleApi';
import { showNotification } from '@mantine/notifications';
import { AuthContext } from '@/contexts/AuthProvider';
import { Button, Space } from '@mantine/core';
import Spinner from '@/components/molecules/FullPageSpinner';
import Cookies from 'js-cookie';
import Router from 'next/router';

const ERROR_MSG = {
  404: 'We cannot find an account with that email address',
  422: 'The email has already been taken.',
  500: 'Well, this is unexpected. Try again a little later',
};

const Index = ({ authType }) => {
  const { handleLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const onBoarding = (data) => {
    const options = {
      method: 'POST',
      url: '/onboarding',
      data: data,
    };
    API.request(options).catch(({ response }) => {
      console.log(response);
    });
  };

  const handleSuccessResponse = async ({ profileObj }) => {
    try {
      setIsLoading(true);
      const response =
        authType === 'login'
          ? await googleAuthLogin(profileObj)
          : await googleAuthRegister(profileObj);

      if (response.statusText === 'Created') {
        let onBoardingData = JSON.parse(Cookies.get('onboarding'));
        onBoardingData.userId = response.data.user.id;
        handleLogin(response);
        onBoarding(onBoardingData);
        Router.push('/register/onboarding/8/');
      } else {
        handleLogin(response);
        Router.push('/dashboard');
      }
    } catch (err) {
      const { status } = err.response;
      showNotification({
        color: 'red',
        title: ERROR_MSG[status],
      });
      setIsLoading(false);
    }
  };

  const handleErrorResponse = async ({ error }) => {
    if (error && error !== 'popup_closed_by_user') {
      showNotification({
        color: 'red',
        title: ERROR_MSG[500],
      });
    }
  };
  const renderCustomButton = (renderProps) => (
    <Button
      color='gray'
      size='md'
      variant='default'
      onClick={renderProps.onClick}
      fullWidth
    >
      <Image
        alt='google logo'
        src='/images/google.png'
        width={20}
        height={20}
      />
      <Space w={8} />
      <div style={{ color: '#0F1514' }}>
        {authType === 'login' ? 'Login with Google' : 'Sign up with Google'}
      </div>
    </Button>
  );

  return (
    <>
      {isLoading && <Spinner />}
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        buttonText='Login With Google'
        render={(renderProps) => renderCustomButton(renderProps)}
        onSuccess={handleSuccessResponse}
        onFailure={handleErrorResponse}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
};

export default Index;

Index.propTypes = {
  authType: PropTypes.oneOf(['login', 'register']),
};

Index.defaultProps = {
  authType: 'login',
};
