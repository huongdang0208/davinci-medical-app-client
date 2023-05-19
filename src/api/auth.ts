import axios, { AxiosRequestHeaders } from 'axios'
import { User } from '../services/user';
import { validateEmail, validateRegister } from '../services/validate';
// import { loadToken } from './profile';

interface Callback {
  (data: User | undefined, err: Error | string | undefined): void
}

const baseUrl = 'http://localhost:5000'

export const registerUser = async (user: User, callback: Callback) => {

  if (!validateRegister(user)) {
    callback(undefined, 'Hãy điền đủ các trường cần thiết!')
  } else if (!validateEmail(user.email)) {
    callback(undefined, 'Email không hợp lệ!')
  } else {
    // const config = {
    //   method: 'post',
    //   url: `${baseUrl}/users/register`,
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   auth: {
    //     username: user.username,
    //     email: user.email,
    //     password: user.password
    //   }
    // }
    const headers = {
      'Content-Type': 'application/json'
    } as AxiosRequestHeaders
    try {
      const response = await axios.post(`${baseUrl}/users/register`, user, { headers: headers})
      if (response.data) {
        callback(response.data, undefined)
      }
    } catch (error) {
      callback(undefined, 'Đăng kí không thành công')
    }
  }
}

export const storeUserData = (token: string, user: User) => {
  localStorage.setItem('id token', token)
  // need to convert user data to string because localStorage only store string not object
  localStorage.setItem('user: ', JSON.stringify(user))
}

export const signInUser = async (username: string, password: string, callback: Callback) => {
  const user = {
    username,
    password
  }
  const headers = {
    'Content-Type': 'application/json'
  } as AxiosRequestHeaders
  try {
    const response = await axios.post(`${baseUrl}/users/authenticate`, user, { headers: headers})
    if (response.data) {
      callback(response.data, undefined)
      storeUserData(response.data.token, response.data.user)
    }
  } catch (error) {
    callback(undefined, 'Cannot find the user')
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
    const response = await axios.get(`${baseUrl}/users/user`, { headers: headers })
    if (response.data) {
      callback(response.data.user, undefined)
    }
  } catch (error) {
    callback(undefined, 'Error')
  }
}

