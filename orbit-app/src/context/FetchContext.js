import React, { createContext, useEffect } from 'react'
import axios from 'axios'

const FetchContext = createContext()
const { Provider } = FetchContext

const FetchProvider = ({ children }) => {
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  })

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await authAxios.get('/csrf-token')
      console.log(data)
      authAxios.defaults.headers['X-CSRF-Token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])

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
