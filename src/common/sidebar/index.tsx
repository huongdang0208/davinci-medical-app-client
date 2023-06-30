import React, { useRef } from 'react'
import { Avatar, Badge, Box, Button, Chip, Divider, Drawer, IconButton, InputBase, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { User } from '../../services/user'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import Person from '@mui/icons-material/Person';
import Forum from '@mui/icons-material/Forum';
import Analytics from '@mui/icons-material/Analytics';
import BorderColor from '@mui/icons-material/BorderColor';
import Search from '@mui/icons-material/Search';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  user: User | undefined,
  openDrawer: boolean,
  setOpenDrawer: (data: boolean) => void
}

const Sidebar: React.FC<PropsType> = ( { user, openDrawer, setOpenDrawer }) => {
  const refFocus = useRef();
  const navigate = useNavigate();
  const theme = useTheme();
  const drawerWidthOpen = 240;
  const paddingIconButton = 10;
  const marginIconButton = 14;
  const iconFontSize = 20;
  const drawerWidthClose =
  (paddingIconButton + marginIconButton) * 2 + iconFontSize;
  const navbarListCommon = [
    {
      icon: Search,
      desc: 'Tìm kiếm',
      secondDesc: '',
      badge: 0,
      subList: [],
      url: '/search'
    },
    {
      icon: DashboardOutlined,
      desc: 'Trang chủ',
      secondDesc: '',
      badge: 0,
      subList: [],
      url: '/'
    },
    {
      icon: Person,
      desc: 'Đăng nhập',
      secondDesc: '',
      badge: 0,
      subList: [],
      url: '/dang-nhap'
    },
    {
      icon: LockOpenIcon,
      desc: 'Đăng kí',
      secondDesc: '',
      badge: 0,
      subList: [],
      url: '/dang-ki'
    }
  ]
  const navbarListUser = [
    {
      icon: Search,
      desc: 'Tìm kiếm',
      secondDesc: '',
      badge: 0,
      subList: [],
      url: '/search'
    },
    {
      icon: DashboardOutlined,
      desc: 'Trang chủ',
      secondDesc: '',
      badge: 0,
      subList: [],
      url: '/'
    },
    {
      icon: Person,
      desc: 'Người dùng',
      secondDesc: '',
      badge: 0,
      subList: [],
      url: '/profile'
    },
    {
      icon: Forum,
      desc: 'Cộng đồng',
      secondDesc: 'Message from andi',
      badge: 2,
      subList: [
        {
          desc: 'chat',
          badge: 2,
        },
        {
          desc: 'reminder',
          badge: 0,
        },
      ],
      url: '/forum'
    },
    {
      icon: Analytics,
      desc: 'Phân tích',
      secondDesc: '',
      badge: 0,
      subList: [],
      url: '/analyze'
    },
    {
      icon: ReceiptLongIcon,
      desc: 'Lịch sử',
      secondDecs: '',
      badge: 0,
      subList: [],
      url: '/check' 
    },
    {
      icon: BorderColor,
      desc: 'Quản lí thành viên',
      secondDesc: '',
      badge: 0,
      subList: [],
      url: '/member-management'
    },
  ];
  const drawerContent = (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '42px',
            width: 'auto',
            backgroundColor: 'transparent',
            margin: '14px 14px',
            padding: '12px 0px',
            borderBottom: '1px solid lightgray',
            alignItems: 'flex-end',
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              display: !openDrawer ? 'none' : { xs: 'none', sm: 'initial' },
              marginBottom: '9px',
            }}
          >
            {/* <Logo /> */}
          </Box>
          <Typography
            variant="h1"
            noWrap={true}
            gutterBottom
            sx={{
              display: { xs: 'none', sm: 'initial' },
              fontSize: '18px',
              fontWeight: 600,
              color: 'lightgray',
              width: '154px',
              marginLeft: !openDrawer ? '0px' : '8px',
              paddingBottom: '3px',
            }}
          >
            Davinci
          </Typography>

          <Button
            onClick={() => setOpenDrawer(!openDrawer)}
            sx={{
              minWidth: 'initial',
              padding: '10px',
              color: 'gray',
              borderRadius: '8px',
              backgroundColor: !openDrawer ? 'transparent' : 'transparent',
              '&:hover': {
                backgroundColor: '#26284687',
              },
            }}
          >
            <MenuIcon
              sx={{ fontSize: '20px', color: !openDrawer ? 'lightgray' : 'lightGray' }}
            ></MenuIcon>
          </Button>
        </Box>
        { user ? (
          <List dense={true}>
            {navbarListUser.map((key, index) => (
              <>
                {index === 0 ? (
                  <>
                    <Tooltip
                      key={index}
                      title={!openDrawer ? key.desc : ''}
                      onClick={() => navigate(`${key.url}`)}
                      placement={'right'}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: 'gray',
                            color: 'white',
                            marginLeft: '22px !important',
                            boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.20)',
                          },
                        },
                      }}
                    >
                      <ListItemButton
                        // onClick={toogleOpenSearch}
                        sx={{
                          margin: '6px 14px',
                          padding: '10px',
                          borderRadius: '8px',
                          backgroundColor: '#26284687',
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: '46px' }}>
                          <Badge
                            badgeContent={key.badge}
                            color="secondary"
                            variant="dot"
                          >
                            <key.icon
                              sx={{ fontSize: '20px', color: 'lightgray' }}
                            />
                          </Badge>
                        </ListItemIcon>

                        <InputBase
                          inputRef={refFocus}
                          margin="dense"
                          fullWidth={true}
                          placeholder="Search"
                          sx={{
                            fontSize: '0.875rem',
                            lineHeight: '1.43em',
                            '& .MuiInputBase-input': {
                              color: 'lightgray',
                              padding: 0,
                            },
                          }}
                        ></InputBase>
                      </ListItemButton>
                    </Tooltip>
                    <Divider variant="middle" light={true} />
                  </>
                ) : (
                  <Tooltip
                    title={!openDrawer ? key.desc : ''}
                    onClick={() => navigate(`${key.url}`)}
                    placement={'right'}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: 'gray',
                          color: 'white',
                          marginLeft: '22px !important',
                          boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.20)',
                        },
                      },
                    }}
                  >
                    <ListItemButton
                      sx={{
                        margin: '6px 14px',
                        padding: '10px',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: '#26284687',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: '46px' }}>
                        <Badge
                          badgeContent={key.badge}
                          color="secondary"
                          variant="dot"
                        >
                          <key.icon sx={{ fontSize: '20px', color: 'lightgray' }} />
                        </Badge>
                      </ListItemIcon>

                      <ListItemText
                        primary={key.desc}
                        primaryTypographyProps={{
                          variant: 'body2',
                        }}
                        sx={{
                          display: 'inline',
                          margin: '0px',
                          overflowX: 'hidden',
                          color: 'lightgray',
                          whiteSpace: 'nowrap',
                          minWidth: '126px',
                        }}
                      />
                      {key.badge !== 0 ? (
                        <Chip
                          label={key.badge}
                          color={'secondary'}
                          size="small"
                          sx={{ height: 'auto' }}
                        />
                      ) : (
                        <></>
                      )}
                    </ListItemButton>
                  </Tooltip>
                )}
              </>
            ))}
            <Divider variant="middle" light={true} />
          </List>
        ) : (
          <List dense={true}>
            {navbarListCommon.map((key, index) => (
              <>
                {index === 0 ? (
                  <>
                    <Tooltip
                      key={index}
                      title={!openDrawer ? key.desc : ''}
                      placement={'right'}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: 'gray',
                            color: 'white',
                            marginLeft: '22px !important',
                            boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.20)',
                          },
                        },
                      }}
                    >
                      <ListItemButton
                        // onClick={toogleOpenSearch}
                        sx={{
                          margin: '6px 14px',
                          padding: '10px',
                          borderRadius: '8px',
                          backgroundColor: '#26284687',
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: '46px' }}>
                          <Badge
                            badgeContent={key.badge}
                            color="secondary"
                            variant="dot"
                          >
                            <key.icon
                              sx={{ fontSize: '20px', color: 'lightgray' }}
                            />
                          </Badge>
                        </ListItemIcon>

                        <InputBase
                          inputRef={refFocus}
                          margin="dense"
                          fullWidth={true}
                          placeholder="Search"
                          sx={{
                            fontSize: '0.875rem',
                            lineHeight: '1.43em',
                            '& .MuiInputBase-input': {
                              color: 'lightgray',
                              padding: 0,
                            },
                          }}
                        ></InputBase>
                      </ListItemButton>
                    </Tooltip>
                    <Divider variant="middle" light={true} />
                  </>
                ) : (
                  <Tooltip
                    title={!openDrawer ? key.desc : ''}
                    placement={'right'}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: 'gray',
                          color: 'white',
                          marginLeft: '22px !important',
                          boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.20)',
                        },
                      },
                    }}
                  >
                    <ListItemButton
                      sx={{
                        margin: '6px 14px',
                        padding: '10px',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: '#26284687',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: '46px' }}>
                        <Badge
                          badgeContent={key.badge}
                          color="secondary"
                          variant="dot"
                        >
                          <key.icon sx={{ fontSize: '20px', color: 'lightgray' }} />
                        </Badge>
                      </ListItemIcon>

                      <ListItemText
                        primary={key.desc}
                        primaryTypographyProps={{
                          variant: 'body2',
                        }}
                        sx={{
                          display: 'inline',
                          margin: '0px',
                          overflowX: 'hidden',
                          color: 'lightgray',
                          whiteSpace: 'nowrap',
                          minWidth: '126px',
                        }}
                      />
                      {key.badge !== 0 ? (
                        <Chip
                          label={key.badge}
                          color={'secondary'}
                          size="small"
                          sx={{ height: 'auto' }}
                        />
                      ) : (
                        <></>
                      )}
                    </ListItemButton>
                  </Tooltip>
                )}
              </>
            ))}
            <Divider variant="middle" light={true} />
          </List>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignContents: 'center',
          margin: '14px 14px',
          padding: '12px 4px',
          borderTop: '1px solid lightgray',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            marginRight: '18px',
            paddingLeft: '0px',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <Avatar src="/assets/avatar.jpg" />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography
            component="span"
            variant="body2"
            sx={{
              fontFamily: 'inherit',
              display: 'block',
              whiteSpace: 'nowrap',
              lineHeight: 'inherit',
              fontWeight: 500,
              color: 'lightgray',
            }}
          >
            Arrofi Reza S.
          </Typography>
          <Typography
            component="span"
            variant="body2"
            sx={{
              display: 'block',
              whiteSpace: 'nowrap',
              lineHeight: 'inherit',
              color: 'lightgray',
            }}
          >
            Web Designer
          </Typography>
        </Box>
        <IconButton sx={{ color: 'lightGray' }}>
          <ExitToAppIcon />
        </IconButton>
      </Box>
    </>
  );
  return (
    <Drawer
        variant="permanent"
        open={openDrawer}
        sx={{
          width: !openDrawer
            ? { xs: '0px', sm: drawerWidthClose }
            : { xs: drawerWidthClose, sm: drawerWidthOpen },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: !openDrawer
              ? theme.transitions.duration.leavingScreen
              : theme.transitions.duration.enteringScreen,
          }),
          '& .MuiDrawer-paper': {
            justifyContent: 'space-between',
            overflowX: 'hidden',
            width: !openDrawer
              ? { xs: '0px', sm: drawerWidthClose }
              : { xs: drawerWidthClose, sm: drawerWidthOpen },
            borderRight: '0px',
            borderRadius: '0px 16px 16px 0px',
            boxShadow: theme.shadows[8],
            backgroundColor: !openDrawer ? '#11101D' : '#11101D',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: !openDrawer
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>
  )
}

export default Sidebar