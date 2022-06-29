import React, { useState } from "react";
import axios from "axios";
import { TextField,Typography,Paper ,Grid,Button,Alert} from "@mui/material";

import "./Main.css"
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1300,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const object = {
        business_code: "",
        cust_number: "",
        clear_date: "01/02/202",
        buisness_year: "",
        doc_id: "",
        posting_date: "",
        document_create_date: "",
        due_in_date: "",
        invoice_currency: "",
        document_type: "",
        posting_id: "",
        total_open_amount: "",
        baseline_create_date: "",
        cust_payment_terms: "",
        invoice_id: "",
}

function Add(props){
    const {onClose} = props;
    const [person, setPerson] = useState(object); 

    const [openAlertTrue, setOpenAlertTrue] = useState(false)
    const [openAlertFalse, setOpenAlertFalse] = useState(false)
    const[openAlertError, setOpenAlertError] = useState(false);

    const handleChange = (e)=>{ 
        const newData = {...person};
        newData[e.target.name] =  e.target.value;     
        setPerson(newData);
    }
  
  const handleSubmit = async(e)=>{
        const {business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id} = person;
        const url = "http://localhost:8080/HIGHRADIUS/add?business_code="+business_code+"&cust_number="+cust_number+"&clear_date="+clear_date+"&buisness_year="+buisness_year+"&doc_id="+doc_id+"&posting_date="+posting_date+"&document_create_date="+document_create_date+"&due_in_date="+due_in_date+"&invoice_currency="+invoice_currency+"&document_type="+document_type+"&posting_id="+posting_id+"&total_open_amount="+total_open_amount+"&baseline_create_date="+baseline_create_date+"&cust_payment_terms="+cust_payment_terms+"&invoice_id="+invoice_id;
        e.preventDefault();

        if(business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id){
            const response = await axios.get(url).catch(()=> {
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
                                    
    return (
        <>
        <div >
            <form onSubmit={handleSubmit}>
                <Typography style={{color: "white"}}>Add</Typography>
                <Grid container >
                    <Grid item xs={12} sm={4} md={3} >
                        <Paper elevation={0} style={{margin: 20, textAlign: "center"}}><TextField style={{width: 270}} type="text" name="business_code" value={person.business_code} placeholder="business_code" onChange={handleChange} id="outlined-basic" label="business_code" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20, textAlign: "center"}}><TextField style={{width: 270}} type="text" name="cust_number" value={person.cust_number} placeholder="cust_number" onChange={handleChange} id="outlined-basic" label="cust_number" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20, textAlign: "center"}}><TextField style={{width: 270}} type="date" name="clear_date" value={person.clear_date} placeholder="clear_date" onChange={handleChange} id="outlined-basic" label="clear_date" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20, textAlign: "center"}}><TextField style={{width: 270}} type="text" name="buisness_year" value={person.buisness_year} placeholder="buisness_year" onChange={handleChange} id="outlined-basic" label="buisness_year" variant="outlined" /></Paper>
                    </Grid>

                    <Grid item xs={12} sm={4} md={3} >
                        <Paper elevation={0} style={{margin: 20, textAlign: "center"}}><TextField style={{width: 270}} type="text" name="doc_id" value={person.doc_id} placeholder="doc_id" onChange={handleChange} id="outlined-basic" label="doc_id" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20, textAlign: "center"}}><TextField style={{width: 270}} type="date" name="posting_date" value={person.posting_date} placeholder="posting_date" onChange={handleChange} id="outlined-basic" label="posting_date" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20, textAlign: "center"}}><TextField style={{width: 270}} type="date" name="document_create_date" value={person.document_create_date} placeholder="document_create_date" onChange={handleChange} id="outlined-basic" label="document_create_date" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20, textAlign: "center"}}><TextField style={{width: 270}} type="date" name="due_in_date" value={person.due_in_date} placeholder="due_in_date" onChange={handleChange} id="outlined-basic" label="due_in_date" variant="outlined" /></Paper>
                    </Grid>

                    <Grid item xs={12} sm={4} md={3} >
                        <Paper elevation={0} style={{margin: 20,textAlign: "center"}}><TextField style={{width: 270}} type="" name="invoice_currency" value={person.invoice_currency} placeholder="invoice_currency" onChange={handleChange} id="outlined-basic" label="invoice_currency" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20,textAlign: "center"}}><TextField style={{width: 270}} type="" name="document_type" value={person.document_type}  placeholder="document_type" onChange={handleChange} id="outlined-basic" label="document_type" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20,textAlign: "center"}}><TextField style={{width: 270}} type="" name="posting_id" value={person.posting_id} placeholder="posting_id" onChange={handleChange} id="outlined-basic" label="posting_id" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20,textAlign: "center"}}><TextField style={{width: 270}} type="" name="total_open_amount" value={person.total_open_amount} placeholder="total_open_amount" onChange={handleChange} id="outlined-basic" label="total_open_amount" variant="outlined" /></Paper>
                    </Grid>

                    <Grid item xs={12} sm={4} md={3}>
                        <Paper elevation={0} style={{margin: 20,textAlign: "center"}}><TextField style={{width: 270}} type="date" name="baseline_create_date" value={person.baseline_create_date} placeholder="baseline_create_date" onChange={handleChange} id="outlined-basic" label="baseline_create_date" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20,textAlign: "center"}}><TextField style={{width: 270}} type="text" name="cust_payment_terms" value={person.cust_payment_terms} placeholder="cust_payment_terms" onChange={handleChange} id="outlined-basic" label="cust_payment_terms" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20,textAlign: "center"}}><TextField style={{width: 270}} type="text" name="invoice_id" value={person.invoice_id} placeholder="invoice_id" onChange={handleChange} id="outlined-basic" label="invoice_id" variant="outlined" /></Paper>
                        <Paper elevation={0} style={{margin: 20,textAlign: "center"}}></Paper>
                    </Grid>

                  
                </Grid>

                <div className="buttons">
                    <Button style={{marginRight: 10, color: "white"}} type="submit" variant="outlined"  fullWidth>
                    Add
                    </Button>                    
                    
                    <Button style={{color: "white"}} onClick={onClose} variant="outlined"  fullWidth>
                    Cancel
                    </Button>
                </div>
                
            </form>
           
           </div> 
           <div style={{margin: 30}}>
                {openAlertTrue && <Alert severity="success">Successfully Added</Alert>}
                {openAlertFalse && <Alert severity="warning">Enter All Values</Alert>}
                {openAlertError && <Alert severity="error">Please Enter Correct Values</Alert>}
           </div>
        </>
    )
    }

export default Add;