import { Box, Space, BackgroundImage, Text, Overlay } from '@mantine/core';
import HeaderLogo from '@/components/organisms/HeaderLogo';

const Index = () => {
  return (
    <BackgroundImage
      style={{ height: '100vh' }}
      src='https://images.unsplash.com/photo-1603792451785-e2c78de442a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
      alt='Panda'
    >
      <Box
        style={{
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          style={{
            zIndex: '10',
            marginLeft: '16px',
            marginTop: '16px',
          }}
        >
          <HeaderLogo mfpColor='white' logoColor='white' />
        </Box>
        <Box
          style={{
            zIndex: '10',
            marginLeft: '38px',
            marginBottom: '32px',
            marginRight: '98px',
          }}
        >
          <Text style={{ fontSize: '24px', color: 'white', zIndex: '5' }}>
            “Duis vel ac facilisi sagittis massa non. In neque tristique donec
            viverra. Eget et vulputate.”
          </Text>
          <Space h={32} />
          <Text style={{ color: 'white' }}>Adam Suseno</Text>
          <Space h={4} />
          <Text style={{ color: 'white', fontSize: 12 }}>
            Professional Trainer & Fitness
          </Text>
        </Box>
        <Overlay
          zIndex={1}
          gradient={`linear-gradient(180deg, rgba(0, 0, 0, 0.2) 9.33%, rgba(0, 0, 0, 0) 49.32%, rgba(0, 0, 0, 0.2) 71.51%)`}
        />
      </Box>
    </BackgroundImage>
  );
};

export default Index;
