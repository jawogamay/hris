import '@/styles/globals.css';
import '@/styles/radio.css';
import PropTypes from 'prop-types';
import { AuthProvider } from '@/contexts/AuthProvider';
import { NotificationsProvider } from '@mantine/notifications';

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <NotificationsProvider position='top-right'>
        <Component {...pageProps} />
      </NotificationsProvider>
    </AuthProvider>
  );
};

App.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]),
  pageProps: PropTypes.object,
};

App.defaultProps = {
  Component: null,
  pageProps: null,
};

export default App;
