import React, { useState } from 'react'
import { TextField, Button, Link, Box, FormGroup, FormControlLabel, Checkbox, Alert, Grid, Typography } from '@mui/material'
import type { AlertColor } from '@mui/material'
import PrivacyTipRoundedIcon from '@mui/icons-material/PrivacyTipRounded';
import styles from './styles.module.scss'
import { registerUser } from '../../api/auth';
import { redirect } from "react-router-dom";


type PropsType = object

const RegisterForm: React.FC<PropsType> = () => {
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [isAlert, setIsAlert] = useState<AlertColor>()
  const [alertMessage, setAlertMessage] = useState<string>()

  const getFormFieldsData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value
    const fieldName = e.target.name
    setFormFields({...formFields, [fieldName]: fieldValue})
  }
  const handleRegister = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const newUser = {
      username: formFields.username,
      email: formFields.email,
      password: formFields.password,
    }
    registerUser(newUser, (data, err) => {
      if (data) {
        setIsAlert('success')
        setAlertMessage('Registered successfully!')
        redirect('/')
      } else {
        setIsAlert('error')
        setAlertMessage(err?.toString())
      }
    })
  }

  const styledGrid = { 
    maxWidth: '1000px',
    boxShadow: '0px 10px 50px #603c81',
    height: '80vh',
    margin: 'auto',
    marginTop: '5rem',
    border: '1.5px solid #603c81',
    borderRadius:' 1rem',
  }

    return (
      <Grid container sx={styledGrid}>
        {isAlert && <Alert severity={isAlert}>{alertMessage}</Alert>}
        <Grid item xs={6} className={styles.wrapperBackground}>
          <img src='/assets/doctor.png' alt='davinci' />
          <Typography variant="h6" className={styles.navLogo}>
              Protect Your Life And Take Care Of Your Health
          </Typography>
          <Grid container className={styles.styledContainerGrid}>
            <Grid item xs={6} className={styles.styledItemGrid}>
              <svg width="40" height="41" viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7692 19.4208C8.7291 19.4208 6.77253 18.6104 5.32995 17.1678C3.88736 15.7252 3.07692 13.7686 3.07692 11.7285V5.57467C3.07692 5.16665 3.23901 4.77534 3.52753 4.48682C3.81605 4.1983 4.20736 4.03621 4.61538 4.03621H6.15385C6.56187 4.03621 6.95318 3.87413 7.2417 3.58561C7.53022 3.29709 7.69231 2.90578 7.69231 2.49775C7.69231 2.08973 7.53022 1.69841 7.2417 1.40989C6.95318 1.12138 6.56187 0.95929 6.15385 0.95929H4.61538C3.39131 0.95929 2.21737 1.44555 1.35181 2.3111C0.486262 3.17666 0 4.3506 0 5.57467V11.7285C0.00197757 13.4666 0.425803 15.1782 1.23508 16.7163C2.04435 18.2545 3.21488 19.5732 4.64615 20.5593C6.02127 21.7716 7.13648 23.2501 7.92444 24.9053C8.7124 26.5606 9.15679 28.3583 9.23077 30.1901C9.23077 33.0462 10.3654 35.7854 12.385 37.8051C14.4046 39.8247 17.1438 40.9593 20 40.9593C22.8562 40.9593 25.5954 39.8247 27.615 37.8051C29.6346 35.7854 30.7692 33.0462 30.7692 30.1901V28.4362C32.2195 28.0618 33.4834 27.1712 34.324 25.9316C35.1646 24.6919 35.5243 23.1882 35.3356 21.7024C35.1468 20.2165 34.4227 18.8505 33.2988 17.8603C32.175 16.8702 30.7286 16.3239 29.2308 16.3239C27.733 16.3239 26.2866 16.8702 25.1627 17.8603C24.0389 18.8505 23.3147 20.2165 23.126 21.7024C22.9372 23.1882 23.2969 24.6919 24.1375 25.9316C24.9782 27.1712 26.2421 28.0618 27.6923 28.4362V30.1901C27.6923 32.2302 26.8819 34.1868 25.4393 35.6293C23.9967 37.0719 22.0401 37.8824 20 37.8824C17.9599 37.8824 16.0033 37.0719 14.5607 35.6293C13.1181 34.1868 12.3077 32.2302 12.3077 30.1901C12.3856 28.3561 12.8348 26.5569 13.6281 24.9015C14.4214 23.2461 15.5423 21.7689 16.9231 20.5593C18.3487 19.5698 19.5132 18.2496 20.317 16.7116C21.1208 15.1737 21.5399 13.4638 21.5385 11.7285V5.57467C21.5385 4.3506 21.0522 3.17666 20.1866 2.3111C19.3211 1.44555 18.1472 0.95929 16.9231 0.95929H15.3846C14.9766 0.95929 14.5853 1.12138 14.2968 1.40989C14.0082 1.69841 13.8462 2.08973 13.8462 2.49775C13.8462 2.90578 14.0082 3.29709 14.2968 3.58561C14.5853 3.87413 14.9766 4.03621 15.3846 4.03621H16.9231C17.3311 4.03621 17.7224 4.1983 18.0109 4.48682C18.2994 4.77534 18.4615 5.16665 18.4615 5.57467V11.7285C18.4615 12.7387 18.2626 13.739 17.876 14.6722C17.4894 15.6055 16.9228 16.4535 16.2085 17.1678C15.4942 17.8821 14.6462 18.4487 13.7129 18.8353C12.7797 19.2219 11.7794 19.4208 10.7692 19.4208ZM29.2308 25.5747C28.4147 25.5747 27.6321 25.2505 27.0551 24.6735C26.478 24.0964 26.1538 23.3138 26.1538 22.4978C26.1538 21.6817 26.478 20.8991 27.0551 20.322C27.6321 19.745 28.4147 19.4208 29.2308 19.4208C30.0468 19.4208 30.8294 19.745 31.4065 20.322C31.9835 20.8991 32.3077 21.6817 32.3077 22.4978C32.3077 23.3138 31.9835 24.0964 31.4065 24.6735C30.8294 25.2505 30.0468 25.5747 29.2308 25.5747Z" fill="#04A7C3"/>
              </svg>
              <Typography>Check your health via handheld device</Typography>
            </Grid>
            <Grid item xs={6} className={styles.styledItemGrid}>
              <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 24C17.4333 24 16.9587 23.808 16.576 23.424C16.192 23.0413 16 22.5667 16 22C16 21.4333 16.192 20.958 16.576 20.574C16.9587 20.1913 17.4333 20 18 20C18.5667 20 19.042 20.1913 19.426 20.574C19.8087 20.958 20 21.4333 20 22C20 22.5667 19.8087 23.0413 19.426 23.424C19.042 23.808 18.5667 24 18 24ZM10 24C9.43333 24 8.958 23.808 8.574 23.424C8.19133 23.0413 8 22.5667 8 22C8 21.4333 8.19133 20.958 8.574 20.574C8.958 20.1913 9.43333 20 10 20C10.5667 20 11.042 20.1913 11.426 20.574C11.8087 20.958 12 21.4333 12 22C12 22.5667 11.8087 23.0413 11.426 23.424C11.042 23.808 10.5667 24 10 24ZM26 24C25.4333 24 24.9587 23.808 24.576 23.424C24.192 23.0413 24 22.5667 24 22C24 21.4333 24.192 20.958 24.576 20.574C24.9587 20.1913 25.4333 20 26 20C26.5667 20 27.0413 20.1913 27.424 20.574C27.808 20.958 28 21.4333 28 22C28 22.5667 27.808 23.0413 27.424 23.424C27.0413 23.808 26.5667 24 26 24ZM18 32C17.4333 32 16.9587 31.808 16.576 31.424C16.192 31.0413 16 30.5667 16 30C16 29.4333 16.192 28.9587 16.576 28.576C16.9587 28.192 17.4333 28 18 28C18.5667 28 19.042 28.192 19.426 28.576C19.8087 28.9587 20 29.4333 20 30C20 30.5667 19.8087 31.0413 19.426 31.424C19.042 31.808 18.5667 32 18 32ZM10 32C9.43333 32 8.958 31.808 8.574 31.424C8.19133 31.0413 8 30.5667 8 30C8 29.4333 8.19133 28.9587 8.574 28.576C8.958 28.192 9.43333 28 10 28C10.5667 28 11.042 28.192 11.426 28.576C11.8087 28.9587 12 29.4333 12 30C12 30.5667 11.8087 31.0413 11.426 31.424C11.042 31.808 10.5667 32 10 32ZM26 32C25.4333 32 24.9587 31.808 24.576 31.424C24.192 31.0413 24 30.5667 24 30C24 29.4333 24.192 28.9587 24.576 28.576C24.9587 28.192 25.4333 28 26 28C26.5667 28 27.0413 28.192 27.424 28.576C27.808 28.9587 28 29.4333 28 30C28 30.5667 27.808 31.0413 27.424 31.424C27.0413 31.808 26.5667 32 26 32ZM4 40C2.9 40 1.958 39.6087 1.174 38.826C0.391333 38.042 0 37.1 0 36V8C0 6.9 0.391333 5.95867 1.174 5.176C1.958 4.392 2.9 4 4 4H6V2C6 1.43333 6.19133 0.958 6.574 0.574C6.958 0.191333 7.43333 0 8 0C8.56667 0 9.042 0.191333 9.426 0.574C9.80867 0.958 10 1.43333 10 2V4H26V2C26 1.43333 26.192 0.958 26.576 0.574C26.9587 0.191333 27.4333 0 28 0C28.5667 0 29.0413 0.191333 29.424 0.574C29.808 0.958 30 1.43333 30 2V4H32C33.1 4 34.042 4.392 34.826 5.176C35.6087 5.95867 36 6.9 36 8V36C36 37.1 35.6087 38.042 34.826 38.826C34.042 39.6087 33.1 40 32 40H4ZM4 36H32V16H4V36Z" fill="#04A7C3"/>
              </svg>
              <Typography>Review your health from the experts</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} className={styles.wrapperLogin}>
          <div className="top-wrapper">
            <div className="lock">
              <PrivacyTipRoundedIcon fontSize="large"></PrivacyTipRoundedIcon>
            </div>
            <h2>Sign Up</h2>
          </div>
          <div className="mid-wrapper">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "40ch" }
              }}
              noValidate
              autoComplete="off"
            >
              <div className="info-wrapper">
                <div className="username">
                  <TextField
                    name="username"
                    variant="standard"
                    required id="outlined-required"
                    label="User name"
                    autoComplete='off'
                    value={formFields.username}
                    onChange={getFormFieldsData}
                  />
                </div>
              </div>
              <div className="info-wrapper">
                <TextField
                  name="email"
                  variant="standard"
                  className="full"
                  required
                  id="outlined-required"
                  label="Email Address"
                  value={formFields.email}
                  onChange={getFormFieldsData}
                />
              </div>
              <div className="info-wrapper">
                <TextField
                  name="password"
                  className="full"
                  required
                  id="outlined-required"
                  label="Password"
                  variant="standard"
                  type="password"
                  value={formFields.password}
                  onChange={getFormFieldsData}
                />
              </div>
              <FormGroup>
                <FormControlLabel
                  className={styles.rightCopy}
                  control={<Checkbox defaultChecked />}
                  label="Agree with copyright"
                />
              </FormGroup>
            </Box>
            <Button className={styles.btn} variant="contained" onClick={(e) => handleRegister(e)}>
              Sign Up
            </Button>
            <div className="link-wrapper">
              <Link href="/dang-nhap" underline="always" className="anchor link-SignIn">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
          <div className={styles.bottomWrapper}>
            <Link
              href="https://mui.com/"
              underline="none"
              className="anchor copyright"
            >
              Copyright ©{" "}
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "gray"
                }}
              >
                Davinci
              </span>{" "}
              2023.
            </Link>
          </div>
        </Grid>
      </Grid>
    )
}

export default RegisterForm
