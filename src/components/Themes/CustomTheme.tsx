import { createTheme } from '@material-ui/core/styles'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#603c81',
    },
  },
  typography: {
    fontFamily: 'Segoe UI, Roboto, Ubuntu'
  },
  overrides: {
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root fieldset': {
          borderColor: '#603c81 !important',
        },
        '&:hover .MuiOutlinedInput-root fieldset': {
          borderColor: '#603c81 !important',
        },
        '& .MuiFormControl-root': {
          borderBottom: '1px solid #603c81'
        },
      },
    },
    MuiTypography: {
      root: {
        
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: '#ffff',
      }
    }
  },
})

export default customTheme