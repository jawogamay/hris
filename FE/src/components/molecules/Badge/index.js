import PropTypes from 'prop-types';
import CloseCircle from '@/icons/CloseCircle';

const Index = ({ filter, label, remove }) => {
  return (
    <div
      style={{
        padding: '6px 8px',
        borderRadius: 16,
        fontSize: 12,
        fontWeight: 400,
        border: '1px solid #E4EAF3',
        display: 'flex',
        width: 'fit-content',
        marginRight: 8,
        alignItems: 'center',
      }}
    >
      {label}
      <div
        onClick={() => remove(filter)}
        style={{
          cursor: 'pointer',
          marginLeft: 6,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CloseCircle />
      </div>
    </div>
  );
};

export default Index;

Index.propTypes = {
  label: PropTypes.string.isRequired,
  remove: PropTypes.func,
};

Index.defaultProps = {
  label: null,
  remove: () => null,
};
