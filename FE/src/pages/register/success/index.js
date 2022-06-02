import { Box, Grid, Center, Text, Loader } from '@mantine/core';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import WelcomeCard from '@/components/WelcomeCard';
import Btn from '@/components/molecules/Button';
import { useEffect, useState } from 'react';
import API from '@/api/BaseApi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const userId = Cookies.get('userId');
  const [loading, setLoading] = useState(false);
  const [goalWeightKg, setGoalWeightKg] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  useEffect(() => {
    getUserDetails();
  }, []);

  const goalWeightConvertion = (data) => {
    if (data.goal_weight_unit === 'lbs') {
      setGoalWeightKg(data.goal_weight * 0.45359237);
    } else {
      setGoalWeightKg(data.goal_weight);
    }
  };
  const heightCmConvertion = (data) => {
    if (data.height_unit === 'inch') {
      setHeightCm(data.height * 2.54);
    } else {
      setHeightCm(data.height);
    }
  };

  const caloriesGoal = (user) => {
    if (user.gender == 1) {
      let bmrMen =
        (10 * goalWeightKg + 6.25 * heightCm - 5 * user.age + 5) *
        user.activity_level;
      if (user.weight_goal_level == 'lose') {
        return user.nine_to_ten_mode ? (bmrMen - 350) * 0.1 : bmrMen - 350;
      } else if (user.weight_goal_level == 'maintain') {
        return user.nine_to_ten_mode ? bmrMen * 0.1 : bmrMen;
      } else if (user.weight_goal_level == 'gain') {
        return user.nine_to_ten_mode ? (bmrMen + 350) * 0.1 : bmrMen + 350;
      }
    } else {
      let bmrWomen =
        10 * goalWeightKg +
        6.25 * heightCm -
        5 * user.age -
        161 * user.activity_level;
      if (user.weight_goal_level == 'lose') {
        return user.nine_to_ten_mode ? (bmrWomen - 350) * 0.1 : bmrWomen - 350;
      } else if (user.weight_goal_level == 'maintain') {
        return user.nine_to_ten_mode ? bmrWomen * 0.1 : bmrWomen;
      } else if (user.weight_goal_level == 'gain') {
        return user.nine_to_ten_mode ? (bmrWomen + 350) * 0.1 : bmrWomen + 350;
      }
    }
  };

  const messageGoal = (user) => {
    if (user.weight_goal_level == 'lose') {
      return 'Lose from your current weight';
    } else if (user.weight_goal_level == 'maintain') {
      return 'Maintain your current weight';
    } else if (user.weight_goal_level == 'gain') {
      return 'Gain from your current weight';
    }
  };

  const saveCaloriesGoal = () => {
    const options = {
      method: 'POST',
      url: '/calorie-goal',
      data: {
        userId: userId,
        calorieGoal: Math.round(caloriesGoal(userDetails) * 100) / 100,
      },
    };
    API.request(options)
      .then(() => {
        router.push('/dashboard');
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const getUserDetails = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const options = {
      methods: 'GET',
      url: `/userdetail?userId=${userId}`,
    };
    API.request(options)
      .then(({ data }) => {
        setUserDetails(data);
        goalWeightConvertion(data);
        heightCmConvertion(data);
        setLoading(false);
      })
      .catch(({ response }) => {
        console.log(response);
        setLoading(false);
      });
  };

  return (
    <Main
      meta={
        <Meta title='My Food Plan It' description='Register Success Page' />
      }
    >
      <Grid>
        <Grid.Col span={4} style={{ height: '100%', padding: 0 }}>
          <WelcomeCard />
        </Grid.Col>
        <Grid.Col span={8}>
          <Center style={{ height: '100vh' }}>
            <Box>
              <Center>
                <Text
                  weight='bold'
                  color='green-theme'
                  style={{ fontSize: 56 }}
                >
                  Congratulations!
                </Text>
              </Center>
              <Center mt={36} mb={20}>
                <Text weight={600}>Your daily net calorie goal is:</Text>
              </Center>
              {!loading ? (
                <div>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      weight={800}
                      style={{
                        fontSize: 72,
                        alignSelf: 'flex-end',
                        position: 'relative',
                      }}
                    >
                      {isNaN(Math.round(caloriesGoal(userDetails)))
                        ? 0
                        : Math.round(caloriesGoal(userDetails))}
                      <Text
                        pb={22}
                        weight={600}
                        color='#7A8394'
                        style={{
                          fontSize: 24,
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          bottom: 0,
                          right: -50,
                        }}
                      >
                        Cal
                      </Text>
                    </Text>
                  </Box>
                  {userDetails && userDetails.nine_to_ten_mode ? (
                    <Center>
                      <Text color='#7A8394' style={{ fontSize: 14 }}>
                        base on 90/10 calculation
                      </Text>
                    </Center>
                  ) : (
                    <></>
                  )}
                  <Center mt={72} mb={6}>
                    <Text color='#7A8394' style={{ fontSize: 16 }}>
                      With this plan, you should:
                    </Text>
                  </Center>
                  <Center>
                    <Text weight={600} style={{ fontSize: 24 }}>
                      {messageGoal(userDetails)}
                    </Text>
                  </Center>
                </div>
              ) : (
                <Center>
                  <Loader />
                </Center>
              )}
              <Box
                mt={40}
                style={{ width: 478 }}
                onClick={() => saveCaloriesGoal()}
              >
                <Btn size='lg'>
                  <Text>Go to Dashboard </Text>
                </Btn>
              </Box>
            </Box>
          </Center>
        </Grid.Col>
      </Grid>
    </Main>
  );
};

export default Index;
