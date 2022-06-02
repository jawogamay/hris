import PropTypes from 'prop-types';
import { Anchor, Breadcrumbs } from '@mantine/core';
import ChevronRight from '@/icons/ChevronRight';

const Index = ({ items }) => {
  const children = items.map((item, index) => (
    <Anchor
      sx={{
        color: item.color,
      }}
      size='sm'
      href={item.href}
      key={index}
    >
      {item.title}
    </Anchor>
  ));

  return <Breadcrumbs separator={<ChevronRight />}>{children}</Breadcrumbs>;
};

export default Index;

Index.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string,
      href: PropTypes.string,
      color: PropTypes.string,
    })
  ).isRequired,
};
