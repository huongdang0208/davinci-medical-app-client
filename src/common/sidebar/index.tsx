import React, { useState } from 'react'
import { Avatar, Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { User } from '../../services/user'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import styles from './styles.module.scss'

type PropsType = {
  user: User | undefined,
  openDrawer: boolean,
  setOpenDrawer: (data: boolean) => void
}

const Sidebar: React.FC<PropsType> = ( { user, openDrawer, setOpenDrawer }) => {
  // const [openDrawer, setOpenDrawer] = useState(true)
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
  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }
  return (
    <React.Fragment>
      <Avatar className={styles.toggleDrawer} sx={{ bgcolor: "#ba68c8" }}>
        {openDrawer ? <ArrowBackIosIcon onClick={() => handleHideDrawer()} className={styles.iconToggleScreen} /> : <ArrowForwardIosIcon onClick={() => handleOpenDrawer()} className={styles.iconToggleScreen} />}
      </Avatar>
      <Drawer
        anchor="left"
        open={openDrawer}
        variant="persistent"
        className={styles.drawerContainer}
      >
        <Box className={styles.container}>
          <List>
            <Grid className={styles.avatarContainer}>
              <Avatar
                alt="User Avatar"
                src="/assets/avatar.jpg"
                sx={{ width: 80, height: 80 }}
              />
              <Typography className={styles.username}>{user?.email}</Typography>
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