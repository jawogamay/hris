export const spoiler = {
  control: {
    color: '#006C52',
    fontSize: 16,
    paddingTop: 20,
    fontWeight: 'bold'
  },
  content: {
    position: 'relative',
    '&::after': {
      position: 'absolute',
      content: '""',
      zIndex: 1,
      bottom: 0,
      left: 0,
      pointerEvents: 'none',
      backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255, 1) 80%)',
      width: '100%',
      height: '4em'
    }
  }
}
