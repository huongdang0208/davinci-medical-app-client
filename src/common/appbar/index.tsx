import { GlobalStyles, Toolbar, AppBar, Typography, Button, Container, Box, Menu, MenuItem, Tooltip, Avatar, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../api/auth';
import { User } from '../../services/user';
import AdbIcon from '@mui/icons-material/Adb';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './styles.module.scss'

type PropsType = object

const TopBar: React.FC<PropsType> = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('id token')
  const [user, setUser] = useState<User>()
  const pages = ['Sản phẩm', 'Diễn đàn', 'Đăng ký Partner'];
  const settings = [
    {
      title: 'Hồ sơ',
      url: '/profile'
    },
    {
      title: 'Thành viên',
      url: '/member-management'
    },
    {
      title: 'Kiểm tra sức khỏe',
      url: 'check'
    }
  ]

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
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <AppBar position="static" className={styles.appBar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <img src='../../images/' alt="davinci" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DAVINCI
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {user ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={() => navigate(`${setting.url}`)}>{setting.title}</Typography>
                      </MenuItem>
                    ))}
                    <Divider />
                    <Typography textAlign="center" onClick={() => handleLogout()}>Đăng xuất</Typography>
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ flexGrow: 0 }}>
                  <div className={styles.btnContainer}>
                    <Button className={styles.signUpBtn} onClick={() => navigate('/dang-ki')}>
                      Đăng kí
                    </Button>
                    <Button className={styles.signInBtn} onClick={() => navigate('/dang-nhap')}>
                      Đăng nhập
                    </Button>
                  </div>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  )
}

export default TopBar