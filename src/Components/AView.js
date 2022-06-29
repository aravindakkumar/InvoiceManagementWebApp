import React, { useState } from "react";
import { AppBar, TextField,Typography,Toolbar,Button,Paper,Grid,Dialog,Alert} from "@mui/material";

import {Bar} from "react-chartjs-2"
import BarChart from "./BarChart"

const object = {
    clearDateFrom: "",
    clearDateTo: "",
    baseDateFrom: "",
    baseDateTo: "",
    dueDateFrom: "",
    dueDateTo: "",
    invoice_currency : ""
}



function Edit(props){
    const { data,onClose} = props;
    const [person, setPerson] = useState(object);
    const [open, setOpen] = React.useState(false);

    const [openAlertFalse, setOpenAlertFalse] = useState(false)

    
    const handleClickOpen = (e) => {
        e.preventDefault();

        if(person.clearDateFrom, person.clearDateTo, person.baseDateFrom, person.baseDateTo, person.dueDateFrom, person.dueDateTo, person.invoice_currency){
            setOpen(true);
        }
        else{
            setOpenAlertFalse(true);
            setTimeout(()=>{
                setOpenAlertFalse(false)
            }, 4000)
        }
        
  };

    const handleClose = () => {
        setOpen(false);
  };

    
    const handleChange = (e)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setPerson({...person, [name]:value}) //dynamic object ---
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
    }

    return(
        <>
        <Typography style={{color: "white", marginBottom: 20}}>Analytical View</Typography>
        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={6} md={6} >
                    <Typography style={{color: "white", margin: 10}}>Clear date</Typography>
                    <Paper style={{margin: 10, textAlign: "center"}} elevation={0}><TextField style={{width: 247}} type="date" name="clearDateFrom" value={person.clearDateFrom} placeholder="clearDateFrom" onChange={handleChange} id="outlined-basic" label="From" variant="outlined" /></Paper>
                    <Paper style={{margin: 10, textAlign: "center"}} elevation={0}><TextField style={{width: 247}} type="date" name="clearDateTo" value={person.clearDateTo} placeholder="clearDateTo" onChange={handleChange} id="outlined-basic" label="To" variant="outlined" /></Paper>
                    
                    <Typography style={{color: "white", margin: 10}}>Baseline create date</Typography>
                    <Paper style={{margin: 10, textAlign: "center"}}  elevation={0}><TextField style={{width: 247}} type="date" name="baseDateFrom" value={person.baseDateFrom} placeholder="baseDateFrom" onChange={handleChange} id="outlined-basic" label="From" variant="outlined" /></Paper>
                    <Paper style={{margin: 10, textAlign: "center"}} elevation={0}><TextField  style={{width: 247}} type="date" name="baseDateTo" value={person.baseDateTo} placeholder="baseDateTo" onChange={handleChange} id="outlined-basic" label="To" variant="outlined" /></Paper>

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Typography style={{color: "white", margin: 10}}>Due date</Typography>
                    <Paper style={{margin: 10, textAlign: "center"}} elevation={0}><TextField style={{width: 247}} type="date" name="dueDateFrom" value={person.dueDateFrom} placeholder="dueDateFrom" onChange={handleChange} id="outlined-basic" label="From" variant="outlined" /></Paper>
                    <Paper style={{margin: 10, textAlign: "center"}} elevation={0}><TextField style={{width: 247}} type="date" name="dueDateTo" value={person.dueDateTo} placeholder="dueDateTo" onChange={handleChange} id="outlined-basic" label="To" variant="outlined" /></Paper>

                   <Typography style={{color: "white", margin: 10}}>Invoice Currency</Typography>
                    <Paper style={{margin: 10, textAlign: "center"}} elevation={0}><TextField style={{width: 247}} type="text" name="invoice_currency" value={person.invoice_currency} placeholder="invoice_currency" onChange={handleChange} id="outlined-basic" label="invoice_currency" variant="outlined" /></Paper>                
                </Grid>
                 </Grid>


            <div className="buttons">
                    <Button style={{margin: 10, color: "white"}} onClick={handleClickOpen} type="submit" variant="outlined"  fullWidth>
                    View
                    </Button>
                    <Dialog fullScreen open={open} onClose={handleClose}>
                       
                        <AppBar sx={{position: 'relative'}}>
                            <Toolbar>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">ANALYTICAL VIEW</Typography>
                                <Button onClick={handleClose}><Typography style={{color:"white"}}>Close</Typography></Button>
                                
                            </Toolbar>
                        </AppBar>

                        <BarChart formData={person} data={data}/>

                    </Dialog>
                    <Button style={{margin: 10, color: "white"}} onClick={onClose} variant="outlined" fullWidth>
                    Cancel
                    </Button>
                </div>
        </form>
            <div style={{margin: 30}}>
                {openAlertFalse && <Alert severity="warning">Enter All Values</Alert>}
           </div>
        
        </>
    )
}

export default Edit;