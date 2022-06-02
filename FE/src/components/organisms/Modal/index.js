import PropTypes from 'prop-types';
import { Modal } from '@mantine/core';
import ModalHeader from '@/components/molecules/ModalHeader/index';

const Index = ({
  children,
  opened,
  setOpened,
  header,
  compact,
  size,
  padding,
  width,
  height,
}) => {
  return (
    <Modal
      // zIndex={500}
      opened={opened}
      size={size}
      onClose={() => setOpened(false)}
      closeOnClickOutside={false}
      withCloseButton={false}
      title={
        <ModalHeader setOpened={setOpened} compact={compact}>
          {header}
        </ModalHeader>
      }
      trapFocus={false}
      styles={{
        title: { width: '100%', margin: 0 },
        header: { margin: 0 },
        modal: { width: width, height: height },
      }}
      padding={padding}
    >
      {children}
    </Modal>
  );
};

export default Index;

Index.propTypes = {
  opened: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setOpened: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  size: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Index.defaultProps = {
  size: '85%',
};
