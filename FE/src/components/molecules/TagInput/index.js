import PropTypes from 'prop-types';
import { Box, Input, Text } from '@mantine/core';
import CloseCircle from '@/icons/CloseCircle';

const TagInput = ({ tags, setTags }) => {
  const handleSetTags = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' && value) {
      e.preventDefault();
      setTags([...tags, value]);
      e.target.value = null;
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((tag, idx) => idx !== index));
  };

  const Tags = ({ label, index }) => (
    <Box
      p={8}
      mr={8}
      sx={{
        background: '#FFF',
        borderRadius: 6,
        display: 'flex',
      }}
    >
      <Text color='green-theme' weight='bold' sx={{ whiteSpace: 'pre' }}>
        {label}
      </Text>
      <div
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        onClick={() => handleRemoveTag(index)}
      >
        <CloseCircle
          withCircle={false}
          width={25}
          height={25}
          sx={{ cursor: 'pointer' }}
        />
      </div>
    </Box>
  );

  Tags.propTypes = {
    label: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    <Box
      sx={{
        background: '#F3F6F9',
        padding: '10px 16px',
        display: 'flex',
        flexWrap: 'wrap',
        maxHeight: 350,
        overflow: 'auto',
        rowGap: 10,
      }}
    >
      {!!tags &&
        tags.map((tag, key) => <Tags key={key} label={tag} index={key} />)}
      <Input
        size='md'
        variant='unstyled'
        maxLength={40}
        placeholder='Write tag here'
        sx={{ flex: 1, height: '100%' }}
        onKeyDown={handleSetTags}
      />
    </Box>
  );
};

export default TagInput;

TagInput.propTypes = {
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
};
