export const styles = {
  label: {
    fontSize: 16,
    color: '#1C212D',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    height: 40,
    border: '1px solid #E5ECF2',
  },
  foodLink: {
    width: '100%',
    background: '#F3F6F9',
    border: '1px solid #E5ECF2',
    height: 40,
    borderRadius: 3,
    padding: '0 12px',
  },
  disabled: {
    color: '#1C212D !important',
    fontWeight: 'bold',
    background: '#F3F6F9 !important',
    border: '1px solid #E5ECF2 !important',
    opacity: '1 !important',
  },
  direction: {
    container: {
      background: '#F3F6F9',
      padding: 16,
      fontFamily: 'Mark Pro, sans-serif',
    },
    textarea: {
      '&:focus': {
        borderColor: '#E5ECF2',
      },
      hasSteps: {
        border: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
    },
  },
};
