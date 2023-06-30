import React from 'react'
import { Card, Grid, Typography } from '@mui/material'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { IRecord } from '../../../api/medical-record'
import { Line } from 'react-chartjs-2';
import styles from './styles.module.scss'

type PropsType = {
  records: IRecord[]
}

const ListRecord: React.FC<PropsType> = ({ records }) => {

  // const options = {
  //   plugins: {
  //     legend: true
  //   }
  // }
  return (
    <React.Fragment>
      {records?.map((record, index) => {
        const data = {
          labels: record?.ecg?.map((item: number, index: number) => (index/100)*4),
          datasets: [{
            label: 'Chỉ số ECG',
            data: record?.ecg,
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua',
            pointRadius: 0,
          }]
        }
        console.log(record?.bpm)
        return (
          <Card key={index} className={styles.container}>
            <Grid item xs={4} spacing={1} className={styles.itemContainer}>
              <Typography style={{ display: 'inline-flex' }}>
                <span style={{ marginRight: '0.5rem' }}>
                  <MonitorHeartIcon />
                </span>
                Nhịp tim:
                {' '}
                {record?.bpm}
              </Typography>
              <Typography style={{ display: 'inline-flex' }}>
                <span style={{ marginRight: '0.5rem' }}>
                  <DirectionsRunIcon />
                </span>
                Nồng độ oxy trong máu:
                {' '}
                {record?.spo2}
              </Typography>
              <Typography style={{ display: 'inline-flex' }}>
                <span style={{ marginRight: '0.5rem' }}>
                  <DeviceThermostatIcon />
                </span>
                Nhiệt độ cơ thể: 
                {' '}
                {record?.tem}
              </Typography>
            </Grid>
            <Grid item xs={8} spacing={1}>
              <Line
                data={data}
                style={{ width: '100%'}}
              >
              </Line>
            </Grid>
        </Card>
        )
      })}
    </React.Fragment>
  )
}
export default ListRecord