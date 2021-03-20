import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import './App.css'
import AppShell from './AppShell'
import { AuthContext, AuthProvider } from './context/AuthContext'
import { FetchProvider } from './context/FetchContext'
import Account from './pages/Account'
import Dashboard from './pages/Dashboard'
import FourOFour from './pages/FourOFour'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import Users from './pages/Users'

const AuthenticatedRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={() =>
        authContext.isAuthenticated() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to='/' />
        )
      }
    />
  )
}

const AdminRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={() =>
        authContext.isAuthenticated() && authContext.isAdmin() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to='/' />
        )
      }
    />
  )
}

const AppRoutes = () => {
  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
      <AuthenticatedRoute path='/dashboard'>
        <Dashboard />
      </AuthenticatedRoute>
      <AdminRoute path='/inventory'>
        <Inventory />
      </AdminRoute>
      <AuthenticatedRoute path='/account'>
        <Account />
      </AuthenticatedRoute>
      <AuthenticatedRoute path='/settings'>
        <Settings />
      </AuthenticatedRoute>
      <AdminRoute path='/users'>
        <Users />
      </AdminRoute>
      <Route path='*'>
        <FourOFour />
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div className='bg-gray-100'>
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
