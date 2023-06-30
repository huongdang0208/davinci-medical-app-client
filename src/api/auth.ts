import axios, { AxiosRequestHeaders } from 'axios'
import { User } from '../services/user';
import { validateEmail, validateRegister } from '../services/validate';
import { REGISTER_URL, AUTHENTICATE_URL } from '../constant/auth-api';

interface Callback {
  (data: User | undefined, err: Error | string | undefined): void
}

const baseUrl = 'http://localhost:5000'

export const storeUserData = (token: string, user: User) => {
  localStorage.setItem('id token', token)
  // need to convert user data to string because localStorage only store string not object
  localStorage.setItem('user: ', JSON.stringify(user))
}

export const registerUser = async (user: User, callback: Callback) => {

  if (!validateRegister(user)) {
    callback(undefined, 'Hãy điền đủ các trường cần thiết!')
  } else if (!validateEmail(user.email)) {
    callback(undefined, 'Email không hợp lệ!')
  } else {
    const headers = {
      'Content-Type': 'application/json'
    } as AxiosRequestHeaders
    try {
      const response = await axios.post(REGISTER_URL, user, { headers: headers})
      if (response.data.success) {
        callback(response.data, undefined)
        storeUserData(response.data.token, response.data.user)
      } else {
        callback(undefined, response.data.message)
      }
    } catch (error) {
      callback(undefined, 'Đăng kí không thành công')
    }
  }
}


export const signInUser = async (email: string, password: string, callback: Callback) => {
  const user = {
    email,
    password
  }
  const headers = {
    'Content-Type': 'application/json'
  } as AxiosRequestHeaders
  try {
    const response = await axios.post(AUTHENTICATE_URL, user, { headers: headers})
    if (response.data.success) {
      console.log(response)
      callback(response.data, undefined)
      storeUserData(response.data.token, response.data.user)
    } else {
      callback(undefined, 'Sai mật khẩu')
    }
  } catch (error) {
    callback(undefined, 'Không tìm thấy người dùng')
  }
}

export const logout = () => {
  localStorage.clear()
}

export const getUser = async (token: string, callback: Callback) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token,
  } as AxiosRequestHeaders
  try {
    const response = await axios.get(`${baseUrl}/api/user/user`, { headers: headers })
    if (response.data) {
      callback(response.data.user, undefined)
    }
  } catch (error) {
    callback(undefined, 'Error')
  }
}

export const googleAuthenticate = async (callback: Callback) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    } as AxiosRequestHeaders

    const res = await axios.get(`${baseUrl}/api/auth/google`, { headers: headers, withCredentials: true })
    if (res.data) {
      console.log(res.data)
      callback(res.data, undefined)
    }
  } catch (err) {
    callback(undefined, 'Lỗi xác thực')
  }
}

