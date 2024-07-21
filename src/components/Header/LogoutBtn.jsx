import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'


const LogoutBtn = () => {

  const dispatch = useDispatch()
  const [loggedOut, setLoggedOut] = useState(false) // State to handle navigation

  const logoutHandler = () => {
      authService.logout().then(() => {
          dispatch(logout());
          setLoggedOut(true); // Set the state to true to trigger navigation
      })
  }

  if (loggedOut) {
      return <Navigate to="/" /> // Navigate to home page
  }
  
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn
