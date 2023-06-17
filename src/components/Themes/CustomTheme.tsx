import { createTheme } from '@material-ui/core/styles'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#FF6900 ',
    },
  },
  typography: {
    fontFamily: 'system-ui'
  },
  overrides: {
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root fieldset': {
          borderColor: '#FF6900 !important',
        },
        '&:hover .MuiOutlinedInput-root fieldset': {
          borderColor: '#FF6900 !important',
        },
        '& .MuiFormControl-root': {
          borderBottom: '1px solid #FF6900'
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