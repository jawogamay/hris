import { useState } from 'react';
import {
  Drawer,
  Alert,
  TextInput,
  MultiSelect,
  Tabs,
  ScrollArea,
  Grid,
  Stack,
  Box,
  Group,
  Button,
  Text,
  Anchor,
} from '@mantine/core';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { DraggableRecipe } from './DraggableRecipe';
import { CustomDragLayer } from './CustomDragLayer';
import RoundedInputBar from '@/components/molecules/RoundedInputBar';
import SearchIcon from '@/icons/SearchIcon';
import Bulb from '@/icons/Bulb';
import ChevronRight from '@/icons/ChevronRight';
import CellGrid from './CellGrid';
import MealPlanBoard from './MealPlanBoard';
import PropTypes from 'prop-types';
import { CustomSelectItem, FileTreeItem } from './components';

const Index = ({
  tags,
  fileTreeItems,
  isPreMadeOpen,
  setIsPreMadeOpen,
  mealPlans,
  week,
  addRecipeToBoard,
  meals,
  weekHandler,
}) => {
  const [selectedItem, setSelectedItem] = useState({});
  const TOTAL_DAYS = 6;

  const SearchResult = () => {
    return (
      <Group
        noWrap
        position='apart'
        sx={{ height: 44, padding: 0 }}
        pl={24}
        pr={20}
      >
        <Text size='xs' color='dimmed'>
          New tag
        </Text>
      </Group>
    );
  };

  const selectedFoodHandler = (recipes, title) => {
    setSelectedItem({ title, recipes });
  };

  const renderFileTreeItems = () => {
    return fileTreeItems.map((item, i) => {
      return (
        <FileTreeItem
          text={item.text}
          recipe={item.recipe}
          key={i}
          selectedFoodHandler={selectedFoodHandler}
        />
      );
    });
  };

  const renderDays = (offset, limit) => {
    let days = [];
    for (let i = offset; i < limit; i++) {
      days.push(
        <CellGrid
          yIndex={i}
          xIndex={0}
          sx={{ position: 'relative' }}
          isDaysRow={true}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              zIndex: 2,
              left: '50%',
              transform: 'translate(-50%, -80px)',
            }}
          >
            <Text
              size='sm'
              color='#778CA3'
              weight='bold'
              sx={{ textAlign: 'center' }}
            >
              Day
            </Text>
            <Text
              pt={10}
              size='xl'
              color='#101E51'
              sx={{ textAlign: 'center' }}
            >
              {i + 1}
            </Text>
          </Box>
        </CellGrid>
      );
    }

    return days;
  };

  const renderDaysRow = (week = 0) => {
    const limit = (week + 1) * TOTAL_DAYS;
    const position = limit - TOTAL_DAYS;
    return [...Array(1)].map((row, i) => {
      return (
        <Group
          key={i}
          spacing={0}
          sx={{ flexWrap: 'nowrap', position: 'relative' }}
        >
          <Box
            sx={{
              background: '#fff',
              width: '100%',
              height: 69,
              position: 'absolute',
              zIndex: 1,
              top: 0,
              left: 0,
            }}
          />
          {renderDays(position, limit)}
        </Group>
      );
    });
  };

  const renderLabelsColumn = () => {
    return [...Array(1)].map((row, i) => {
      return (
        <Stack
          key={i}
          spacing={0}
          sx={{ flexWrap: 'nowrap', position: 'relative' }}
          ml={-137}
          mt='20vh'
        >
          <Box
            sx={{
              background: '#fff',
              width: 120,
              height: '100%',
              position: 'absolute',
              zIndex: 1,
              top: 0,
              left: 0,
            }}
          />
          {[...Array(meals.length)].map((col, j) => {
            return (
              <CellGrid
                key={j}
                yIndex={j}
                xIndex={i}
                isRow={false}
                sx={{ position: 'relative' }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 2,
                    left: '50%',
                    transform: 'translate(-50%, -9vh)',
                  }}
                >
                  <Text
                    size='sm'
                    color='#778CA3'
                    weight='bold'
                    sx={{ textAlign: 'center' }}
                  >
                    {meals[j]}
                  </Text>
                </Box>
              </CellGrid>
            );
          })}
        </Stack>
      );
    });
  };

  const renderRecipes = () => {
    return selectedItem.recipes.map((item, i) => (
      <DraggableRecipe recipe={item} key={i} />
    ));
  };

  return (
    <Drawer
      opened={isPreMadeOpen}
      onClose={() => setIsPreMadeOpen(false)}
      title='Add pre-made meal plan'
      styles={() => ({
        header: {
          padding: '31px 48px',
          borderBottom: '1px solid #E6E6E6',
          margin: 0,
        },
        drawer: {
          width: '100%',
        },
        title: {
          color: '#445670',
          fontWeight: 700,
          fontSize: 20,
        },
        closeButton: {
          background: '#EFF2F4',
          height: 41,
          width: 41,
          borderRadius: 9999,
        },
      })}
    >
      <DndProvider backend={HTML5Backend}>
        <Grid columns={24} pt={8}>
          <Grid.Col span={6} py={32} px={0}>
            <Stack>
              <TextInput
                placeholder='e.g. OCD diet plan'
                label='Plan Name'
                px={48}
                styles={() => ({
                  label: {
                    fontWeight: 'bold',
                    color: '#1C212D',
                  },
                  input: {
                    borderColor: '#E5ECF2',
                  },
                })}
                size='md'
                variant='filled'
              />
              <MultiSelect
                data={tags}
                filter={(value, selected, item) =>
                  !selected &&
                  item.label.toLowerCase().includes(value.toLowerCase().trim())
                }
                label='Tags'
                maxDropdownHeight={300}
                nothingFound={<SearchResult />}
                size='md'
                searchable
                itemComponent={CustomSelectItem}
                px={48}
                styles={() => ({
                  label: {
                    fontWeight: 'bold',
                    color: '#1C212D',
                  },
                  input: {
                    borderColor: '#E5ECF2',
                    minHeight: 58,
                    paddingTop: 5,
                  },
                  defaultValue: {
                    backgroundColor: '#FFFFFF',
                  },
                  values: {
                    height: '100%',
                  },
                  value: {
                    height: 34,
                  },
                  item: {
                    padding: 0,
                    paddingLeft: 24,
                    height: 44,
                  },
                  dropdown: {
                    padding: 0,
                    position: 'relative',
                  },
                  nothingFound: {
                    padding: 0,
                  },
                })}
                variant='filled'
              />
              {Object.keys(selectedItem).length === 0 ? (
                <Tabs
                  position='center'
                  color='#006C52'
                  sx={() => ({
                    '.mantine-Tabs-tabActive': {
                      fontWeight: 'bold',
                    },
                    '.mantine-Tabs-tabControl:not(.mantine-Tabs-tabActive)': {
                      color: '#65768E',
                    },
                  })}
                  styles={() => ({
                    body: {
                      padding: '32px 48px',
                      maxHeight: '60vh',
                      overflow: 'auto',
                      paddingBottom: 100,
                    },
                  })}
                >
                  <Tabs.Tab label='Database'>
                    <RoundedInputBar
                      placeholder={'Search Food'}
                      height={'48px'}
                      leftIcon={<SearchIcon />}
                    />
                    <Grid grow mt='xl' columns={1} sx={{ rowGap: 12 }}>
                      {renderFileTreeItems()}
                    </Grid>
                  </Tabs.Tab>
                  <Tabs.Tab label='Custom Recipe'>
                    Custom Recipe Content
                  </Tabs.Tab>
                  <Tabs.Tab label='Ingredients'>Ingredients Content</Tabs.Tab>
                </Tabs>
              ) : (
                <Stack pl={48} pr={40}>
                  <Anchor onClick={() => setSelectedItem({})}>
                    <Group>
                      <Text
                        mt={-8}
                        styles={() => ({
                          root: { transform: 'rotate(180deg)' },
                        })}
                      >
                        <ChevronRight color='#778CA3' strokeWidth={3} />
                      </Text>
                      <Text color='#445670' order={4} size='xl' weight='bold'>
                        {selectedItem.title}
                      </Text>
                    </Group>
                  </Anchor>
                  <RoundedInputBar
                    placeholder={'Search Food'}
                    height={'48px'}
                    leftIcon={<SearchIcon />}
                  />
                  <ScrollArea sx={{ height: '59vh' }} offsetScrollbars>
                    <Stack mb='10vh'>
                      {renderRecipes()}
                      <CustomDragLayer />
                    </Stack>
                  </ScrollArea>
                </Stack>
              )}
            </Stack>
          </Grid.Col>
          <Grid.Col span={18} sx={{ borderLeft: '1px solid #D1DCE4' }} p={0}>
            <Alert
              sx={{ backgroundColor: '#F1FBDD' }}
              p='xl'
              radius={8}
              icon={<Bulb />}
              mb={40}
              my='xl'
              mx={48}
              styles={() => ({
                icon: {
                  marginTop: -3,
                },
              })}
            >
              <Text size='sm' color='#4F4F4F'>
                Drag your recipes/custome recipes/ingredient from left panel and
                drop to the calendar on ther right
              </Text>
            </Alert>
            <Box mr={50}>
              <Group ml={48} mb={20} position='apart'>
                <Group>
                  <Button
                    disabled={week === 0}
                    variant='outline'
                    onClick={() => weekHandler(-1)}
                    styles={() => ({
                      inner: {
                        transform: 'rotate(180deg)',
                      },
                    })}
                  >
                    <ChevronRight color='#778CA3' strokeWidth={2} />
                  </Button>
                  <Text>Week {week + 1}</Text>
                  <Button
                    disabled={week === 4}
                    variant='outline'
                    onClick={() => weekHandler(1)}
                  >
                    <ChevronRight color='#778CA3' strokeWidth={2} />
                  </Button>
                </Group>
                <Button sx={{ width: '20vh' }}>Save</Button>
              </Group>
              <ScrollArea sx={{ height: '59vh' }}>
                <Stack spacing={0} sx={{ position: 'relative' }}>
                  <Box ml={138} sx={{ position: 'relative' }}>
                    {renderDaysRow(week)}
                  </Box>
                  <MealPlanBoard
                    meals={meals}
                    mealPlans={mealPlans}
                    addRecipeToBoard={addRecipeToBoard}
                  />
                  <Box ml={139} sx={{ position: 'absolute' }}>
                    {renderLabelsColumn()}
                  </Box>
                </Stack>
              </ScrollArea>
            </Box>
          </Grid.Col>
        </Grid>
      </DndProvider>
    </Drawer>
  );
};

Index.propTypes = {
  tags: PropTypes.array.isRequired,
  fileTreeItems: PropTypes.array.isRequired,
  isPreMadeOpen: PropTypes.bool,
  setIsPreMadeOpen: PropTypes.func.isRequired,
  mealPlans: PropTypes.array.isRequired,
  week: PropTypes.number,
  addRecipeToBoard: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
  weekHandler: PropTypes.func.isRequired,
};

Index.defaultProps = {
  isPreMadeOpen: false,
  week: 0, // week 1
};

export default Index;
