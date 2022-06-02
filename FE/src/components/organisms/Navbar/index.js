import PropTypes from 'prop-types';
import { Menu, Text, Avatar, Box, Group } from '@mantine/core';
import Logout from '@/icons/Logout';
import Gear from '@/icons/Gear';
import DangerCircle from '@/icons/DangerCircle';
import Notifications from './Notification';

const Index = ({ label }) => {
  return (
    <Box
      p='40px 71px 40px 58px'
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Text weight='bold' sx={{ fontSize: 32 }}>
        {label}
      </Text>
      <Group>
        <Menu
          placement='center'
          control={
            <Box>
              <DangerCircle />
            </Box>
          }
          sx={{ cursor: 'pointer'}}
        >
          <Menu.Item>My Food Plan-it</Menu.Item>
        </Menu>
        <Notifications />
        <Menu
          control={
            <Avatar
              src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
              radius='xl'
              size={48}
            />
          }
          sx={{ cursor: 'pointer'}}
        >
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<Gear />}>Settings</Menu.Item>
          <Menu.Item component='a' href='/logout' icon={<Logout />}>
            Logout
          </Menu.Item>
        </Menu>
      </Group>
    </Box>
  );
};

export default Index;

Index.propTypes = {
  label: PropTypes.string,
};

Index.defaultProps = {
  label: null,
};
