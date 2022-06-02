import PropTypes from 'prop-types';
import { Navbar, AppShell, Box } from '@mantine/core';
import Logo from '@/icons/Logo';
import { createStyles } from '@mantine/core';
import { NAV_ITEMS } from '@/utils/AppUrls';
import NavbarHeader from '@/components/organisms/Navbar';
import { useRouter } from 'next/router';
import Link from 'next/link';

const styles = createStyles(() => ({
  navItem: {
    width: 'fit-content',
    padding: '17px',
    borderRadius: '15px',
    margin: '8px auto',
    cursor: 'pointer',
  },

  active: {
    background: '#006C52',

    '&:hover': {
      background: '#004a38',
    },
  },
}));

const displayLogo = () => (
  <Navbar.Section style={{ padding: '28px 24px' }}>
    <a href=''>
      <Logo width={69} height={50} />
    </a>
  </Navbar.Section>
);

const displayNavItems = (currPath) => {
  const { classes } = styles();

  return NAV_ITEMS.map(({ Component, tag, href }) => (
    <Link key={tag} href={href[0]} passHref>
      <div
        className={`${classes.navItem} ${href.includes(currPath) && classes.active}`}
      >
        <Component filled={href.includes(currPath)} />
      </div>
    </Link>
  ));
};

const displayNav = (currPath) => (
  <Navbar width={{ base: 117 }} style={{ border: 'none', background: '#F8F9FC' }}>
    {displayLogo()}
    {displayNavItems(currPath)}
  </Navbar>
);

const DashboardWrapper = ({ children, label }) => {
  const router = useRouter();
  const currPath = router.pathname;

  return (
    <AppShell navbar={displayNav(currPath)} fixed>
      <Box>
        <NavbarHeader label={label} />
        <Box style={{ padding: '0 71px 60px 58px' }}>{children}</Box>
      </Box>
    </AppShell>
  );
};

DashboardWrapper.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
};

DashboardWrapper.defaultProps = {
  children: null,
  label: null,
};

export default DashboardWrapper;
