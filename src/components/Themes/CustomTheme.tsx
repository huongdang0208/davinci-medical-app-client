import { createTheme } from '@material-ui/core/styles'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#603c81 ',
    },
  },
  typography: {
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif'
  },
  overrides: {
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root fieldset': {
          borderColor: '#603c81 !important',
          border: '1px solid #603c81'
        },
        '&:hover .MuiOutlinedInput-root fieldset': {
          borderColor: '#603c81 !important',
          border: '1px solid #603c81'
        },
        '& .MuiFormControl-root': {
          borderBottom: '1px solid #603c81',
          border: '1px solid #603c81'
        },
      },
    },
    MuiTypography: {
      root: {
        fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif'
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