import React, { useEffect, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  ChevronLeft,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  PieChartOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  ChevronRightOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Client Facing",
      icon: null,
    },
    {
      text: "Products",
      icon: <ShoppingCartOutlined />,
    },
    {
      text: "Customers",
      icon: <Groups2Outlined />,
    },
    {
      text: "Transactions",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "Geography",
      icon: <PublicOutlined />,
    },
    {
      text: "Sales",
      icon: null,
    },
    {
      text: "Overview",
      icon: <PointOfSaleOutlined />,
    },
    {
      text: "Daily",
      icon: <TodayOutlined />,
    },
    {
      text: "Monthly",
      icon: <CalendarMonthOutlined />,
    },
    {
      text: "Breakdown",
      icon: <PieChartOutlined />,
    },
    {
      text: "Management",
      icon: null,
    },
    {
      text: "Admin",
      icon: <AdminPanelSettingsOutlined />,
    },
    {
      text: "Performance",
      icon: <TrendingUpOutlined />,
    },
  ];

const Sidebar = ({user,drawerWidth,isNonMobile,isSidebarOpen,setSidebarOpen}) => {

    const{pathname}=useLocation();
    const [active,setActive]=useState("")
    const navigate=useNavigate();
    const theme =useTheme()

    const mode=useSelector((state)=>state.global.mode)

    useEffect(()=>{
        setActive(pathname.substring(1))
    },[pathname])

  return (
    <Box component="nav" >
      {isSidebarOpen &&(
        <Drawer 
        open={isSidebarOpen}
        onClose={()=>setSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        
        sx={{
         
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              // overflowY:"auto",
              // overflowX: 'hidden',
              // // scrollbarWidth: 'thin', // for Firefox
              '::-webkit-scrollbar': {
                width: '7px',
              },
              '::-webkit-scrollbar-thumb': {
                backgroundColor: 
                // mode==='dark'?
                // theme.palette.grey[100]:
                theme.palette.secondary[300],
              }, 
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent", // Set the background color of the track to be transparent
              },
              // alignItems: 'stretch',
              // height: '100%', // Ensure the Drawer takes full height
              // // scrollTop to start content at the top
              scrollTop: 0,
            },
          }}
        >
        <Box width="100%">
          {/* margin top right bottom left */}
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignContent="center" gap="0.5rem">
                    <Typography variant="h4" fontWeight="bold" >
                        ECOMVISION
                    </Typography>
                </Box>

                {!isNonMobile && (
                    <IconButton  onClick={()=>{setSidebarOpen(!isSidebarOpen) }}>
                        <ChevronLeft/>
                    </IconButton>
                )}
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({text,icon})=>{
                if(!icon){
                    return(
                        <Typography key={text} sx={{m:"2.25rem 0 1rem 3rem"}} >
                            {text}
                            </Typography>
                    )
                }
            const lcText=text.toLowerCase()

            return(
                <ListItem key={text} disablePadding>
                    <ListItemButton onClick={()=>{
                        navigate(`/${lcText}`)
                        setActive(lcText)
                    }}
                        sx={{
                            backgroundColor : active===lcText?
                            theme.palette.secondary[300]:
                            "transparent",
                            color:active===lcText?
                            theme.palette.primary[600]:
                            theme.palette.secondary[100]
                        }}
                         >

                        <ListItemIcon
                        sx={{
                            ml:"2rem",
                            color: 
                            active===lcText?
                            theme.palette.primary[600]:
                            theme.palette.secondary[200]
                        }}
                        >
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                        {active=== lcText && (
                            <ChevronRightOutlined sx={{
                                ml:"auto",
                            }}/>
                        ) }
                </ListItemButton>
                </ListItem>
            )
            })}

          </List>
          </Box>

          <Box
          // position="absolute"
          marginTop="2.5rem"

          marginBottom="1rem"
          >
            <Divider/>
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">

              {/* img component needs to be self closing */}
              <Box
              component="img"
              alt="profile"
              src={profileImage}
              height="45px"
              width="45px"
              borderRadius="50%"
              sx={{
                objectFit:"cover",
                objectPosition: '50% 0%'
              }}
              />
                
              <Box
              textAlign="left">
              <Typography
              fontWeight="bold"
              fontSize="0.9rem"
              sx={{color:theme.palette.secondary[100]}}
              >
                {user.name}
              </Typography>

              <Typography
           
              fontSize="0.9rem"
              sx={{color:theme.palette.secondary[200]}}
              >
                {user.occupation}
              </Typography>


           

              </Box>
              <SettingsOutlined
              sx={{color:theme.palette.secondary[300] , fontSize:"25px"}}
              />
              </FlexBetween>

          </Box>
            </Drawer>
      )}
    </Box>
  )
}

export default Sidebar
