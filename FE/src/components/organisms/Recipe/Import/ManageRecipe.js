import { useReipeImportCTX } from '@/contexts/RecipeImportContext';
import ChevronDown from '@/icons/Chevrondown';
import { serving_select_data } from '@/consts/select_choices';
import { styles } from './styles';
import { dummyFoodIcon } from '@/consts/imageUrls';
import {
  Box,
  Space,
  Image,
  Title,
  Group,
  InputWrapper,
  TextInput,
  Select,
  Text,
  Stack,
} from '@mantine/core';

const ManageRecipe = () => {
  const { recipe, setRecipe } = useReipeImportCTX();

  return (
    <Box>
      <Space h={30} />
      <Title order={3}>Manage Recipe</Title>
      <Space h={32} />
      <Box spacing={32} sx={{ height: 146 }}>
        <Group sx={{ justifyContent: 'space-between', marginBottom: 24 }}>
          <Image
            src={recipe.image ?? dummyFoodIcon}
            height={146}
            width={146}
            radius='md'
            alt='Food'
          />
          <Stack
            spacing={26}
            sx={{ height: '100%', justifyContent: 'space-between' }}
          >
            <Group>
              <InputWrapper
                label='Recipe Name'
                sx={{ width: 480 }}
                styles={() => ({
                  label: styles.label,
                })}
              >
                <TextInput
                  defaultValue={recipe.title}
                  variant='filled'
                  styles={() => ({
                    input: styles.input,
                  })}
                  onChange={(e) =>
                    setRecipe({ ...recipe, title: e.target.value })
                  }
                />
              </InputWrapper>
              <Select
                label='Servings'
                data={serving_select_data}
                defaultValue={recipe.serving}
                rightSection={<ChevronDown width={40} height={40} />}
                maxDropdownHeight={400}
                nothingFound='Nobody here'
                sx={{ width: 77 }}
                styles={() => ({
                  label: styles.label,
                  input: {
                    ...styles.disabled,
                    ...styles.input,
                  },
                })}
                onChange={(value) => {
                  setRecipe({ ...recipe, serving: value })
                }}
              />
            </Group>
            <Group width='100%' spacing={24}>
              <Box>
                <Title order={3}>
                  {parseInt(recipe.nutritions?.calories ?? 0)}
                </Title>
                <Text size='sm' color='#757575'>
                  calories per serving
                </Text>
              </Box>
              <Box sx={{ borderLeft: '1px solid #E6E9ED', paddingLeft: 24 }}>
                <Title order={3} sx={{ color: '#D48C29' }}>
                  {recipe.ingrWithNutr?.unmatch?.length ? `${recipe.ingrWithNutr?.unmatch?.length} left` : '100%'}
                </Title>
                <Text size='sm' color='#757575'>
                  {recipe.ingrWithNutr?.unmatch?.length ? 'Unmatch Ingredients' : 'Match Ingredients'}
                </Text>
              </Box>
            </Group>
          </Stack>
        </Group>
        {recipe.url ? (
          <Group sx={styles.foodLink} spacing={12}>
            <Image
              src={`https://logo.clearbit.com/${new URL(recipe.url).hostname}`}
              height={24}
              width={24}
              radius='md'
              alt='Food'
            />
            <Group spacing={4}>
              <Text size='md' color='green-theme'>
                from
              </Text>
              <Text size='md' color='green-theme' sx={{ fontWeight: 'bold' }}>
                {new URL(recipe.url).hostname}
              </Text>
            </Group>
          </Group>
        ) : null}
      </Box>
      <Space h={50} />
    </Box>
  );
};

export default ManageRecipe;
