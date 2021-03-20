import React, { useState, createContext } from 'react'
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
  const history = useHistory()

  // should have put these below to useEffect for best practice
  const token = localStorage.getItem('token')
  const userInfo = localStorage.getItem('userInfo')
  const expiresAt = localStorage.getItem('expiresAt')

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  })

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('expiresAt', expiresAt)
    setAuthState({
      token,
      userInfo,
      expiresAt
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('expiresAt')
    setAuthState({
      token: null,
      expiresAt: null,
      userInfo: {}
    })
    history.push('/login')
  }

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false
    }
    return new Date().getTime() / 1000 < authState.expiresAt
  }
  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        logout
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider }
