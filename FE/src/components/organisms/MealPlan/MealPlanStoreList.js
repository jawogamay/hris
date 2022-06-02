import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import useApi from '@/hooks/useApi';
import Funnel from '@/icons/Funnel';
import Drawer from '@/components/organisms/Drawer';
import Search from '@/icons/Search';
import Badge from '@/components/molecules/Badge';
import MealPlanListItem from '@/components/organisms/MealPlan/MealPlanListItem';
import { Box, Center, Text, Grid, Input, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';

const Index = () => {
  const router = useRouter();
  const { query } = router;
  const {
    isFree,
    isPremium,
    price_min,
    price_max,
    total_recipe_min,
    total_recipe_max,
    total_days_min,
    total_days_max,
    keyword,
    sort,
  } = query;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filters, setFilters] = useState([]);

  const [data, fetching] = useApi(
    {
      method: 'GET',
      url: '/store',
      params: query,
    },
    query
  );

  const form = useForm({
    initialValues: {
      isFree: isFree || false,
      isPremium: isPremium || false,
      price_min: price_min || '',
      price_max: price_max || '',
      total_recipe_min: total_recipe_min || '',
      total_recipe_max: total_recipe_max || '',
      total_days_min: total_days_min || '',
      total_days_max: total_days_max || '',
    },
  });

  const deleteFilter = (filter) => {
    switch (filter) {
      case 'isFree':
        delete query.isFree;
        break;
      case 'isPremium':
        delete query.isPremium;
        break;
      case 'price':
        delete query.price_min;
        delete query.price_max;
        break;
      case 'recipe':
        delete query.total_recipe_min;
        delete query.total_recipe_max;
        break;
      case 'days':
        delete query.total_days_min;
        delete query.total_days_max;
        break;

      default:
        break;
    }

    router.push({
      pathname: router.pathname,
      query: router.query,
    });
    form.setValues(query);
  };

  const addFilterToRoute = (key, value) => {
    if (!value) {
      return;
    }
    query[key] = value;
  };

  const handleResetFilter = () => {
    form.setValues({
      isFree: false,
      isPremium: false,
      price_min: '',
      price_max: '',
      total_recipe_min: '',
      total_recipe_max: '',
      total_days_min: '',
      total_days_max: '',
    });
    router.replace('/meal-plan-store');
    setOpenDrawer(false);
  };

  const handleFilter = (values) => {
    Object.entries(values).forEach(([key, value]) => {
      addFilterToRoute(key, value);
    });
    router.push(router);
    setOpenDrawer(false);
  };

  const handleKeywordChange = (e) => {
    const keyword = e.target.value;
    router.query.keyword = keyword;
    router.push(router);
  };

  const handleSort = (e) => {
    const sort = e.target.value;
    router.query.sort = sort;
    router.push(router);
  };

  useEffect(() => {
    const filters = [];
    if (isFree) {
      filters.push({
        isFree: 'Free',
      });
    }
    if (isPremium) {
      filters.push({
        isPremium: 'Premium',
      });
    }
    if (price_min || price_max) {
      const min = price_min || 0;
      const max = price_max || '';
      filters.push({
        price: `$${min} - $${max}`,
      });
    }
    if (total_recipe_min || total_recipe_max) {
      const min = total_recipe_min || 0;
      const max = total_recipe_max || '';
      filters.push({
        recipe: `${min} - ${max} recipes`,
      });
    }
    if (total_days_min || total_days_max) {
      const min = total_days_min || 0;
      const max = total_days_max || '';
      filters.push({
        days: `${min} - ${max} total days`,
      });
    }
    setFilters(filters);
  }, [query]);

  return (
    <Box>
      <Drawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        form={form}
        handleForm={handleFilter}
        handleResetFilter={handleResetFilter}
      />

      <Center py={26} sx={{ justifyContent: 'space-between' }}>
        <Input
          icon={<Search />}
          placeholder='Search recipe'
          radius='xl'
          sx={{ minWidth: 330, input: { fontSize: 16 } }}
          size='lg'
          defaultValue={keyword || ''}
          onChange={debounce(handleKeywordChange, 300)}
        />
        <Center>
          <Text color='#0B2C2A' size='md' mr='xs'>
            Sort by:
          </Text>
          {router.isReady && (
            <select
              defaultValue={sort || ''}
              onChange={handleSort}
              style={{
                border: 'none',
                minWidth: 70,
                outline: 'none',
                cursor: 'pointer',
                lineHeight: 1.2,
                fontSize: 16,
              }}
            >
              <option value=''>All</option>
              <option value='created_at'>Created</option>
              <option value='price'>Price</option>
              <option value='title'>Title</option>
            </select>
          )}
          <Box
            onClick={() => setOpenDrawer(true)}
            sx={{
              background: '#EFF2F4',
              padding: '13px 15px',
              borderRadius: '8px',
              marginLeft: '30px',
              cursor: 'pointer',
            }}
          >
            <Funnel />
          </Box>
        </Center>
      </Center>

      {filters.length ? (
        <Box
          mb={30}
          sx={{
            display: 'flex',
          }}
        >
          {filters?.map((filter) =>
            Object.entries(filter)?.map(([key, value]) => (
              <Badge
                key={key}
                filter={key}
                label={value}
                remove={deleteFilter}
              />
            ))
          )}
          <Text
            color='green-theme'
            weight='bold'
            ml={12}
            sx={{ alignSelf: 'center', cursor: 'pointer' }}
            onClick={handleResetFilter}
          >
            Reset all
          </Text>
        </Box>
      ) : null}

      {fetching ? (
        <Center style={{ height: '50vh', width: '100%' }}>
          <Loader />
        </Center>
      ) : (
        <Grid>
          {data.map((recipe) => (
            <Grid.Col key={recipe.id} span={3}>
              <MealPlanListItem {...recipe} isStore={true} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Index;
