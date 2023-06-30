
import axios, { AxiosRequestHeaders } from 'axios'
import { User } from '../services/user';
import { GET_RECORDS } from '../constant/auth-api';

interface Callback {
(data: User | undefined, err: Error | string | undefined): void
}

export interface IRecord {
  userId: string,
  recordId: string,
  date_record: Date,
  video: string,
  vaw: string,
  tem: number,
  spo2: number,
  bpm: number,
  ecg: Array<number>,
  note: string,
}


export const loadToken = () => {
  const token = localStorage.getItem('id token')
  return token
}
  
export const getRecords = async (callback: (data: IRecord[] | null, error: Error | null) => void) => {
  const token = loadToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token,
  } as AxiosRequestHeaders
  try {
    const response = await axios.get(GET_RECORDS, { headers: headers })
    if (response.data.success) {
      callback(response.data.records, null)
    } else {
      callback(null, response.data.message)
    }
  } catch (error: any) {
    callback(null, error)
  }
}
