import { useState, useEffect } from 'react';
import moment from 'moment';
import { Menu, Box, Text, createStyles } from '@mantine/core';
import Bell from '@/icons/Bell';
import BellCircle from '@/icons/BellCircle';
import countBy from 'lodash/countBy';

const styles = createStyles(() => ({
  notifictionIcon: {
    padding: '13px 15px',
    background: '#087d61',
    borderRadius: '999px',
    marginRight: '14px',
  },
  menuItem: {
    padding: 0,
    borderRadius: 0,
  },
  borderBtm: {
    borderBottom: '1px solid #e3e3e3',
  },
  viewed: {
    backgroundColor: '#eff5f4',
  },
  wrapper: {
    padding: '19px 25px 18px 16px',
    width: '100%',
    display: 'flex',
  },
  notificationContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
  },
  preview: {
    fontSize: '14px',
    lineHeight: '18px',
    marginBottom: '4px',
  },
}));

const notifications = [
  {
    id: 1,
    message: 'Your Account',
    date: '4/2/2022, 5:32:30 PM',
    wasViewed: false,
  },
  {
    id: 3,
    message: 'Odio egestas condimentum aliquet massa.',
    date: '4/2/2022, 5:32:30 PM',
    wasViewed: false,
  },
  {
    id: 4,
    message:
      'Volutpat aenean et ac facilisi duis at sit. Ultrices et in luctus.',
    date: '4/2/2022, 5:32:30 PM',
    wasViewed: true,
  },
];

const Notification = () => {
  const [hasActive, setHasActive] = useState(false);
  const { classes } = styles();

  useEffect(() => {
    const actives = countBy(notifications, 'wasViewed').true;

    setHasActive(Boolean(actives));
  }, []);

  const formatTime = (time) => {
    return moment(time, 'MM/DD/YYYY HH:mm:ss A').fromNow();
  };

  return (
    <Menu
      placement='end'
      size={320}
      style={{ padding: 0, borderRadius: '15px', cursor: 'pointer' }}
      control={
        <Box>
          <BellCircle withRedDot={hasActive} />
        </Box>
      }
    >
      {notifications.map((notification, idx) => {
        const { id, message, date, wasViewed } = notification;

        return (
          <Menu.Item
            key={id}
            className={`${classes.menuItem} ${!wasViewed && classes.viewed} ${
              idx < notifications.length - 1 && classes.borderBtm
            }`}
          >
            <div className={classes.wrapper}>
              <div>
                <div className={classes.notifictionIcon}>
                  <Bell height={22} width={20} />
                </div>
              </div>
              <div className={classes.notificationContent}>
                <Text weight={600} className={classes.preview}>
                  {message}
                </Text>
                <Text size='xs' color='#7A8394' weight={500}>
                  {formatTime(date)}
                </Text>
              </div>
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default Notification;
