import { Container, Box, CssBaseline, Typography, Grid } from '@mui/material'
import React from 'react'
import styles from './styles.module.scss'
import TopBar from '../../common/appbar'
type PropsType = object

const Home: React.FC<PropsType> = () => {
  return (
    <>
      <Box className={styles.subContainer}>
        <TopBar />
      </Box>
      <Grid className={styles.homePage}>
        <CssBaseline />
        <Container maxWidth="sm" className={styles.container} sx={{ height: '100vh'}}>
          <Box sx={{ maxWidth: '1100px'}}>
            <div className={styles.infoBox}>
              <Typography className={styles.infoBoxBoldText}>
                Davinci
              </Typography>
              <Typography className={styles.infoBoxBoldText}>
                Do người Việt - Cho người Việt
              </Typography>
              {/* <Typography className={styles.infoBoxSlimText}>
                In aenean posuere lorem risus nec. Tempor tincidunt aenean purus purus vestibulum nibh mi venenatis
              </Typography> */}
            </div>
            
          </Box>
        </Container>
      </Grid>
    </>
  )
}

export default Home