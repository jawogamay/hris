import PropTypes from 'prop-types';

const Index = ({ name, values, trackChoice, setTrackChoice }) => {
  return (
    <>
      {values.map((radio, key) => (
        <div
          key={key}
          style={{ alignItems: 'center', display: 'flex', color: '#1C212D' }}
          className={'brand-radio-wrapper'}
        >
          <input
            id={'radio' + key}
            className={'brand-radio'}
            type='radio'
            value={radio.value}
            name={name}
            required
            checked={key === trackChoice}
            onChange={() => setTrackChoice(key)}
          />
          <label htmlFor={'radio' + key}>{radio.text}</label>
        </div>
      ))}
    </>
  );
};

export default Index;

Index.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  trackChoice: PropTypes.number.isRequired,
  setTrackChoice: PropTypes.func.isRequired,
};
