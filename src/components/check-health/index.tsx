import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Alert, CssBaseline, Grid, Snackbar, AlertColor } from '@mui/material'
import Sidebar from '../../common/sidebar'
import { User } from '../../services/user'
import { getUser } from '../../api/auth'
import { useNavigate } from 'react-router-dom';
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

  const token = localStorage.getItem('id token')
  const ecgRecord = [-1.1008778 ,-3.9968398, -4.2858426, -4.5065789, -4.0223767 ,-3.2343676 ,-1.5661258 ,-0.99225766, -0.75467971, 0.042321173, 0.14895093, 0.18352707, 0.29487608, 0.19023267, 0.235575, 0.25348712, 0.2217424, 0.050233259, 0.17804214, 0.13956318, 0.046794433, 0.043007139, 0.10654432, 0.012654003, 0.003994854 ,0.045724179 ,-0.045999362 ,-0.072666959 ,-0.071077909, -0.15386649 ,-0.22725443, -0.2492697 ,-0.25348935, -0.33283516, -0.26432996 ,-0.34582525 ,-0.31078107 ,-0.33415978 ,-0.30617791, -0.17456252, -0.20616017, -0.22447967, -0.048683931, -0.019621159, 0.094805186, 0.11678639, 0.18518592, 0.23052577, 0.13802707, 0.24442554, 0.27169477, 0.25900331, 0.26920166, 0.12706463, 0.20207339, 0.25598343, 0.15311526, 0.21021583, 0.19108187, 0.19092702, 0.21051006, 0.20710764 ,0.20488835, 0.20086474, 0.34691963, 0.3480019, 0.25453726, 0.33197465, 0.3566903, 0.34992982, 0.43037963, 0.46750163, 0.48606309, 0.4031884, 0.47895569, 0.39739177, 0.46412003, 0.45179539, 0.36136121, 0.3798309, 0.34278528, 0.39910656, 0.3875084, 0.25570346, 0.28403408, 0.28499257, 0.25010809, 0.17303626, 0.14942257, 0.141685, 0.22226096, 0.17284705, 0.15077932, 0.17656601, 0.28094204, 0.48993901, 0.66088884, 0.8931933, 1.0269972, 1.2023937, 1.5574096, 1.8084277, 2.1643459 ,2.0707467, 1.9036136, 1.7644552, 1.5077694, 1.2934277, 0.89456215, 0.57801575 ,0.24434305 ,-0.28644345, -0.51588134 ,-0.73270694, -0.83246547, -0.80331806, -0.83625248, -0.77786456, -0.77475301, -0.73340394, -0.72138631, -0.83209517, -0.71198159 ,-0.7518673 ,-0.7577196 ,-0.85311967, -0.76698841, -0.68816064, -0.51992349, 0.039406169, 0.56032676 ,0.53835583, 0.65688079, 0.78748958 ,0.72404623 ,0.55578372, 0.47633335 ,0.77381971 ,1.1196209, -1.4362499 ]

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
    navigate('/profile')

  }, [token])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  }

  const data = {
    labels: ecgRecord?.map((item: number, index: number) => (index/100)*4),
    datasets: [{
      labels: 'ECG',
      data: ecgRecord,
      backgroundColor: 'aqua',
      borderColor: 'black',
      pointBorderColor: 'aqua',
      pointRadius: 0,
    }]
  }

  // const options = {
  //   plugins: {
  //     legend: true
  //   }
  // }

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container className={styles.container}>
        <Snackbar open={openAlert} autoHideDuration={60000000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleClose} severity={alert.severity as AlertColor} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
          <Grid item xs={2}>
            <Sidebar user={user as User} />
          </Grid>
          <Grid item xs={10}>
            <Line data={data} style={{width: '2000px', height: '100vh'}}></Line>
          </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default CheckHealth