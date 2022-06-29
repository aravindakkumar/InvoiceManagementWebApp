import React, { useState } from "react";
import {Button,Typography,Alert} from '@mui/material/';

import "./Main.css"
import axios from "axios";

const style3 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 150,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function Delete(props){

    const {onClose, data} = props; // data from checkbox

    const [openAlertTrue, setOpenAlertTrue] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let  arrSelected = data;
        if(arrSelected.length > 0){
            const url = "http://localhost:8080/HIGHRADIUS/del?sl_no=";
            let res = undefined;

            arrSelected.forEach(async(sl_no)=>{
                res = await axios.get(url + sl_no);
                console.log(res.data);
                
            })
             setOpenAlertTrue(true);
             setTimeout(()=> setOpenAlertTrue(false), 4000);
        }
    }

    return (
    <>
        <Typography style={{color: "white", marginBottom: 20}}>Delete Records ?</Typography>
        <Typography style={{color: "white", marginBottom: 20}}>Are you sure you Want to delete this Record(s)???</Typography>

        <div className="buttons">
                <Button style={{color: "white",marginRight: 10}} type="submit" onClick={handleSubmit} variant="outlined" fullWidth>
                    Delete
                </Button>
                <Button style={{color: "white"}} onClick={onClose} variant="outlined" fullWidth>
                        Cancel
                </Button>
            </div>   

        <div style={{margin: 90}}>
                {openAlertTrue && <Alert severity="success">Successfully Deleted</Alert>}
                
           </div>    

            
        
    </>)
}

export default Delete;