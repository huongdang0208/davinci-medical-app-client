import { Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Sidebar from '../../common/sidebar'
import { getUser } from '../../api/auth';
import { User } from '../../services/user';
type PropsType = object

const Home: React.FC<PropsType> = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('id token')
  const [user, setUser] = useState<User>()
  const [viewFullScreen, setViewFullScreen] = useState<boolean>(true)
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
  return (
    <React.Fragment>
    <Box  sx={{ display: 'flex' }}>
      <Grid item xs={viewFullScreen ? 2 : 0}>
        <Sidebar user={user as User} openDrawer={viewFullScreen} setOpenDrawer={setViewFullScreen} />
      </Grid>
      <Grid item xs={viewFullScreen ? 10 : 12} className={styles.styleItemGrid}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: '3rem' }}>
          
        </Grid>
      </Grid>
    </Box>
</React.Fragment>
  )
}

export default Home