import PropTypes from 'prop-types';
import MinMaxInputFields from '@/components/organisms/MinMaxInputFields';
import { Box, Button, Text, Drawer, Checkbox, Divider } from '@mantine/core';

const Index = ({
  title,
  openDrawer,
  setOpenDrawer,
  form,
  handleForm,
  handleResetFilter,
}) => {
  return (
    <>
      <Drawer
        padding={0}
        position='right'
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={title}
        size='md'
        styles={{
          title: {
            color: '#445670',
            fontWeight: 'bold',
            fontSize: 20,
          },
          closeButton: {
            background: '#EFF2F4',
            borderRadius: '50%',
            color: '#8C97A1',
          },
          header: {
            padding: 24,
            margin: 0,
          }
        }}
      >
        <form onSubmit={form.onSubmit(handleForm)}>
          <Divider />
          <Box
            py={32}
            px={24}
            sx={{
              height: '93vh',
              display: 'flex',
              flexWrap: 'wrap',
              alignContent: 'space-between',
            }}
          >
            <Box>
              <Text weight='bold'>Type of pre-made meal plan</Text>
              <Checkbox
                py={13}
                label='Free'
                {...form.getInputProps('isFree', { type: 'checkbox' })}
              />
              <Checkbox
                label='Premium'
                {...form.getInputProps('isPremium', { type: 'checkbox' })}
              />

              <MinMaxInputFields
                label='Price'
                form={form}
                name={{ min: 'price_min', max: 'price_max' }}
              />
              <MinMaxInputFields
                label='Total Recipe'
                form={form}
                name={{ min: 'total_recipe_min', max: 'total_recipe_max' }}
              />
              <MinMaxInputFields
                label='Total Days'
                form={form}
                name={{ min: 'total_days_min', max: 'total_days_max' }}
              />
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                type='reset'
                variant='subtle'
                sx={{
                  width: '45%',
                  '&:hover': {
                    color: '#FFF',
                  },
                }}
                onClick={handleResetFilter}
              >
                Reset filter
              </Button>
              <Button
                type='submit'
                sx={{
                  width: '45%',
                  '&:hover': {
                    opacity: 0.9,
                  },
                }}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </form>
      </Drawer>
    </>
  );
};

export default Index;

Index.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  setOpenDrawer: PropTypes.func.isRequired,
  form: PropTypes.object,
  handleForm: PropTypes.func,
  handleResetFilter: PropTypes.func,
};

Index.defaultProps = {
  form: { onSubmit: () => null, getInputProps: () => null },
  handleForm: () => null,
  handleResetFilter: () => null,
};
