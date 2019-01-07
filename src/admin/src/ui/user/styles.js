const styles = theme => ({
  loginWelcome: {
    fontSize: '20px',
    color: '#203048',
    lineHeight: '32px',
    fontWeight: 'bold',
  },
  hint: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    color: 'rgba(32, 48, 72, 0.6)',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    background: 'url(/images/bg-login.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  card: {
    width: '385px',
    padding: '3.5em',
    paddingBottom: '24px',
    display: 'flex',
    boxSizing: 'border-box',
    marginTop: 48,
    marginBottom: 50,
    marginRight: 42,
    flexGrow: 1,
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
  // hint: {
  //   marginTop: '1em',
  //   display: 'flex',
  //   justifyContent: 'flex-start',
  //   color: theme.palette.grey[500],
  // },
  form: {
    marginTop: '20px',
    padding: '0 0em 1em 0em',
  },
  input: {
    marginTop: '1em',
  },
  actions: {
    padding: '0 0em 1em 0em',
    display: 'block',
  },
  logo: {
    height: 20,
    width: 70,
    marginRight: 7,
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inputWrapper: {
    marginTop: 0,
  },
  formContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  googleBadge: {
    width: 128,
  },
  appleBadge: {
    width: 117,
    marginRight: 12,
  },
  button: {
    margin: 0,
    boxShadow: 'none',
    textTransform: 'none',
    fontWeight: 'bold',
    color: '#203048',
  },
  download: {
    marginTop: 'auto',
  },
});

export default styles;
