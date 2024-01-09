import { Dashboard } from "@mui/icons-material";
import { CssBaseline,ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material"
import Layout from "pages/Layout";
//import dashboard my dashboard because we already have a dashboard from mui
import  MyDashboard from "pages/Dashboard";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";

//import pages
import Products from "pages/Products";
import Customers from "pages/Customers";
import Transactions from "pages/Transactions";
import Geography from "pages/Geography";
import Overview from "pages/Overview";
import Daily from "pages/Daily";
import Monthly from "pages/Monthly";
import Breakdown from "pages/Breakdown";
import Admin from "pages/Admin";
import Performance from "pages/Performance";

function App() {
  const mode=useSelector((state)=>state.global.mode)

  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode])

  return (
    <div className="App">
      <BrowserRouter basename="/client">
    
    <ThemeProvider theme={theme}>
      <CssBaseline/>


    {/* <Layout/> */}
      <Routes>

      <Route element={<Layout />}>
        <Route exact path="/" element={< Navigate to="/dashboard" replace />} > </Route>
        <Route exact path="/dashboard" element={<MyDashboard/>} > </Route>
        <Route exact path="/products" element={<Products/>} > </Route>
        <Route exact path="/customers" element={<Customers/>} > </Route>
        <Route exact path="/transactions" element={<Transactions/>} > </Route>
        <Route exact path="/geography" element={<Geography/>} > </Route>
        <Route exact path="/overview" element={<Overview/>} > </Route>
        <Route exact path="/daily" element={<Daily/>} > </Route>
        <Route exact path="/monthly" element={<Monthly/>} > </Route>
        <Route exact path="/breakdown" element={<Breakdown/>} > </Route>
        <Route exact path="/admin" element={<Admin/>} > </Route>
        <Route exact path="/performance" element={<Performance/>} > </Route>

      </Route>
      </Routes>
   

    </ThemeProvider>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
