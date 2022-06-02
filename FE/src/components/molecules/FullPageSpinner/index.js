import PropTypes from 'prop-types';
import { createStyles, Center, Loader, Text, Box } from '@mantine/core';
import Main from '@/templates/Main';

const useStyles = createStyles(() => ({
  loader: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    background: ' #80808078',
    zIndex: 9999,
  },
}));

const Index = ({ label }) => {
  const { classes } = useStyles();

  return (
    <Main>
      <div className={classes.loader}>
        <Center style={{ height: '100vh' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column ',
              alignItems: 'center',
            }}
          >
            <Loader size='xl' />
            <Text
              mt={8}
              color='white'
              sx={{ textShadow: '2px 2px 4px #000000' }}
            >
              {label}
            </Text>
          </Box>
        </Center>
      </div>
    </Main>
  );
};

Index.propTypes = {
  label: PropTypes.bool,
};

Index.defaultProps = {
  label: null,
};

export default Index;
