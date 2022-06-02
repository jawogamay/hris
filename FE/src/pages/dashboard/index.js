import React from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import { useState } from 'react';
import DashboardWrapper from '@/templates/DashboardWrapper';
import { Box, Space, Text, Grid, Divider, Center, Button, Image } from '@mantine/core';
import Filter from '@/icons/filter';
import TierCard from '@/components/organisms/dashboard/TierCard';
import Graph from '@/components/organisms/dashboard/Graph';
import CircularProgressBar from '@/components/organisms/dashboard/CircularProgressBar';
import MealCard from '@/components/organisms/dashboard/MealCard';
import MyCircleCard from '@/components/organisms/dashboard/MyCircleCard';
import BarChart from '@/components/organisms/dashboard/BarChart';
import Modal from '@/components/organisms/Modal';
import SwapIcon from '@/icons/SwapIcon';
import WaterTracker from '@/icons/WaterTracker';
import CaloriesTracker from '@/icons/CaloriesTracker';
import FatCount from '@/icons/FatCount';
import DaysTracked from '@/icons/DaysTracked';
import SpoonForkCrossed from '@/icons/spoonForkCrossed';

const Index = () => {
  const [opened, setOpened] = useState(false);

  const ModalListItem = ({ children, badge, actionButton }) => {
    return (
      <Grid.Col span={4}>
        <Box
          sx={{
            padding: '24px',
            borderRadius: '15px',
            border: '1px solid #ECEFF4',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              boxShadow: '0px 40px 80px #EEF1F4;',
            },
          }}
        >
          <Box sx={{ marginRight: '12px' }}>{badge}</Box>
          <Box sx={{ marginRight: 'auto', color: '#7A8394', fontWeight: 500 }}>
            {children}
          </Box>
          {actionButton}
        </Box>
      </Grid.Col>
    );
  };

  const ModalBadge = ({ children, bgColor }) => {
    return (
      <Box
        sx={{
          width: '42px',
          height: '42px',
          background: bgColor,
          borderRadius: '42px',
        }}
      >
        <Center sx={{ height: '100%' }}>{children}</Center>
      </Box>
    );
  };

  const list = [
    {
      label: 'Green Tier',
      icon: <SpoonForkCrossed />,
      actionButton: (
        <Box
          sx={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            background: '#B2DD91',
            borderRadius: '12px',
          }}
        >
          <Center sx={{ height: '100%' }}>
            <SwapIcon />
          </Center>
        </Box>
      ),
    },
    {
      label: 'Yellow Tier',
      icon: <SpoonForkCrossed bgColor={'#F7C925'} />,
    },
    {
      label: 'Red Tier',
      icon: <SpoonForkCrossed bgColor={'#D50808'} />,
    },
    {
      label: 'Protein Count',
      icon: (
        <ModalBadge bgColor={'#D50808'}>
          <Image
            alt='molecular logo'
            src='/images/icons/molecular-structure.png'
            width={20}
            height={20}
          />
        </ModalBadge>
      ),
    },
    {
      label: 'Total Recipes',
      icon: (
        <ModalBadge bgColor={'#D48C29'}>
          <Image
            alt='recipe logo'
            src='/images/icons/recipe.png'
            width={20}
            height={20}
          />
        </ModalBadge>
      ),
    },
    {
      label: 'Water Tracked',
      icon: (
        <ModalBadge bgColor={'#47A2D6'}>
          <WaterTracker />
        </ModalBadge>
      ),
    },
    {
      label: 'Calories Tracker',
      icon: (
        <ModalBadge bgColor={'#D50808'}>
          <CaloriesTracker />
        </ModalBadge>
      ),
    },
    {
      label: 'Fat Count',
      icon: (
        <ModalBadge bgColor={'#D48C29'}>
          <FatCount />
        </ModalBadge>
      ),
    },
    {
      label: 'Total Days Tracked',
      icon: (
        <ModalBadge bgColor={'#D7998E'}>
          <DaysTracked />
        </ModalBadge>
      ),
    },
  ];

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <DashboardWrapper label='Overview'>
        <Modal opened={opened} setOpened={setOpened} padding={0} header={'Custom Summary Information'}>
          <Divider />
          <Box p={32}>
            <Text
              sx={{
                color: '#1C212D',
                fontWeight: 500,
                fontSize: 20,
              }}
            >
              Active
            </Text>
            <Space h={16} />
            <Grid gutter={'24'}>
              {list.map(({ label, icon, actionButton }, index) => {
                return (
                  <>
                    <ModalListItem
                      badge={icon}
                      actionButton={actionButton && actionButton}
                      key={index}
                    >
                      {label}
                    </ModalListItem>
                    {index === 2 && <Grid.Col span={12} m={0}>
                      <Space h={42} />
                      <Text
                        sx={{
                          color: '#1C212D',
                          fontWeight: 500,
                          fontSize: 20,
                        }}
                      >
                        Other information
                      </Text>
                      <Space h={16} />
                    </Grid.Col>
                    }
                  </>
                );
              })}
            </Grid>
            <Space h={40} />
            <Box
              onClick={() => setOpened(false)}
              w={100}
              sx={{ display: 'flex', justifyContent: 'end' }}
            >
              <Button size='md' sx={{ padding: '12px 56px' }}>
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'end',
            cursor: 'pointer',
          }}
          onClick={() => setOpened(true)}
        >
          <Filter />
          <Space w='xs' />
          <Text
            color='green-theme'
            size='sm'
            weight='bold'
            style={{ alignSelf: 'center' }}
          >
            Customize
          </Text>
        </Box>

        <Space h={27} />

        <Grid gutter={33}>
          <Grid.Col span={4}>
            <TierCard tier='Green Tier' count='120' />
          </Grid.Col>
          <Grid.Col span={4}>
            <TierCard tier='Yellow Tier' count='42' iconColor='#F7C925' />
          </Grid.Col>
          <Grid.Col span={4}>
            <TierCard tier='Red Tier' iconColor='#D50808' />
          </Grid.Col>
          <Grid.Col span={9}>
            <Graph />
          </Grid.Col>
          <Grid.Col span={3}>
            <CircularProgressBar />
          </Grid.Col>
          <Grid.Col span={4}>
            <MealCard />
          </Grid.Col>
          <Grid.Col span={4}>
            <MyCircleCard />
          </Grid.Col>
          <Grid.Col span={4}>
            <BarChart />
          </Grid.Col>
        </Grid>
      </DashboardWrapper>
    </Main >
  );
};

export default Index;
