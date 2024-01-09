import React, { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useGetUserQuery } from 'state/api'

const Layout = ()=> {

  //boolean which teels if it is non mobile screen or not
  const isNonMobile = useMediaQuery("(min-width:600px)")

  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const userId = useSelector((state)=>state.global.userId)
  const {data}= useGetUserQuery(userId);


  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%" >

      <Sidebar

      user={ data || {} }

      drawerWidth="250px"
      isNonMobile={isNonMobile}
      isSidebarOpen={isSidebarOpen}
      setSidebarOpen={setSidebarOpen}
      />

      {/* Flexgrow so that it occupies all space that is left */}
      <Box flexGrow={1}>
        <Navbar
        user={ data || {} }
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* The purpose of using <Outlet /> is to dynamically render the content associated with the current route within the layout. React Router's <Outlet /> is typically used within nested route structures to handle the rendering of child routes.

      In summary, <Outlet /> is a React Router component that acts as a placeholder for rendering the content of the active route within the layout */}

        <Outlet />
      </Box>

    </Box>
  )
}

export default Layout
