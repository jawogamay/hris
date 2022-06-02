import { useReipeImportCTX } from '@/contexts/RecipeImportContext';
import PropTypes from 'prop-types';
import Modal from '@/components/organisms/Modal';
import { useState } from 'react';
import { styles } from '@/components/organisms/Recipe/Import/styles';
import Calendar from '@/icons/Calendar';
import ChevronDown from '@/icons/Chevrondown';
import { DatePicker } from '@mantine/dates';
import RadioGroup from '@/components/organisms/RadioGroup';
import {
  meal_select_data,
  serving_select_data,
  recipe_import_choices,
} from '@/consts/select_choices';
import { dummyFoodIcon } from '@/consts/imageUrls';
import { useForm } from '@mantine/form';
import {
  Select,
  Box,
  Group,
  Button,
  Divider,
  Image,
  Text,
  Stack,
  Space,
  ScrollArea
} from '@mantine/core';

const LogItModal = ({ opened, setOpened }) => {
  const { recipe, handleSave, isSaving } = useReipeImportCTX();
  const [trackChoice, setTrackChoice] = useState(0);

  const form = useForm({
    initialValues: {
      date: new Date(),
      meal_type: '',
      serving: '',
    },

    validate: {
      meal_type: (value) => (!value ? 'Meal type is required' : null),
      serving: (value) => (!value ? 'Servings is required' : null),
    },
  });

  return (
    <Modal
      opened={opened}
      setOpened={setOpened}
      header={'Confirm'}
      padding={0}
      size={'40%'}
      width={'700px'}
      height={'568px'}
    >
      <Divider size='xs' />
      <form
        onSubmit={form.onSubmit((values) => handleSave(values, trackChoice))}
      >
        <Box
          sx={{
            padding: '0 32px 32px 32px',
            position: 'relative'
          }}
        >
          <ScrollArea style={{ height: 432 }} pb={64}>
            <Stack
              spacing={24}
              sx={{
                height: '100%',
                justifyContent: 'space-between',
                display: 'flex',
                alignContent: 'end',
              }}
              mt={30}
            >
              <Group sx={{ display: 'flex', alignItems: 'start' }}>
                <Image
                  src={recipe.image ?? dummyFoodIcon}
                  height={126}
                  width={126}
                  radius='md'
                  alt='Food'
                />
                <Box>
                  <Text
                    sx={{
                      fontSize: '24px',
                      fontWeight: '700',
                      lineHeight: '10px',
                    }}
                    styles={() => ({
                      root: {
                        width: 494,
                        lineHeight: 'unset !important'
                      }
                    })}
                  >
                    {recipe.title}
                  </Text>
                  <Space h={16} />
                  {recipe?.url ? (
                    <Group sx={{ display: 'flex' }} spacing={8}>
                      <Text>from</Text>
                      <Text sx={{ fontWeight: 700, color: '#006C52' }}>
                        {new URL(recipe.url).hostname}
                      </Text>
                    </Group>
                  ) : null}
                  <Space h={16} />
                  <Group>
                    <DatePicker
                      sx={() => ({
                        input: {
                          height: 48,
                          width: 146,
                          borderRadius: 8,
                          fontWeight: 700,
                        },
                      })}
                      icon={<Calendar width={16} height={16} />}
                      clearable={false}
                      {...form.getInputProps('date')}
                    />

                    <Select
                      data={meal_select_data}
                      rightSection={<ChevronDown width={40} height={40} />}
                      maxDropdownHeight={400}
                      nothingFound='Nobody here'
                      placeholder='Breakfast'
                      sx={() => ({
                        input: {
                          height: 48,
                          width: 136,
                          borderRadius: 8,
                          fontWeight: 700,
                        },
                      })}
                      styles={() => ({
                        label: styles.label,
                      })}
                      {...form.getInputProps('meal_type')}
                    />

                    <Select
                      data={serving_select_data}
                      rightSection={<ChevronDown width={40} height={40} />}
                      maxDropdownHeight={400}
                      nothingFound='Nobody here'
                      placeholder='Servings'
                      sx={() => ({
                        input: {
                          height: 48,
                          width: 123,
                          borderRadius: 8,
                          fontWeight: 700,
                        },
                      })}
                      styles={() => ({
                        label: styles.label,
                      })}
                      {...form.getInputProps('serving')}
                    />
                  </Group>
                </Box>
              </Group>
            </Stack>
            <Text style={{ fontWeight: 600, fontSize: 16 }} mt={20}>
              Choose one of the options below
            </Text>
            <Space h={18} />
            <Box>
              <RadioGroup
                values={recipe_import_choices}
                name={'options'}
                trackChoice={trackChoice}
                setTrackChoice={setTrackChoice}
              />
            </Box>
            <Space h={32} />
          </ScrollArea>
          <Box style={{
            background: '#fff',
            position: 'fixed',
            width: '100%',
            height: 100,
            borderBottomRightRadius: 3,
            borderBottomLeftRadius: 3,
            left: 0,
            bottom: 0
          }}>
            <Group
              position='right'
              pt={28}
              pr={32}
            >
              <Button
                style={{
                  width: '146px',
                  height: '42px',
                }}
                type='submit'
                disabled={isSaving}
              >
                Save
              </Button>
            </Group>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

LogItModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
};

export default LogItModal;
