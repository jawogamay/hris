import Link from 'next/link';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import HeaderLogo from '@/components/organisms/HeaderLogo';
import { Box, Center, Text, TextInput, Button, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import API from '@/api/BaseApi';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const form = useForm({
    initialValues: { email: '' },

    validate: {
      email: (value) => {
        if (value === '') {
          return 'Email is required';
        } else if (!/^\S+@\S+$/.test(value)) {
          return 'Incorrect email format';
        }
        return null;
      },
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    const options = {
      method: 'POST',
      url: '/reset-password-email',
      params: { ...values },
    };

    API.request(options)
      .then(() => {
        push('/reset-password-sent');
        setLoading(false);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          setLoading(false);
          form.setFieldError('email', 'Email not registered');
        }
      });
  };

  return (
    <Main meta={<Meta title='My Food Plan It' description='Login page' />}>
      <HeaderLogo />
      <Center style={{ height: '75vh' }}>
        <Box style={{ minWidth: 478 }}>
          <Text weight={700} style={{ fontSize: '35px' }}>
            Reset your Password
          </Text>
          <Text color='#7A8394'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis
            justo.
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              placeholder='Email address'
              mt={24}
              size='lg'
              {...form.getInputProps('email')}
              disabled={loading ? true : false}
            />

            <Button
              type='submit'
              fullWidth
              size='lg'
              mt={40}
              disabled={loading ? true : false}
            >
              {loading ? <Loader /> : 'Submit'}
            </Button>
          </form>

          <Link href='/login' passHref>
            <Button
              fullWidth
              size='lg'
              mt={16}
              style={{
                backgroundColor: 'white',
                border: 'solid 1px #CBD0E3',
                color: 'black',
              }}
              disabled={loading ? true : false}
            >
              Return to login
            </Button>
          </Link>
        </Box>
      </Center>
    </Main>
  );
};

export default Index;
