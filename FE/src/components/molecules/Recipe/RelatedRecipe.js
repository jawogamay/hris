import { Anchor, Text, Card, Image, Group } from '@mantine/core';
import PropTypes from 'prop-types';
import Dot from '@/icons/Dot';

const RelatedRecipe = ({ image, title, serving, id }) => {
  return (
    <Anchor href={`/recipes/${id}`} underline={false}>
      <Card p={0}>
        <Card.Section>
          <Image
            src={image}
            height={260}
            radius='md'
            alt={title}
          />
        </Card.Section>

        <Group style={{ padding: '15px 0' }}>
          <Text weight='bold'>{title}</Text>
        </Group>

        <Group sx={{ gap: 5 }}>
          <Group sx={{ gap: 5 }}>
            <Text size='xs' weight='bold'>{serving}</Text>
            <Text size='xs' color='#757575'>serving</Text>
            < Dot />
          </Group>
        </Group>
      </Card>
    </Anchor>
  );
};

RelatedRecipe.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default RelatedRecipe;
