//for fetch
import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
// for header
import {Toolbar,AppBar,Button,ButtonGroup,TextField,Typography,Box,Modal,Alert} from '@mui/material/'

import Add from './Add'
import Delete from './Delete'
import Edit from './Edit'
import ASearch from './ASearch'
import AView from "./AView";
import './Main.css'
import axios from "axios";

import ReplayIcon from '@mui/icons-material/Replay';


const styleAdd = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1300,
    height: 450,
    bgcolor: 'rgb(40, 61, 74, 255)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5

};

const styleEdit = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 250,
    bgcolor: 'rgb(40, 61, 74, 255)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5
};

const styleDel = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 460,
    height: 200,
    bgcolor: 'rgb(40, 61, 74, 255)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleAsearch = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 510,
    height: 320,
    bgcolor: 'rgb(40, 61, 74, 255)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleAView = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 500,
    bgcolor: 'rgb(40, 61, 74, 255)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

 function Fetch(){
//////////////////////////////////////////////////////////////////////Main CODE BELOW/////////////////////////////////////////////////////////////////////////////

    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDel, setOpenDel] = React.useState(false);
    const handleOpenDel = () => setOpenDel(true);
    const handleCloseDel = () => setOpenDel(false); 

    const [openASer, setOpenASer] = React.useState(false);
    const handleOpenAser = () => setOpenASer(true);
    const handleCloseAser = () => setOpenASer(false); 

    const [openView, setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false); 
   
   //////////////////////////////////////////////////////////////////////FETCH CODE BELOW/////////////////////////////////////////////////////////////////////////////
    const [reload, setReload] = useState(false) // reload
    const [pageSize, setPageSize] = React.useState(5); // rows per page selection
    const [arrIds, setArrIds] = useState([]); // selection from checkbox
    const [people, setPeople] = useState([]); // actual data
    const [searchData, setSearchData] = useState(""); // search -------> search using cust_number
    // const [aSearch, setASearch] = useState({}); // data from advanced search
    const [columns, setColumns] = useState([  // data column name
        {field: "sl_no", label: "sl_no"},
        {field: "business_code", label: "business_code"},
        {field: "cust_number", label: "cust_number"},
        {field: "clear_date", label: "clear_date"},
        {field: "business_year", label: "business_year"},
        {field: "doc_id", label: "doc_id"},
        {field: "posting_date", label: "posting_date"},
        {field: "document_create_date", label: "document_create_date"},
        {field: "document_create_date1", label: "document_create_date1"},
        {field: "due_in_date", label: "due_in_date"},
        {field: "invoice_currency", label: "invoice_currency"},
        {field: "document_type", label: "document_type"},
        {field: "posting_id", label: "posting_id"},
        {field: "area_business", label: "area_business"},
        {field: "total_open_amount", label: "total_open_amount"},
        {field: "baseline_create_date", label: "baseline_create_date"},
        {field: "cust_payment_terms", label: "cust_payment_terms"},
        {field: "invoice_id", label: "invoice_id"},
        {field: "isOpen", label: "isOpen"},
        {field: "aging_bucket", label: "aging_bucket"},
        {field: "is_deleted", label: "is_deleted"},
        ])
        
        const [disabledDelete, setDisabledDelete] = useState(true); //disable delete
        const [disabledEdit, setDisabledEdit] = useState(true); // disable for edit
        const [disabledPredict, setDisabledPredict] = useState(true); // disable for edit

        const [selectedRows,setSelectedRows] = useState("") // for predict -- comes as a object that has doc_id   
        const [predicted, setPredicted] = useState([]); // store predicted aging bucket

        const [openAlert, setOpenAlert]= useState(false);

    const fetchData = async()=>{
        const response = await fetch("http://localhost:8080/HIGHRADIUS/fetch");
        const main_data = await response.json();
        setPeople(main_data);
    }

   useEffect(()=>{
        fetchData()
        setSearchData("");
        
    },[reload]) // for crud and fetch whole


    function search(rows){ 
        return rows.filter((row)=>{
            if(searchData === ""){
                return row;
            }
            else if(row.cust_number.indexOf(searchData) > -1){
                return row;
            }
        })
    }

    const Predict = async (e)=>{
        e.preventDefault();
        let url = undefined;
        let summa = undefined;
        // console.log(selectedRows)
        selectedRows.map(async(row)=>{
            summa = row.doc_id;
            await axios.post("http://127.0.0.1:5000/get_prediction",{
            data : [parseInt(row.doc_id)]
            }).then(async (res)=> {
                if(res.data[0] == undefined){
                   // DO NOTHING
                }
                else {
                    url = "http://localhost:8080/HIGHRADIUS/predict?doc_id=" + parseInt(res.data[0].doc_id) + "&aging_bucket=" + res.data[0].aging_bucket;
                    await axios.get(url);
                }
            }).then(()=> {
                
            })
        })  
        setOpenAlert(true);
                setTimeout(()=>{
                    setOpenAlert(false)
                }, 4000)        
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return(
       <>
    <div>
            <AppBar position="static" >
                <Toolbar className="sec1">
                    <div id="btnPredict">
                         <ButtonGroup size="large">
                           <Button disabled={disabledPredict} onClick={Predict} className="color"  variant="outlined" style={{backgroundColor: "rgb(40, 61, 74, 255)", color: "white"}}><Typography >Predict</Typography></Button>
                           
                           
                            <Button onClick={handleOpenView} variant="outlined" style={{backgroundColor: "rgb(40, 61, 74, 255)", color: "white"}}><Typography >Analytical view</Typography></Button>
                            <Modal open={openView} onClose={handleCloseView}>
                                <Box sx={styleAView}>
                                    <AView onClose={handleCloseView } data={people}/>                                   
                                </Box>
                            </Modal>


                           <Button onClick={handleOpenAser} variant="outlined" style={{backgroundColor: "rgb(40, 61, 74, 255)", color: "white"}}><Typography >ADVANCE SEARCH</Typography></Button>
                            <Modal open={openASer} onClose={handleCloseAser}>
                                <Box sx={styleAsearch}>
                                    <ASearch onClose={handleCloseAser} onAdvance={obj=> setPeople([obj])}/>
                                   
                                </Box>
                            </Modal>

                           <Button style={{backgroundColor: "rgb(40, 61, 74, 255)", color: "white"}} onClick={()=>setReload(!reload)} variant="outlined"><ReplayIcon /></Button>    
                        </ButtonGroup>
                    </div>

                    <div id="search">
                         <TextField style={{backgroundColor: "white", borderRadius: 8}}  variant="outlined" id="searchData" label="Search Customer Id" type="search" 
                           value={searchData} onChange={(e)=> {
                                setSearchData(e.target.value);                                
                            }}
                         />
                    </div>

                    <div className="btn crud">
                        <ButtonGroup size="large">
                            
                            <Button onClick={handleOpenAdd} style={{backgroundColor: "rgb(40, 61, 74, 255)", color: "white"}} variant="outlined">Add</Button>
                            <Modal open={openAdd} onClose={handleCloseAdd}>
                                <Box sx={styleAdd}>
                                    <Add onClose={handleCloseAdd}/>
                                </Box>
                            </Modal>
                                
                         

                           <Button style={{backgroundColor: "rgb(40, 61, 74, 255)", color: "white"}} disabled={disabledEdit} onClick={handleOpenEdit} variant="outlined">Edit</Button>
                           <Modal  open={openEdit} onClose={handleCloseEdit}>
                               <Box sx={styleEdit}>
                                    <Edit data={arrIds} onClose={handleCloseEdit}/>
                               </Box>
                           </Modal>
                          
                            <Button style={{backgroundColor: "rgb(40, 61, 74, 255)", color: "white"}} disabled={disabledDelete} onClick={handleOpenDel} variant="outlined">DELETE</Button>
                            <Modal open={openDel} onClose={handleCloseDel}>
                                <Box sx={styleDel}>
                                    <Delete onClose={handleCloseDel} data={arrIds}/>
                                </Box>
                            </Modal>
                           
                        </ButtonGroup>
                    </div>
                </Toolbar>
        </AppBar>
        </div>
        {openAlert && <Alert severity="success">Prediction Done!!!</Alert>}

       {/* *********************************************************FETCH DATA BELOW************************************************** */}
       <div className="fetch">
        <div style={{ height: 390, width: '100%' }}>
        <DataGrid 
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination         
            
            getRowId={(people)=>{
               return people.sl_no
            }}
            rows={search(people)}
            columns={columns}

            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(ids)=>{
                setArrIds(ids);
                console.log(ids);
//////////////////////////////////////////////////////////
                if(ids.length > 0){ // for delete
                    setDisabledDelete(false);
                }
                else{
                    setDisabledDelete(true);
                }
//////////////////////////////////////////////////////////////
                if(ids.length === 1){ // for update
                    setDisabledEdit(false);
                }
                else{
                    setDisabledEdit(true);
                }
/////////////////////////////////////////////////////////////
                if(ids.length > 0){ // for predict
                    setDisabledPredict(false);
                }
                else{
                    setDisabledPredict(true);
                }
/////////////////////////////////////////////////////////////


                const selectedIDs = new Set(ids);
                const selectedRows = people.filter((row) =>
                    selectedIDs.has(row.sl_no),
                );

                setSelectedRows(selectedRows);
            }
        }
            style={{color: "white", borderColor: "#283d4a"}}
        />
        </div>
       </div>
       </>

      
    )
}
export default Fetch;

