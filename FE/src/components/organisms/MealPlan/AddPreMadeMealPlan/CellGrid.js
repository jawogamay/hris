import { Box } from '@mantine/core';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const Index = ({
  children,
  yIndex,
  xIndex,
  isRow,
  isDaysRow,
  isBoard,
  addRecipeToBoard,
}) => {
  let styles = {
    height: '20vh',
    width: '100%',
    border: '1px solid #E1E7F1',
    position: 'relative',
    borderLeft: 0,
  };

  if (yIndex !== 0) {
    styles = { ...styles, borderLeft: 0 };
  }

  if (isDaysRow && ![0, 6, 12, 18, 24].includes(yIndex)) {
    styles = { ...styles, borderLeftColor: 'transparent' };
  } else {
    styles = { ...styles, borderLeftColor: '#E1E7F1' };
  }

  if (isBoard) {
    if (![...Array(6).keys()].includes(xIndex)) {
      styles = { ...styles, borderTop: 0 };
    }

    if (yIndex < 4) {
      styles = { ...styles, borderBottom: 0 };
    }
  }

  if (!isRow && yIndex !== 4) {
    styles = { ...styles, borderBottom: 0 };
  }

  if (isDaysRow) {
    styles = { ...styles, borderBottom: 0 };
    if (!xIndex) {
      styles = { ...styles, borderLeft: '1px solid #E1E7F1' };
    }
  }

  const [{ isOver, target }, drop] = useDrop(() => ({
    accept: 'div',
    drop: (item) => addRecipeToBoard({ item, target }),
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      target: { xIndex, yIndex },
    }),
  }));

  const onHoverStyles = {
    height: '100%',
    background: isOver ? '#F1FBDD !important' : '#fff',
    border: isOver && '1px solid #B2DD91 !important',
    borderLeftStyle: isOver && 'solid',
  };

  return (
    <Box style={styles}>
      <Box
        ref={isBoard ? drop : null}
        sx={onHoverStyles}
        ml={isOver && xIndex > 0 ? -1 : 1}
        py={12}
        px={5}
      >
        {children}
      </Box>
    </Box>
  );
};

Index.propTypes = {
  children: PropTypes.node.isRequired,
  yIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  xIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isRow: PropTypes.bool,
  isDaysRow: PropTypes.bool,
  isBoard: PropTypes.bool,
  addRecipeToBoard: PropTypes.func.isRequired,
};

Index.defaultProps = {
  isRow: true,
  isDaysRow: false,
  isBoard: false,
};

export default Index;
