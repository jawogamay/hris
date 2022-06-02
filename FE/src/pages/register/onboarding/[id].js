import { useState } from 'react';
import { useRouter } from 'next/router';
import Meta from '@/layout/Meta';
import ChevronDown from '@/icons/Chevrondown';
import Main from '@/templates/Main';
import WelcomeCard from '@/components/WelcomeCard';
import Onboarding from '@/components/Onboarding';
import Cookies from 'js-cookie';
import { data } from '@/consts/data';
import { useForm } from '@mantine/form';
import Register from '@/components/Onboarding/components/register';
import Username from '@/components/Onboarding/components/username';
import style from '@/components/Onboarding/styles/Onboarding.module.css';
import Modal from '@/components/organisms/Modal';
import RoundedInputBar from '@/components/molecules/RoundedInputBar';
import SearchIcon from '@/icons/SearchIcon';
import { tier_data } from '@/consts/tier_data';
import Card from '@/components/molecules/Card';
import {
  ScrollArea,
  Space,
  Tabs,
  Grid,
  Text,
  Progress,
  Center,
  Box,
  Button,
  UnstyledButton,
  Affix,
  Group,
  Select,
  NumberInput,
} from '@mantine/core';

const Index = () => {
  const [opened, setOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [questionnaire, setQuestionnaire] = useState(data);;

  const router = useRouter();
  let { id, mfpHelp } = router.query;

  const onChange = (active) => {
    setActiveTab(active);
    setSearchTerm('');
  };
  const formData = useForm({
    initialValues: {
      mfpHelp: null,
      weightGoalLevel: '',
      activityLevel: null,
      age: undefined,
      gender: 0,
      height: null,
      currentWeight: null,
      heightUnit: 'cm',
      goalWeightUnit: 'kg',
      currentWeightUnit: 'kg',
      goalWeight: null,
      nineToTenMode: null,
      userId: 0,
    },
    validate: {
      mfpHelp: (value) => (value === null ? 'MFP Help is required' : null),
      weightGoalLevel: (value) =>
        value.length === 0 ? 'Weight Goal is required' : null,
      activityLevel: (value) =>
        value === null ? 'Activity Level is required' : null,
      age: (value) =>
        [undefined, null].includes(value) ? 'Age is required' : null,
      gender: (value) => (value === 0 ? 'Gender is required' : null),
      height: (value) =>
        value === null
          ? 'Height is required'
          : isNaN(value)
            ? 'Height be numeric'
            : null,
      currentWeight: (value) =>
        value === null
          ? 'Current Weight is required'
          : isNaN(value)
            ? 'Current weight be numeric'
            : null,
      goalWeight: (value) =>
        value === null
          ? 'Goal Weight is required'
          : isNaN(value)
            ? 'Goal weight be numeric'
            : null,
      nineToTenMode: (value) =>
        value === null ? '90/10 Mode is required' : null,
    },
    initialErrors: {
      mfpHelp: '',
      weightGoalLevel: '',
      activityLevel: '',
      age: '',
      gender: '',
      height: '',
      currentWeight: '',
      goalWeight: '',
      nineToTenMode: '',
    },
  });

  const handleBack = () => {
    if (id == 1) {
      router.push('/register/welcome');
    } else {
      if (mfpHelp == 'true') {
        router.push(`/register/onboarding/${parseInt(id) - 1}?mfpHelp=true`);
      } else {
        router.push(`/register/onboarding/${parseInt(id) - 1}?mfpHelp=false`);
      }
    }
  };

  const handleChoice = (name, value) => {
    formData.setFieldValue(name, value);
  };

  const handleValidation = () => {
    id == 1 && formData.validateField('mfpHelp');
    if (formData.values.mfpHelp || mfpHelp == 'true') {
      id == 2 && formData.validateField('weightGoalLevel');
      id == 3 && formData.validateField('activityLevel');
      id == 6 && formData.validateField('nineToTenMode');
      if (id == 4) {
        formData.validateField('age');
        formData.validateField('gender');
      }
      if (id == 5) {
        formData.validateField('height');
        formData.validateField('currentWeight');
        formData.validateField('goalWeight');
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidation();
    //Simple Logic Ternary
    !formData.errors.hasOwnProperty('mfpHelp') &&
      id == 1 &&
      router.push(`/register/onboarding/2?mfpHelp=${formData.values.mfpHelp}`);;
    if (mfpHelp == 'true' || mfpHelp == 'null') {
      !formData.errors.hasOwnProperty('weightGoalLevel') &&
        id == 2 &&
        router.push(`/register/onboarding/3?mfpHelp=true`);;
      !formData.errors.hasOwnProperty('activityLevel') &&
        id == 3 &&
        router.push(`/register/onboarding/4?mfpHelp=true`);;

      //Complex Logic
      if (
        !formData.errors.hasOwnProperty('age') &&
        !formData.errors.hasOwnProperty('gender') &&
        id == 4
      ) {
        router.push(`/register/onboarding/5?mfpHelp=true`);
      }
      if (
        !formData.errors.hasOwnProperty('height') &&
        !formData.errors.hasOwnProperty('currentWeight') &&
        !formData.errors.hasOwnProperty('goalWeight') &&
        id == 5
      ) {
        router.push(`/register/onboarding/6?mfpHelp=true`);
      }
      if (!formData.errors.hasOwnProperty('nineToTenMode') && id == 6) {
        Cookies.set('onboarding', JSON.stringify(formData.values));
        router.push(`/register/onboarding/7`);
      }
    } else {
      !formData.errors.hasOwnProperty('mfpHelp') &&
        id == 1 &&
        router.push(
          `/register/onboarding/2?mfpHelp=${formData.values.mfpHelp}`
        );;
      if (id != 1 && id != 6) {
        router.push(`/register/onboarding/${parseInt(id) + 1}?mfpHelp=false`);
      }
      if (id == 6) {
        Cookies.set('onboarding', JSON.stringify(formData.values));
        router.push(`/register/onboarding/7`);
      }
    }
  };

  const handleChange = (e) => setSearchTerm(e.target.value);

  const TierCard = ({ children, title }) => {
    return (
      <>
        <Card
          sx={{
            marginBottom: '32px',
            boxShadow: '0px 5px 10px #EEF1F4',
          }}
        >
          <Text sx={{ fontWeight: 700, fontSize: 16 }}>{title}</Text>
          <Space h={12} />
          <Text
            sx={{ fontWeight: 500, fontSize: 16, color: '#6B6D86' }}
            dangerouslySetInnerHTML={{ __html: children }}
          ></Text>
        </Card>
      </>
    );
  };

  const TierList = ({ tier_content }) => {
    return (
      <>
        {tier_content
          .filter((item) => {
            return (
              item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );;
          })
          .map((item, key) => (
            <>
              <TierCard title={item.title} key={key} index={key}>
                {item.description}
              </TierCard>
              <Space h={32} />
            </>
          ))}
      </>
    );;
  };

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <Grid sx={{ margin: 0, height: '100vh' }}>
        <Grid.Col span={4} style={{ padding: 0, margin: 0 }}>
          <WelcomeCard />
        </Grid.Col>
        <Grid.Col span={8} sx={{ margin: 0, padding: 0 }}>
          <Progress
            value={12.5 * id}
            radius={0}
            size={'lg'}
            color={'#B0DC90'}
          />
          <ScrollArea style={{ height: 850 }}>
            <Center style={{ paddingTop: 95 }}>
              <Box style={{ width: '478px', position: 'relative' }}>
                <Text
                  size='md'
                  style={{
                    color: '#7A8394',
                    fontWeight: '700',
                    paddingBottom: 5,
                  }}
                >
                  STEP {id} OF 8
                </Text>
                {questionnaire.map((question, index) => {
                  return (
                    question.id == id && (
                      <Onboarding
                        key={index}
                        details={question}
                        setOpened={setOpened}
                      >
                        <Text mt={30} color='red' weight={600}>
                          {mfpHelp == 'true' && formData.errors[question.key]}
                        </Text>
                        <Text mt={30} color='red' weight={600}>
                          {id == 1 && formData.errors['mfpHelp']}
                        </Text>
                        {question.type === 'choices' &&
                          question.choices.map((choice, index) => {
                            return !choice.longChoicesText ? (
                              <Button
                                fullWidth
                                key={index}
                                variant='default'
                                size={'xl'}
                                style={{
                                  justifyContent:
                                    choice.longChoicesText == 0
                                      ? 'start'
                                      : 'center',
                                }}
                                mt={24}
                                className={
                                  formData.values &&
                                  formData.values[choice.name] ==
                                  choice.value &&
                                  style.selected
                                }
                                value={formData.values[choice.name]}
                                sx={() => ({
                                  fontWeight: 400,
                                })}
                                onClick={() =>
                                  handleChoice(choice.name, choice.value)
                                }
                              >
                                <Text size={'lg'} align='center'>
                                  {choice.item}
                                </Text>
                              </Button>
                            ) : (
                              <UnstyledButton
                                key={index}
                                style={{
                                  width: '100%',
                                  minHeight: '60px',
                                  padding: '12px 25px',
                                  borderRadius: '4px',
                                }}
                                className={
                                  formData.values &&
                                  formData.values[choice.name] ==
                                  choice.value &&
                                  style.selected
                                }
                                sx={() => ({
                                  border: '1px solid #ced4da',
                                })}
                                mt={24}
                                onClick={() =>
                                  handleChoice(choice.name, choice.value)
                                }
                              >
                                <Text size='lg' align='left' fontWeight={700}>
                                  {choice.item}
                                </Text>
                                <Text size='md' align='left' color='#7A8394'>
                                  {choice.description}
                                </Text>
                              </UnstyledButton>
                            );
                          })}
                        {question.type === 'input' && (
                          <div style={{ display: 'inline-flex' }}>
                            <Group
                              mt={24}
                              direction='row'
                              style={{ display: 'inline-flex' }}
                            >
                              {question.fields.map((field, index) => {
                                return field.type == 'number' ? (
                                  <NumberInput
                                    size='lg'
                                    style={{ width: '150px' }}
                                    styles={{
                                      error: { fontSize: '12px' },
                                    }}
                                    key={index}
                                    placeholder={field.placeholder}
                                    pb={!formData.errors[field.name] ? 48 : 24}
                                    {...formData.getInputProps(field.name)}
                                    hideControls
                                  />
                                ) : (
                                  <Select
                                    label={field.label}
                                    size='lg'
                                    style={{ width: '250px' }}
                                    styles={{
                                      error: { fontSize: '12px' },
                                    }}
                                    placeholder={field.placeholder}
                                    data={field.options}
                                    pb={!formData.errors[field.name] ? 48 : 24}
                                    {...formData.getInputProps(field.name)}
                                  />
                                );;
                              })}
                            </Group>
                          </div>
                        )}
                        {question.type == 'select' &&
                          question.fields.map((field, index) => {
                            return (
                              <Group
                                mt={32}
                                key={index}
                                direction='column'
                                style={{ gap: 0 }}
                              >
                                <Text size='lg' weight={700}>
                                  {field.label}
                                </Text>
                                <Text size='md' color='#7A8394' mb={16}>
                                  {field.subLabel}
                                </Text>
                                <NumberInput
                                  size='lg'
                                  rightSectionWidth={70}
                                  placeholder={field.placeholder}
                                  {...formData.getInputProps(field.name)}
                                  styles={{
                                    error: { fontSize: '12px' },
                                  }}
                                  style={{ width: '300px' }}
                                  hideControls
                                  rightSection={
                                    <Select
                                      style={{
                                        borderLeft: '1px solid #CBD0E3',
                                      }}
                                      styles={{
                                        rightSection: { pointerEvents: 'none' },
                                      }}
                                      pl={5}
                                      my={10}
                                      className='dadada'
                                      placeholder={field.selectPlaceholder}
                                      variant='unstyled'
                                      rightSection={<ChevronDown size={14} />}
                                      size='md'
                                      data={field.options && field.options}
                                      {...formData.getInputProps(
                                        field.optionName
                                      )}
                                    />
                                  }
                                />
                              </Group>
                            );
                          })}
                      </Onboarding>
                    )
                  )
                })}
                {id == 7 && <Register />}
                {id == 8 && <Username />}
                {id != 8 && id != 7 && (
                  <Affix position={{ right: 20, bottom: 20 }}>
                    <Group>
                      <UnstyledButton
                        onClick={handleBack}
                        style={{ fontSize: '16px' }}
                      >
                        Back
                      </UnstyledButton>
                      <Button
                        ml={24}
                        color='#006C52'
                        size='lg'
                        style={{ width: '175px' }}
                        type={id == 6 ? 'submit' : 'button'}
                        onClick={handleSubmit}
                      >
                        Next
                      </Button>
                    </Group>
                  </Affix>
                )}
              </Box>
            </Center>
          </ScrollArea>
        </Grid.Col>
      </Grid>
      <Modal
        opened={opened}
        setOpened={setOpened}
        header={'What is tier?'}
        compact={true}
        overflow={'inside'}
        padding={'40px 58px'}
      >
        <Text sx={{ color: '#6B6D86' }}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </Text>
        <Space h={32} />
        <Tabs
          tabPadding={'xl'}
          active={activeTab}
          onTabChange={onChange}
          sx={(theme) => ({
            '.mantine-Tabs-tabActive': {
              fontWeight: 700,
            },
            '.mantine-Tabs-tabControl:not(.mantine-Tabs-tabActive)': {
              color: '#9AA5B6',
              borderColor: '#D1DCE4',
            },
            '.mantine-Tabs-tabsListWrapper': {
              borderColor: '#D1DCE4',
            },
          })}
        >
          <Tabs.Tab
            tabKey={'green'}
            label='GREEN TIER'
            color='green'
            icon={
              <Box
                sx={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'green',
                  borderRadius: '12px',
                }}
              ></Box>
            }
          >
            <RoundedInputBar
              onChange={handleChange}
              placeholder={'Search Food'}
              width={'400px'}
              height={'48px'}
              leftIcon={<SearchIcon />}
            />
            <Space h={32} />
            <ScrollArea
              styles={() => ({ viewport: { padding: '0px 16px' } })}
              style={{ height: '45vh' }}
              type='always'
            >
              <TierList tier_content={tier_data.green_tier} />
            </ScrollArea>
          </Tabs.Tab>
          <Tabs.Tab
            tabKey={'yellow'}
            label='YELLOW TIER'
            color='yellow'
            icon={
              <Box
                sx={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'yellow',
                  borderRadius: '12px',
                }}
              ></Box>
            }
          >
            <RoundedInputBar
              onChange={handleChange}
              placeholder={'Search Food'}
              width={'400px'}
              height={'48px'}
              leftIcon={<SearchIcon />}
            />
            <Space h={32} />
            <ScrollArea
              styles={() => ({ viewport: { padding: '0px 16px' } })}
              style={{ height: '45vh' }}
              type='always'
            >
              <TierList tier_content={tier_data.yellow_tier} />
            </ScrollArea>
          </Tabs.Tab>
          <Tabs.Tab
            tabKey={'red'}
            label='RED TIER'
            color='red'
            icon={
              <Box
                sx={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'red',
                  borderRadius: '12px',
                }}
              ></Box>
            }
          >
            <RoundedInputBar
              onChange={handleChange}
              placeholder={'Search Food'}
              width={'400px'}
              height={'48px'}
              leftIcon={<SearchIcon />}
            />
            <Space h={32} />
            <ScrollArea
              styles={() => ({ viewport: { padding: '0px 16px' } })}
              style={{ height: '45vh' }}
              type='always'
            >
              <TierList tier_content={tier_data.red_tier} />
            </ScrollArea>
          </Tabs.Tab>
        </Tabs>
      </Modal>
    </Main>
  );
};

export default Index;
