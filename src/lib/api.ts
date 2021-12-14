import axios from 'axios'
import { CreateUser, UserResponse } from '@/lib/types'
import { User } from '@prisma/client'

export const getUsers = async (): Promise<User[] | string> => {
  try {
    const { data } = await axios.get('/api/users')
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error?.response?.data?.error?.message || error?.response?.data?.error?.name || 'An error has occurred'
    }
    return 'An error has occurred'
  }
}

export const createUser = async (userData: CreateUser): Promise<UserResponse | string> => {
  try {
    const { data } = await axios.post('/api/users', userData)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error?.response?.data?.error?.message || error?.response?.data?.error?.name || 'An error has occurred'
    }
    return 'An error has occurred'
  }
}

export const deleteUser = async (userId: number): Promise<UserResponse | string> => {
  try {
    const { data } = await axios.delete('/api/users/' + userId)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error?.response?.data?.error?.message || error?.response?.data?.error?.name || 'An error has occurred'
    }
    return 'An error has occurred'
  }
}