import PropTypes from 'prop-types';
import Link from 'next/link';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import HeaderLogo from '@/components/organisms/HeaderLogo';
import RoundCloseButton from '@/components/RoundCloseButton';
import { useEffect, useState } from 'react';
import {
  Center,
  Text,
  Grid,
  Card,
  Avatar,
  Group,
  Box,
  Container,
} from '@mantine/core';
import API from '@/api/BaseApi';
import Cookies from 'js-cookie';

const DisplayField = ({ field, value, span }) => {
  return (
    <Grid.Col span={span}>
      <Group direction={'column'} spacing={4}>
        <Text style={{ fontSize: '24px' }}>{value}</Text>
        <Text style={{ color: '#7A8394' }}>{field}</Text>
      </Group>
    </Grid.Col>
  );
};

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const token = Cookies.get('token');
  useEffect(() => {
    getProfile();
  }, [token]);
  const getProfile = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const options = {
      methods: 'GET',
      url: '/users/profile',
    };
    API.request(options)
      .then(({ data }) => {
        setUser(data);
      })
      .catch(({ response }) => {
        console.log(response);
        setLoading(false);
      });
  };
  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <HeaderLogo />
      <Link href='/dashboard' passHref>
        <Box
          style={{
            position: 'fixed',
            top: '36px',
            right: '36px',
          }}
        >
          <RoundCloseButton />
        </Box>
      </Link>
      <Container>
        <Center style={{ height: '75vh' }}>
          <Grid>
            <Grid.Col span={4}>
              <Card
                style={{
                  color: 'white',
                  maxWidth: '412px',
                  textAlign: 'center',
                  borderRadius: '25px',
                  backgroundColor: '#006C52',
                  padding: '64px 64px 128px 64px',
                }}
              >
                <Center>
                  <Grid>
                    <Grid.Col style={{ padding: '0' }} span={12}>
                      <Center>
                        <Avatar
                          size={143}
                          radius={143}
                          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
                        />
                      </Center>
                    </Grid.Col>
                    <Grid.Col style={{ padding: '0' }} span={12}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: '32px',
                        }}
                      >
                        {user.user_detail && user.user_detail.username}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Text
                        style={{
                          color: 'white',
                          opacity: '50%',
                          fontSize: '20px',
                        }}
                      >
                        {user.email}
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col
              span={8}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Grid style={{ padding: '0px 32px' }}>
                <DisplayField
                  span={4}
                  value={
                    user.user_detail && user.user_detail.gender == 1
                      ? 'Male'
                      : 'Female'
                  }
                  field={'Gender'}
                />
                {/* <DisplayField
                  span={8}
                  value={'35553 KENAI SPUR HIGHWAY'}
                  field={'Location'}
                /> */}
                {/* <DisplayField span={4} value={'99669'} field={'Zip Code'} />
                <DisplayField span={8} value={'PST'} field={'Timezone'} /> */}
                <DisplayField
                  span={4}
                  value={user.user_detail && user.user_detail.height}
                  field={'Height'}
                />
                <DisplayField
                  span={8}
                  value={'Cm (cm)'}
                  field={'Preferred unit system'}
                />
                <DisplayField span={4} value={'-'} field={'DOB'} />
                <DisplayField
                  span={8}
                  value={user.user_detail && user.user_detail.calorie_goal}
                  field={'Goal(weight, nutrition goals)'}
                />
              </Grid>
            </Grid.Col>
          </Grid>
        </Center>
      </Container>
    </Main>
  );
};

export default Index;

DisplayField.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  span: PropTypes.number,
};

DisplayField.defaultProps = {
  field: '-',
  value: '-',
  span: 0,
};
