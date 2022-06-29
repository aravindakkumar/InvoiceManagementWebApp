import React, { useState } from "react";
import { TextField,Typography,Alert,Button,Paper,Grid } from "@mui/material";

import axios from "axios";



const object = {
    invoice_currency: "",
    cust_payment_terms: "",
}



function Edit(props){
    const {data, onClose} = props;
    const [person, setPerson] = useState(object);

    const [openAlertTrue, setOpenAlertTrue] = useState(false)
    const [openAlertFalse, setOpenAlertFalse] = useState(false)
    const[openAlertError, setOpenAlertError] = useState(false);
    
    const handleChange = (e)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setPerson({...person, [name]:value}) //dynamic object ---
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const sl_no = data[0];
        const invoice_currency = person.invoice_currency;
        const cust_payment_terms = person.cust_payment_terms;

        const url = "http://localhost:8080/HIGHRADIUS/edit?sl_no="+sl_no+"&invoice_currency="+invoice_currency+"&cust_payment_terms="+cust_payment_terms;
        // const response = await fetch(url);
        if(sl_no,invoice_currency,cust_payment_terms){
            const response = await axios.get(url).catch(()=>{
                setOpenAlertError(true);
                setTimeout(()=>{
                    setOpenAlertError(false)
                }, 4000)
            })
            console.log(response.data)
            
            if(response.data === 1){
               setOpenAlertTrue(true);
            setPerson(object);  

            setTimeout(()=> setOpenAlertTrue(false), 4000) 
            }
            
        }
        else{
           setOpenAlertFalse(true);   
            setTimeout(()=> setOpenAlertFalse(false), 4000)
        }
          
        
    }

    return(
        <>
        <Typography style={{color: "white"}}>Edit</Typography>
        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={6} md={6} >
                    <Paper style={{marginTop: 20, marginRight: 10}} elevation={0}><TextField type="text" name="invoice_currency" value={person.invoice_currency} placeholder="invoice_currency" onChange={handleChange} id="outlined-basic" label="invoice_currency" variant="outlined" /></Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper style={{marginTop: 20}} elevation={0}><TextField type="text" name="cust_payment_terms" value={person.cust_payment_terms} placeholder="cust_payment_terms" onChange={handleChange} id="outlined-basic" label="cust_payment_terms" variant="outlined" /></Paper></Grid>
                 </Grid>


            <div className="buttons">
                    <Button type="submit" style={{marginTop: 30,marginRight: 10, color: "white"}} variant="outlined"  fullWidth>
                    Edit
                    </Button>
                    <Button style={{color: "white",marginTop: 30}} onClick={onClose} variant="outlined" fullWidth>
                    Cancel
                    </Button>
                </div>
        </form>
        <div style={{margin: 30}}>
                {openAlertTrue && <Alert severity="success">Successfully Added</Alert>}
                {openAlertFalse && <Alert severity="warning">Enter All Values</Alert>}
                {openAlertError && <Alert severity="error">Please Enter Correct Values</Alert>}
           </div>
        </>
    )
}

export default Edit;