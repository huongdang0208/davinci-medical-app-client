import { Box, Button, CardActions, CardContent, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { updateProfile } from '../../api/profile'
import Sidebar from '../../common/sidebar'
import { getUser } from '../../api/auth'
import styles from './styles.module.scss'
import { User } from '../../services/user';
import { redirect } from "react-router-dom";

type PropsType = object

const Profile: React.FC<PropsType> = () => {
  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    address: '',
    contactNumber: 0,
  })
  const [user, setUser] = useState<User>()

  const token = localStorage.getItem('id token')

  useEffect(() => {
    if (token ) {
      getUser(token, (data, error) => {
        if (user) {
          console.log('user in get', data)
          setUser(data)
        }
        if (error) {
          console.log(error)
        }
      })
      return
    }
    redirect('/dang-nhap')

  }, [token])

  useEffect(() => {
    if (user) {
      console.log('user in useEffect: ', user)
      setFormFields({...formFields,
        username: user?.username,
        email: user?.email,
        address: user?.address || '',
        contactNumber: user?.contactNumber || 0,
      })
    }
  }, [user, setUser])

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
          console.log(data)
        }
        if (error) {
          console.log(error)
        }
      })
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
        <Grid container maxWidth="sm" className={styles.container}>
          <Grid item xs={6}>
            <Sidebar user={user as User} />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ height: '100vh' }} className={styles.subContainer}>
              <form autoComplete='off'>
                <CardContent>
                  <Typography variant="h5" className={styles.title}>Contact information</Typography>
                  <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={12} spacing={2}>
                        <TextField
                          variant="standard"
                          label="Username"
                          name="username"
                          value={formFields.username}
                          onChange={getFormFieldsData}
                        />
                      </Grid>
                      <Grid item xs={12} spacing={2}>
                        <TextField
                          variant="standard"
                          label="Email"
                          name="email"
                          value={formFields.email}
                          onChange={getFormFieldsData}
                        />
                      </Grid>
                      <Grid item xs={12} spacing={2}>
                        <TextField
                          variant="standard"
                          label="Address"
                          name="address"
                          value={formFields.address}
                          onChange={getFormFieldsData}
                        />
                      </Grid>
                      <Grid item xs={12} spacing={2}>
                        <TextField
                          variant="standard"
                          label="Contact Number"
                          name="contactNumber"
                          value={formFields.contactNumber}
                          onChange={getFormFieldsData}
                        />
                      </Grid>
                      {/* <Grid item xs={12} spacing={2}>
                        <TextField
                          variant="standard"
                          label="Password"
                          name="password"
                          value={formFields.password}
                          onChange={getFormFieldsData}
                        />
                      </Grid> */}
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