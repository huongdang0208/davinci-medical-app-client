import React, { useState } from 'react'
import { Avatar, Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { User } from '../../services/user'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import styles from './styles.module.scss'

type PropsType = {
  user: User | undefined,
}

const Sidebar: React.FC<PropsType> = ( { user }) => {
  const [openDrawer, setOpenDrawer] = useState(true)
  const listSideBar = [
    {
      key: 0,
      name: 'Kiểm tra sức khỏe',
      url: '/check',
      icon: <MonitorHeartIcon fontSize='large' />
    },
    {
      key: 1,
      name: 'Lịch sử',
      url: '/history',
      icon: <AssignmentIcon fontSize='large' />
    },
    {
      key: 2,
      name: 'Hồ sơ',
      url: '/profile',
      icon: <PersonPinIcon fontSize='large' />
    },
  ]

  const handleHideDrawer = () => {
    setOpenDrawer(false)
  }
  return (
    <React.Fragment>
      <ArrowBackIosIcon onClick={() => handleHideDrawer()} style={{ position: 'fixed', right: '0' }} />
      <Drawer anchor="left" open={openDrawer} variant="persistent">
        <Box className={styles.container}>
          <List>
            <Grid className={styles.avatarContainer}>
              <Avatar
                alt="User Avatar"
                src="/assets/avatar.jpg"
                sx={{ width: 80, height: 80 }}
              />
              <Typography className={styles.username}>{user?.username}</Typography>
            </Grid>
            <Divider className={styles.divider} />
            {listSideBar?.map((item) => (
              <ListItem key={item.key}>
                <ListItemButton href={item.url}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  )
}

export default Sidebar
//https://stackoverflow.com/questions/52396360/how-to-hide-material-ui-mini-variant-drawer-on-mobile-view