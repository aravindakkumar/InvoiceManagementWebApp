import { Typography } from "@mui/material";
import React from "react";
function Footer(){
    return(
        <div className="footer">
            <a style={{textDecoration: "none"}} href="https://www.highradius.com/privacy-policy/"><span color="black">Privacy Policy</span></a>
            <Typography> | 	&#169; 2022 HighRadius Corporation. All rights reserved</Typography>
        </div>
    )
}

export default Footer;