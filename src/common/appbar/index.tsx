import { CssBaseline, GlobalStyles, Link, Toolbar, AppBar, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../api/auth';
import { User } from '../../services/user';
import styles from './styles.module.scss'

type PropsType = object

const TopBar: React.FC<PropsType> = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('id token')
  const [user, setUser] = useState<User>()

  useEffect(() => {
    if (token ) {
      getUser(token, (data, error) => {
        if (data) {
          setUser(data)
        }
        if (error) {
          console.log(error)
        }
      })
      return
    }
    navigate('/dang-nhap')

  }, [token])

  const handleLogout = () => {
    localStorage.removeItem('id token');
  }
  console.log('user', user)
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
              // variant="button"
              color="text.primary"
              href="#"
              className={styles.textLink}
            >
              Sản phẩm
            </Link>
            <Link
              color="text.primary"
              href="#"
              className={styles.textLink}
            >
              Diễn đàn
            </Link>
            <Link
              color="text.primary"
              href="#"
              className={styles.textLink}
            >
              Gói cước
            </Link>
            <Link
              color="text.primary"
              href="#"
              className={styles.textLink}
            >
              Đăng ký Partner
            </Link>
          </nav>
          <div className={styles.btnContainer}>
            <Button className={styles.signUpBtn} onClick={() => navigate('/dang-ki')}>
              Đăng kí
            </Button>
            {user ? (
              <Button className={styles.signInBtn} onClick={() => handleLogout()}>
                Đăng xuất
              </Button>
              ) : (
                <Button className={styles.signInBtn} onClick={() => navigate('/dang-nhap')}>
                  Đăng nhập
                </Button>
              )}
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default TopBar