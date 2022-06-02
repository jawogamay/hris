import { Box, Grid, Center, Text, Space, Button } from '@mantine/core';
import Link from 'next/link'
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import WelcomeCard from '@/components/WelcomeCard';

const Index = () => {

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <Grid sx={{ margin: 0, height: '100vh' }}>
        <Grid.Col span={4} style={{ padding: 0, margin: 0 }}>
          <WelcomeCard />
        </Grid.Col>
        <Grid.Col span={8} sx={{ margin: 0, padding: 0}}>
          <Center style={{ height: '100vh' }}>
            <Box>
              <Text
                style={{ fontSize: 40, color: '#0F1514', fontWeight: '700' }}
              >
                Welcome to My Food Plan It
              </Text>
              <Text style={{ color: '#7A8394', fontWeight: '400' }}>
                Just few quick questions so we can customize My Food Plan It for
                you!
              </Text>
              <Space h={40} />
              <Link href='/register/onboarding/1'>
                <Button
                  fullWidth
                  size='xl'
                  style={{ backgroundColor: '#006C52' }}
                >
                  <Text>Continue </Text>
                </Button>
              </Link>
            </Box>
          </Center>
        </Grid.Col>
      </Grid>
    </Main>
  );
};

export default Index;
