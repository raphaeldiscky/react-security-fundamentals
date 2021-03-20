import React, { createContext, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext'

const FetchContext = createContext()
const { Provider } = FetchContext

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext)
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  })

  authAxios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.baseURL)
      const allowedOrigins = [process.env.REACT_APP_URL]
      if (allowedOrigins.includes(origin)) {
        config.headers.Authorization = `Bearer ${authContext.authState.token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return (
    <Provider
      value={{
        authAxios
      }}
    >
      {children}
    </Provider>
  )
}

export { FetchContext, FetchProvider }
