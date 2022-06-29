import React, { useState } from "react";
import {Button,TextField, Typography,Paper,Grid,Alert} from '@mui/material';
import axios from "axios";

const object = {
    doc_id: "",
    invoice_id: "",
    cust_number: "",
    buisness_year: ""
}


function ASearch(props){
    const {onClose,onAdvance} = props;
    const [person, setPerson] = useState(object);

    const [openAlertTrue, setOpenAlertTrue] = useState(false)
    const [openAlertFalse, setOpenAlertFalse] = useState(false)
    const[openAlertError, setOpenAlertError] = useState(false);


    const handleChange = (e)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setPerson({...person, [name]:value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const doc_id = person.doc_id;
        const invoice_id = person.invoice_id;
        const cust_number = person.cust_number;
        const buisness_year = person.buisness_year;

        if(doc_id,invoice_id,cust_number,buisness_year){
           const url = "http://localhost:8080/HIGHRADIUS/aser?doc="+doc_id+"&invoice="+invoice_id+"&cust="+cust_number+"&buisness="+buisness_year;
        const response = await axios.get(url);
        const main_data = await response.data;
            if(main_data.sl_no === undefined){
                setOpenAlertError(true)
                setTimeout(()=>{
                    setOpenAlertError(false)
                }, 4000)
            }
            else{
                onAdvance(main_data);
                setOpenAlertTrue(true);
                setPerson(object); 
                 onClose();
            }
        
        }   
        else{
            setOpenAlertFalse(true)
            setTimeout(()=>{
                setOpenAlertFalse(false)
               
            }, 3000)
        }     
        // onClose();
    }

    return (
        <>
        <Typography style={{marginBottom: 30, color: "white"}}>Advance Search</Typography>
        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Paper style={{marginRight: 10, marginBottom: 30}} elevation={0}><TextField type="text" name="doc_id" value={person.doc_id} placeholder="doc_id" onChange={handleChange} id="outlined-basic" label="doc_id" variant="outlined" /></Paper>
                    <Paper style={{marginRight: 10, marginBottom: 30}} elevation={0}><TextField type="text" name="cust_number" value={person.cust_number} placeholder="cust_number" onChange={handleChange} id="outlined-basic" label="cust_number" variant="outlined" /></Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={{marginLeft: 10, marginBottom: 30}} elevation={0}><TextField type="text" name="invoice_id" value={person.invoice_id} placeholder="invoice_id" onChange={handleChange} id="outlined-basic" label="invoice_id" variant="outlined" /></Paper>
                    <Paper style={{marginLeft: 10, marginBottom: 30}} elevation={0}><TextField type="text" name="buisness_year" value={person.buisness_year} placeholder="buisness_year" onChange={handleChange} id="outlined-basic" label="buisness_year" variant="outlined" /></Paper>
            </Grid>
            </Grid>
            

            <div className="buttons">
                    <Button style={{marginRight: 10, color: "white"}} type="submit" variant="outlined"  fullWidth>
                    Search
                    </Button>
                    <Button style={{color: "white"}}  onClick={onClose} variant="outlined" fullWidth>
                    Cancel
                    </Button>
                </div>
        </form>

        <div style={{margin: 30}}>
                {openAlertTrue && <Alert severity="success">Search Successfull</Alert>}
                {openAlertFalse && <Alert severity="warning">Enter All Values</Alert>}
                {openAlertError && <Alert severity="error">Please Enter Correct Values</Alert>}
           </div>
        
        </>
    )
}

export default ASearch;