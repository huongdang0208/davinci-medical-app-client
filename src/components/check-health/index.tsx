import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, } from 'chart.js'
import { useNavigate } from 'react-router-dom';
import { Alert, Grid, Snackbar, AlertColor, Box } from '@mui/material'
import Sidebar from '../../common/sidebar'
import { User } from '../../services/user'
import { getUser } from '../../api/auth'
import { IRecord } from '../../api/medical-record';
import { getRecords } from '../../api/medical-record';
import ListRecord from './list-record';
import styles from './styles.module.scss'
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

type PropsType = object

const CheckHealth: React.FC<PropsType> = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>()
  const [alert, setAlert] = useState({
    severity: "",
    message: ""
  })
  const [openAlert, setOpenAlert] = useState(false)
  const [viewFullScreen, setViewFullScreen] = useState<boolean>(true)
  const [healthParameters, setHealthParameters] = useState<IRecord[]>()

  const token = localStorage.getItem('id token')
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

      getRecords((data, error) => {
        if (data) {
          setHealthParameters(data)
        }
        if (error) {
          console.log(error)
        }
      })
      return
    }
    navigate('/profile')

  }, [token])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  }

  useEffect(() => {
    console.log('viewFullScreen: ', viewFullScreen)
  }, [viewFullScreen, setViewFullScreen])

  return (
    <React.Fragment>
        <Box  sx={{ display: 'flex' }}>
          <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleClose} severity={alert.severity as AlertColor} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
          <Grid item xs={viewFullScreen ? 2 : 0}>
            <Sidebar user={user as User} openDrawer={viewFullScreen} setOpenDrawer={setViewFullScreen} />
          </Grid>
          <Grid item xs={viewFullScreen ? 10 : 12} className={styles.styleItemGrid}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: '3rem' }}>
              <ListRecord records={healthParameters || []} />
            </Grid>
          </Grid>
        </Box>
    </React.Fragment>
  )
}

export default CheckHealth