
import axios, { AxiosRequestHeaders } from 'axios'
import { User } from '../services/user';

interface Callback {
(data: User | undefined, err: Error | string | undefined): void
}

interface updateProfile {
  username?: string,
  age?: number,
  gender?: string,
  email?: string,
  address?: string,
  contactNumber?: number
}

const baseUrl = 'http://localhost:5000/users'

export const loadToken = () => {
  const token = localStorage.getItem('id token')
  return token
}
  
export const updateProfile = async (id: string, params: updateProfile, callback: Callback) => {
  const token = loadToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token,
  } as AxiosRequestHeaders
  try {
    const response = await axios.put(`${baseUrl}/update/${id}`, params, { headers: headers })
    if (response.data) {
      callback(response.data, undefined)
    }
  } catch (error) {
    callback(undefined, 'Cannot find the user')
  }
}