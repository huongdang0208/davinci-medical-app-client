import { Alert, Box, Button, CardActions, CardContent, CssBaseline, Fade, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddIcon from '@mui/icons-material/Add'
import Backdrop from '@mui/material/Backdrop'
import { updateProfile } from '../../api/profile'
import Sidebar from '../../common/sidebar'
import { getUser } from '../../api/auth'
import styles from './styles.module.scss'
import { User } from '../../services/user';
import { useNavigate } from 'react-router-dom';

type PropsType = object

const Profile: React.FC<PropsType> = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('id token')
  const [formFields, setFormFields] = useState({
    name: '',
    cccd: '',
    email: '',
    address: '',
    contactNumber: '',
    note: '',
    plan: 'F',
  })
  const [memberInfo, setMemberInfo] = useState({
    name: '',
    cccd: '',
    email: '',
    address: '',
    contactNumber: '',
    note: ''
  })
  const [user, setUser] = useState<User>()

  const [alert, setAlert] = useState({
    // severity: "",
    message: ""
  })
  const [openAlert, setOpenAlert] = useState(false)
  const [viewFullScreen, setViewFullScreen] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState(false)


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
        name: user?.name || '',
        email: user?.email,
        cccd: user?.cccd || '',
        address: user?.address || '',
        contactNumber: user?.contactNumber || '',
        note: user?.note || '',
        plan: user?.plan || 'F',
      })
    }
  }, [user, setUser, token])

  const getFormFieldsData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value
    const fieldName = e.target.name
    setFormFields({...formFields, [fieldName]: fieldValue})
  }

  const getMemberInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value
    const fieldName = e.target.name
    setMemberInfo({...memberInfo, [fieldName]: fieldValue})
  }
  const getUserData = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    console.log(user?.email)
    if (user?.email) {
      updateProfile(user.email, formFields, (data, error) => {
        console.log(data)
        if (data) {
          setOpenAlert(true)
          setAlert({
            // severity: "success",
            message: "Cập nhật thành công!",
          })
        }
        if (error) {
          setOpenAlert(true)
          setAlert({
            // severity: "error",
            message: error as string,
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

  const handleAddMember = () => {
    setOpenModal(true)
  }

  const handleSaveNewMember = () => {
    console.log(user)
  }


  return (
    <React.Fragment>
      <CssBaseline />
        <Grid container className={styles.container}>
          <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleClose} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
          <Grid item xs={2}>
            <Sidebar user={user as User} openDrawer={viewFullScreen} setOpenDrawer={setViewFullScreen} />
          </Grid>
          <Grid item xs={10}>
            <Box
              className={styles.subContainer}
              sx={{
                '& .MuiTextField-root': { borderBottom: '1px solid #603c81', width: '30rem' },
              }}
            >
              <form autoComplete='off'>
                <CardContent>
                  <Typography variant="h5" className={styles.title}>Thông tin người dùng</Typography>
                  <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className={styles.formContainer}>
                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Tên người dùng"
                          name="name"
                          value={formFields.name}
                          onChange={getFormFieldsData}
                        />
                      </Grid>
                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Căn cước công dân"
                          name="cccd"
                          value={formFields.cccd}
                          onChange={getFormFieldsData}
                          // sx={{ width: '5rem'}}
                        />
                      </Grid>

                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Lịch sử bệnh án"
                          name="medicalRecord"
                          value={formFields.note}
                          onChange={getFormFieldsData}
                        />
                      </Grid>
                      
                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Email"
                          name="email"
                          value={formFields.email}
                          onChange={getFormFieldsData}
                        />
                      </Grid>
                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Địa chỉ"
                          name="address"
                          value={formFields.address}
                          onChange={getFormFieldsData}
                        />
                      </Grid>
                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Số điện thoại"
                          name="contactNumber"
                          value={formFields.contactNumber}
                          onChange={getFormFieldsData}
                        />
                      </Grid>
                      <Grid item xs={6} spacing={1} container sx={{ display: 'inline-block' }} className={styles.inputContainer}>
                        <div style={{ display: 'block', width: '100%' }}>
                          <FormLabel id="demo-radio-buttons-group-label">Chọn gói người dùng</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="F"
                            name="plan"
                            onChange={getFormFieldsData}
                          >
                            <FormControlLabel value="F" control={<Radio />} label="Free" />
                          </RadioGroup>
                        </div>
                      </Grid>
                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        {user?.userId ? (
                          <Typography className={styles.warningText}>
                            <span>
                              <ErrorOutlineIcon />
                            </span>
                            Bạn cần nhập đầy đủ thông tin và lưu trước khi có thể thêm thành viên khác
                          </Typography>
                        ) : (
                          <Button variant="outlined" startIcon={<AddIcon />} onClick={() => handleAddMember()}>Thêm thành viên</Button>
                        )}
                      </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={styles.btnContainer}>
                  <Button size="small" onClick={(e) => getUserData(e)} className={styles.saveBtn}>Lưu</Button>
                </CardActions>
              </form>
            </Box>
          </Grid>
        </Grid>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={() => setOpenModal(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openModal}>
            <Box className={styles.modalBox}>
              <form autoComplete='off'>
                <CardContent className={styles.formContainer}>
                  <Typography variant="h5" className={styles.titleModal}>Thông tin thành viên</Typography>
                  <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Tên người dùng"
                          name="name"
                          value={memberInfo.name}
                          onChange={getMemberInfo}
                          sx={{ width: '95%'}}
                        />
                      </Grid>
                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Căn cước công dân"
                          name="cccd"
                          value={memberInfo.cccd}
                          onChange={getMemberInfo}
                          sx={{ width: '95%'}}
                        />
                      </Grid>

                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Lịch sử bệnh án"
                          name="medicalRecord"
                          value={memberInfo.note}
                          onChange={getMemberInfo}
                          sx={{ width: '95%'}}
                        />
                      </Grid>
                      
                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Email"
                          name="email"
                          value={memberInfo.email}
                          onChange={getMemberInfo}
                          sx={{ width: '95%'}}
                        />
                      </Grid>
                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Địa chỉ"
                          name="address"
                          value={memberInfo.address}
                          onChange={getMemberInfo}
                          sx={{ width: '95%'}}
                        />
                      </Grid>
                      <Grid item xs={12} spacing={1} container className={styles.inputContainer}>
                        <TextField
                          variant="standard"
                          label="Số điện thoại"
                          name="contactNumber"
                          value={memberInfo.contactNumber}
                          onChange={getMemberInfo}
                        />
                      </Grid>
                </CardContent>
                <CardActions className={styles.btnGroup}>
                  <Button onClick={() => handleSaveNewMember()}>Lưu thành viên</Button>
                  <Button onClick={() => setOpenModal(false)}>Hủy</Button>
                </CardActions>
              </form>

            </Box>
          </Fade>
        </Modal>
    </React.Fragment>
  )
}

export default Profile