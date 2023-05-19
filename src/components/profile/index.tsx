import { Alert, AlertColor, Box, Button, CardActions, CardContent, CssBaseline, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { updateProfile } from '../../api/profile'
import Sidebar from '../../common/sidebar'
import { getUser } from '../../api/auth'
import styles from './styles.module.scss'
import { User } from '../../services/user';
import { useNavigate } from 'react-router-dom';

type PropsType = object

const Profile: React.FC<PropsType> = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    username: '',
    age: 0,
    gender: 'female',
    email: '',
    address: '',
    contactNumber: 0,
  })
  const [user, setUser] = useState<User>()
  const [alert, setAlert] = useState({
    severity: "",
    message: ""
  })
  const [openAlert, setOpenAlert] = useState(false)

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
      return
    }
    navigate('/dang-nhap')

  }, [token])

  useEffect(() => {
    if (user) {
      setFormFields({...formFields,
        username: user?.username,
        age: user?.age || 0,
        gender: user?.gender || '',
        email: user?.email,
        address: user?.address || '',
        contactNumber: user?.contactNumber || 0,
      })
    }
  }, [user, setUser, token])

  const getFormFieldsData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value
    const fieldName = e.target.name
    setFormFields({...formFields, [fieldName]: fieldValue})
  }
  const getUserData = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (user?._id) {
      updateProfile(user?._id, formFields, (data, error) => {
        if (data) {
          setOpenAlert(true)
          setAlert({
            severity: "success",
            message: "Update information successfully!",
          })
        }
        if (error) {
          setOpenAlert(true)
          setAlert({
            severity: "error",
            message: "Update information failed!",
          })
        }
      })
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  }

  const inputField = {
    // width: '35%'
  }

  return (
    <React.Fragment>
      <CssBaseline />
        <Grid container className={styles.container}>
          <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleClose} severity={alert.severity as AlertColor} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
          <Grid item xs={2}>
            <Sidebar user={user as User} />
          </Grid>
          <Grid item xs={10}>
            <Box
              className={styles.subContainer}
              // sx={{
              //   '& .MuiTextField-root': { borderBottom: '1px solid #603c81' },
              // }}
            >
              <form autoComplete='off'>
                <CardContent>
                  <Typography variant="h5" className={styles.title}>Hồ sơ bệnh án</Typography>
                  <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className={styles.formContainer}>
                      <Grid item xs={6} spacing={2} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Username"
                          name="username"
                          value={formFields.username}
                          onChange={getFormFieldsData}
                          sx={inputField}
                        />
                      </Grid>
                      <Grid item xs={6} spacing={2} container sx={{ display: 'inline-block' }}>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="gender"
                          onChange={getFormFieldsData}
                        >
                          <FormControlLabel value="female" checked={user?.gender === 'female'} control={<Radio />} label="Female" />
                          <FormControlLabel value="male" checked={user?.gender === 'male'} control={<Radio />} label="Male" />
                        </RadioGroup>
                      </Grid>
                      <Grid item xs={6} spacing={2} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Age"
                          name="age"
                          value={formFields.age}
                          onChange={getFormFieldsData}
                          sx={{ width: '5rem'}}
                        />
                      </Grid>
                      
                      <Grid item xs={12} spacing={2} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Email"
                          name="email"
                          value={formFields.email}
                          onChange={getFormFieldsData}
                          sx={inputField}
                        />
                      </Grid>
                      <Grid item xs={12} spacing={2} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Address"
                          name="address"
                          value={formFields.address}
                          onChange={getFormFieldsData}
                          sx={inputField}
                        />
                      </Grid>
                      <Grid item xs={12} spacing={2} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Contact Number"
                          name="contactNumber"
                          value={formFields.contactNumber}
                          onChange={getFormFieldsData}
                          sx={inputField}
                        />
                      </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={(e) => getUserData(e)}>Save</Button>
                </CardActions>
              </form>
            </Box>
          </Grid>
        </Grid>
    </React.Fragment>
  )
}

export default Profile