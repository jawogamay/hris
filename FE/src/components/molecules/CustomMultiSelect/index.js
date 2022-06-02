import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Search from '@/icons/Search';
import { Box, MultiSelect, Text, Group } from '@mantine/core';

const SelectItem = forwardRef(({ label, count, ...others }, ref) => (
  <div ref={ref} {...others} sx={{ padding: 0 }}>
    <Group spacing='xs' noWrap sx={{ cursor: 'pointer' }}>
      <Search width={16} height={16} />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Text weight={600}>#{label}</Text>
        <Text color='#9AA5B6'>{count}</Text>
      </Box>
    </Group>
  </div>
));

const Index = ({ data }) => {
  return (
    <MultiSelect
      rightSection
      searchable
      icon={<Search />}
      radius='xl'
      size='md'
      placeholder='Search meal plan'
      maxDropdownHeight={260}
      data={data}
      itemComponent={SelectItem}
      styles={{
        input: {
          padding: '5px 20px',
          minWidth: 330,
        },
        values: {
          minWidth: 230,
        },
        value: {
          backgroundColor: '#EFF2F4',
          borderRadius: 6,
          color: '#006C52',
          padding: 4,
          fontWeight: 600,
        },
        item: {
          borderBottom: '1px solid #EFF2F4',
        },
        separator: {
          padding: '16px 0 0 16px',
        },
        separatorLabel: {
          color: '#0B2C2A',
        },
      }}
    />
  );
};

export default Index;

SelectItem.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Index.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.string,
      label: PropTypes.string,
      count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

Index.defaultProps = {
  data: null,
};
