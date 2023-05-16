import { Avatar, Box, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { User } from '../../services/user'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import styles from './styles.module.scss'

type PropsType = {
  user: User | undefined,
}

const Sidebar: React.FC<PropsType> = ( { user }) => {
  const listSideBar = [
    {
      key: 0,
      name: 'Check your health',
      url: '/check',
      icon: <MonitorHeartIcon fontSize='large' />
    },
    {
      key: 1,
      name: 'History',
      url: '/history',
      icon: <AssignmentIcon fontSize='large' />
    },
    {
      key: 2,
      name: 'Profile',
      url: '/profile',
      icon: <PersonPinIcon fontSize='large' />
    },
  ]
  return (
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
  )
}

export default Sidebar