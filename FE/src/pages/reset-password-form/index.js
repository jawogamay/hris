import Link from 'next/link';
import Eye from '@/icons/Eye';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import EyeOff from '@/icons/EyeOff';
import HeaderLogo from '@/components/organisms/HeaderLogo';
import {
  Box,
  Center,
  Text,
  Button,
  PasswordInput,
  Loader,
  TextInput,
  Alert,
} from '@mantine/core';
import API from '@/api/BaseApi';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setErrors] = useState(false);
  const router = useRouter();
  const { push } = useRouter();

  const form = useForm({
    initialValues: {
      password: '',
      password_confirmation: '',
      email: '',
      token: '',
    },

    validate: {
      password: (value) => {
        if (value === '') {
          return 'Password  is required';
        } else if (
          !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,24}$/.test(value)
        ) {
          return 'Your password must be between 8 to 24 characters, and should have at least 1 capital letter and 1 special character.';
        }
        return null;
      },
      password_confirmation: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  useEffect(() => {
    if (!router.isReady) return;
    let { token, email } = router.query;
    form.setValues({ token: token, email: email });
  }, [router.isReady]);

  const handleSubmit = (values) => {
    setLoading(true);
    const options = {
      method: 'POST',
      url: '/reset-password',
      params: { ...values },
    };

    API.request(options)
      .then(() => {
        push('/login');
        setLoading(false);
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          setErrors(true);
          setLoading(false);
        }
      });
  };

  return (
    <Main meta={<Meta title='My Food Plan It' description='Login page' />}>
      <HeaderLogo />
      <Center style={{ height: '75vh' }}>
        <Box style={{ width: 478 }}>
          <Text weight={700} style={{ fontSize: '35px' }}>
            Please input your new password
          </Text>
          <Text color='#7A8394'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis
            justo.
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput type='hidden' {...form.getInputProps('email')} />
            <TextInput type='hidden' {...form.getInputProps('token')} />
            <PasswordInput
              mt={12}
              size='lg'
              placeholder='New password'
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <EyeOff size={size} /> : <Eye size={size} />
              }
              {...form.getInputProps('password')}
              disabled={loading ? true : false}
            />

            <PasswordInput
              mt={12}
              size='lg'
              placeholder='Confirm new password'
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <EyeOff size={size} /> : <Eye size={size} />
              }
              {...form.getInputProps('password_confirmation')}
              disabled={loading ? true : false}
            />

            {hasErrors && (
              <Alert title='Error!' color='red' sx={{ marginTop: 32 }}>
                Your Password Reset Link has Expired
              </Alert>
            )}

            <Button
              fullWidth
              size='lg'
              mt={40}
              type='submit'
              disabled={loading || hasErrors ? true : false}
            >
              {loading ? <Loader /> : 'Save'}
            </Button>
          </form>
        </Box>
      </Center>
    </Main>
  );
};
export default Index;
