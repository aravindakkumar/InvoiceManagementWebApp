import React from "react";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './Main.css'
function Header(){
    return(
        <AppBar position="static" >
            <div >
                 <Toolbar className="header">
                    <img src="https://i.ibb.co/C9XYD8f/logo2.png" alt="logo2" border="0" width={250}/>
                    <img src="https://i.ibb.co/wW2pjTH/logo1.png" alt="logo1" border="0" width={250}/> 
                    <img style={{visibility: "hidden"}} src="https://i.ibb.co/wW2pjTH/logo1.png" alt="logo1" border="0" />       
                </Toolbar>
                <h1 className="header">Invoice List</h1>
            </div>
            
        </AppBar>
    )
}

export default Header;