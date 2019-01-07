import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      icon: {
        top: 'calc(50% - 10px)',
        right: '4px',
      },
    },
    Datagrid: {
      root: {
        borderRadius: 0,
      },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: 0,
      },
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: '#fff',
        color: 'rgba(32, 48, 72, 0.8)',
        lineHeight: '24px',
        fontSize: '16px',
        boxShadow:
          '0px 7px 8px rgba(0, 0, 0, 0.2), 0px 5px 22px rgba(0, 0, 0, 0.12), 0px 12px 17px rgba(0, 0, 0, 0.14)',
      },
    },
    MuiSwitch: {
      bar: {
        border: 'solid 1px rgba(32, 48, 72, 0.1)',
        height: '12px',
      },
      icon: {
        backgroundColor: '#203048',
        width: '16px',
        height: '16px',
        boxShadow:
          '0px 1px 4px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.07), 0px 0px 1px rgba(0, 0, 0, 0.04)',
        border: '2px solid #203048',
      },
      iconChecked: {
        backgroundColor: '#FFBB00',
        boxShadow:
          '0px 1px 4px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.07), 0px 0px 1px rgba(0, 0, 0, 0.04)',
        border: '2px solid #203048',
      },
    },
    MuiDrawer: {
      docked: {
        background: '#fff',
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '9px 14px',
      },
      root: {
        backgroundColor: '#FBFBFB',
        borderRadius: '2px',
      },
    },
    MuiButton: {
      root: {
        padding: '10px 16px',
        margin: '0px 4px',
        minHeight: '32px',
        textTransform: 'none',
        borderRadius: 2,
        border: '1px solid #D2D6DA',
        boxShadow: 'none!important',
        color: '#203048',
      },
      label: {
        color: 'inherit',
      },
      disabled: {
        backgroundColor: '#D2D6DA!important',
        color: 'rgba(32, 48, 72, 0.4)!important',
        border: '1px solid #D2D6DA!important',
      },
      contained: {
        backgroundColor: '#fff!important',
      },

      containedPrimary: {
        backgroundColor: '#FFBB00!important',
        border: '1px solid #FFBB00',
      },
      sizeSmall: {
        fontWeight: 500,
      },
    },
    MuiInputBase: {
      input: {
        color: 'rgba(17, 17, 17, 0.6)',
      },
      root: {
        fontSize: 14,
        fontWeight: 400,
      },
      inputType: {
        height: 'none',
      },
    },
    MuiNotchedOutline: {
      root: {
        borderRadius: '2px',
        border: 'solid 1px rgba(0, 0, 0, 0.23)',
      },
      focused: {
        borderWidth: 1,
      },
      error: {
        borderColor: '#E0344B!important',
      },
    },
    MuiTableCell: {
      body: {
        color: '#203048',
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: 14,
        borderRadius: 2,
        marginLeft: 8,
        marginRight: 8,
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: 18,
      },
    },
  },
  palette: {
    primary: {
      main: '#FFBB00',
      dark: '#E7CE00',
      light: '#FFEC4E',
      contrastText: '#111111',
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#111111',
    },
    text: {
      primary: 'rgba(17, 17, 17, 0.6)',
    },
  },
  typography: {
    fontFamily: '"IBM Plex Sans", sans-serif',
  },
});

export default theme;
