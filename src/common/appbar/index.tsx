import { CssBaseline, GlobalStyles, Link, Toolbar, AppBar, Typography, Button } from '@mui/material'
import React from 'react'
import styles from './styles.module.scss'

type PropsType = object

const TopBar: React.FC<PropsType> = () => {
  const styledText = {
    // '&:hover': { border: 'none' },
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    color: '#BCBCBC',
    // '&.'selectedlink {
    //   background: 'linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%)',
    //   -webkit-background-clip: text;
    //   -webkit-text-fill-color: transparent;
    //   border-bottom: 1.5px solid #9B51E0;
    // }
    '&:not(:last-child)': {
      marginRight: '32px',
    }
  }

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        className={styles.appBar}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }} className={styles.navbar}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} className={styles.navLogo}>
            Davinci
          </Typography>
          <nav className={styles.navLinkWrap}>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={styledText}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={styledText}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={styledText}
            >
              Support
            </Link>
          </nav>
          <div>
            <Button className={styles.button}>
              <a href="/dang-nhap">
                Login
              </a>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default TopBar