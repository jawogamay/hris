import React, { useContext, useState } from 'react';
import Link from 'next/link';
import API from '@/api/BaseApi';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import HeaderLogo from '@/components/organisms/HeaderLogo';
import GoogleLogin from '@/components/organisms/GoogleLogin';
import Eye from '@/icons/Eye';
import EyeOff from '@/icons/EyeOff';
import { useForm } from '@mantine/form';
import {
  Box,
  Center,
  Text,
  Divider,
  Anchor,
  TextInput,
  Button,
  PasswordInput,
  Checkbox,
  Group,
} from '@mantine/core';
import { AuthContext } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const { handleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: { email: '', password: '', remember: false },

    validate: {
      email: (value) => {
        if (value === '') {
          return 'Email is required';
        } else if (!/^\S+@\S+$/.test(value)) {
          return 'Incorrect email format';
        }
        return null;
      },
      password: (value) => (value === '' ? 'Password is required' : null),
    },
  });

  const handleSubmit = (values) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const options = {
      method: 'POST',
      url: '/login',
      params: { ...values },
    };

    API.request(options)
      .then(({ data }) => {
        handleLogin(data);
        router.push('/dashboard');
      })
      .catch(({ response }) => {
        if (response.status === 422 || response.status === 401) {
          form.setErrors({ email: true, password: response.data.message });
        }
        setLoading(false);
      });
  };

  return (
    <Main meta={<Meta title='My Food Plan It' description='Login page' />}>
      <Center style={{ height: '75vh' }}>
        <Box style={{ minWidth: 478 }}>
          <Text weight={700} style={{ fontSize: '35px' }}>
            Login into my account
          </Text>
          <Text color='#7A8394'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Box style={{ display: 'flex' }}>
            <Text color='#7A8394'>Venenatis justo or&nbsp;</Text>
            <Link href='/register/welcome' passHref>
              <Anchor weight='bold' underline={false}>
                create an account
              </Anchor>
            </Link>
          </Box>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              placeholder='Email address'
              mt={24}
              size='lg'
              {...form.getInputProps('email')}
            />
            <PasswordInput
              mt={12}
              size='lg'
              placeholder='Password'
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <EyeOff size={size} /> : <Eye size={size} />
              }
              {...form.getInputProps('password')}
            />

            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Group>
                <Checkbox
                  mt='sm'
                  {...form.getInputProps('remember', { type: 'checkbox' })}
                />
                <Text size='sm' pt={12} color='#7A8394'>
                  Remember me
                </Text>
              </Group>
              <Group pt={12}>
                <Link href='/reset-password' passHref>
                  <Anchor weight='bold' size='sm' underline={false}>
                    Forgot password?
                  </Anchor>
                </Link>
              </Group>
            </Box>

            <Box mt={24}>
              <Button
                size='lg'
                type='submit'
                sx={{ width: '100%' }}
                disabled={loading}
              >
                Login
              </Button>
            </Box>
          </form>
          <Divider label='OR' labelPosition='center' my={24} />

          <GoogleLogin authType='login' />
        </Box>
      </Center>
    </Main>
  );
};

export default Login;
