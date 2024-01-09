import React, { useState } from 'react'
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDownwardOutlined,
  ArrowDropDownOutlined
} from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setMode } from 'state'
import FlexBetween from './FlexBetween'
import profileImage from "assets/profile.jpg"

const Navbar = ({user,isSidebarOpen,setSidebarOpen}) => {

  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen=Boolean(anchorEl)


  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",

      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>

        {/*left side Navbar */}
        <FlexBetween>

          <IconButton onClick={() =>{setSidebarOpen(!isSidebarOpen)}}>
            
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1 rem 1.5rem"

          >
            <InputBase placeholder='Search...'></InputBase>
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

      {/* RightSide navbar */}
      <FlexBetween gap="1.5rem">  
        <IconButton onClick={()=>dispatch(setMode())}>
          {theme.palette.mode==='dark'?
        (
          <DarkModeOutlined sx={{fontSize:"25px"}}/>
        )  
        :
        <LightModeOutlined sx={{fontSize:"25px"}}/>
        }
        </IconButton>

        {/* settings button */}
        <IconButton>
          <SettingsOutlined/>
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="45px"
                width="45px"
                borderRadius="50%"
                sx={{ objectFit: "cover", objectPosition: '50% 0%' }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              </Button>
              {/* <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu> */}
          </FlexBetween>

      </FlexBetween>

      </Toolbar>
    </AppBar>

  )
}

export default Navbar
