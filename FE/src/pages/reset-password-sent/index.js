import Link from 'next/link';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import HeaderLogo from '@/components/organisms/HeaderLogo';
import { Box, Center, Text, Button } from '@mantine/core';

const Index = () => {
  return (
    <Main meta={<Meta title='My Food Plan It' description='Login page' />}>
      <HeaderLogo />
      <Center style={{ height: '75vh' }}>
        <Box style={{ width: 478 }}>
          <Text weight={700} style={{ fontSize: '35px' }}>
            We just sent you an email to reset your password
          </Text>
          <Text color='#7A8394'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis
            justo
          </Text>

          <Link href='/login' passHref>
            <Button fullWidth size='lg' mt={40}>
              Ok
            </Button>
          </Link>
        </Box>
      </Center>
    </Main>
  );
};

export default Index;
