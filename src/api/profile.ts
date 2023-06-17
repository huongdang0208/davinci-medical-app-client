
import axios, { AxiosRequestHeaders } from 'axios'
import { User } from '../services/user';

interface Callback {
(data: User | undefined, err: Error | string | undefined): void
}

interface IUpdateProfile {
  name?: string,
  age?: number,
  gender?: string,
  email?: string,
  address?: string,
  contactNumber?: string
}

const baseUrl = 'http://localhost:5000/api/user'

export const loadToken = () => {
  const token = localStorage.getItem('id token')
  return token
}
  
export const updateProfile = async (email: string, params: IUpdateProfile, callback: Callback) => {
  const token = loadToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token,
  } as AxiosRequestHeaders
  try {
    const response = await axios.put(`${baseUrl}/update`, params, { headers: headers })
    if (response.data.success) {
      callback(response.data, undefined)
    } else {
      callback(undefined, response.data.message)
    }
  } catch (error) {
    callback(undefined, error as string)
  }
}

export const addMember = async(user: User, fieldInfo: IUpdateProfile, callback: Callback) => {
  const token = loadToken()
  const params = {...fieldInfo, userId: user?.userId }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token,
  } as AxiosRequestHeaders
  try {
    const response = await axios.put(`${baseUrl}/create/member`, params, { headers: headers })
    if (response.data.success) {
      callback(response.data, undefined)
    } else {
      callback(undefined, response.data.message)
    }
  } catch (error) {
    callback(undefined, error as string)
  }
}