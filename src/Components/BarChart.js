import React, { useState } from "react";
import {Bar, Pie} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
// import {data} from "../DATA/data";
;
import { height, width } from "@mui/system";
function BarChart(props){
   const {data,formData} = props; 
//    const formData = {
//     clearDateFrom: "2019-01-22",
//     clearDateTo: "2019-07-24",
//     baseDateFrom: "2019-01-22",
//     baseDateTo: "2019-07-24",
//     dueDateFrom: "2019-01-22",
//     dueDateTo: "2019-07-24",
//     invoice_currency: "USD"
//    }
// && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) || (new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo ) || (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo)
const clearDateFrom = new Date(formData.clearDateFrom);
const clearDateTo = new Date(formData.clearDateTo);
const baseDateFrom = new Date(formData.clearDateFrom);
const baseDateTo = new Date(formData.clearDateTo);
const dueDateFrom = new Date(formData.clearDateFrom);
const dueDateTo = new Date(formData.clearDateTo);
const inv_crn = formData.invoice_currency;

//    const [userData, setUserdata] = useState(data);
   const groups1 = { 
       Unilever: data.filter(person=> person.business_code === 'CA02' && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length,
       JohnsonAndJohnson: data.filter(person=> person.business_code === 'U001' && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length,
       Bose: data.filter(person=> person.business_code === 'U002' && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length,
       Kellogs: data.filter(person=> person.business_code === 'U005' && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length,
       Sony: data.filter(person=> person.business_code === 'U007' && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length,
       Puma: data.filter(person=> person.business_code === 'U013' && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length,
   } 
//    const groups2 = { 
//         Unilever: data.filter(person=> person.business_code === 'CA02'         && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length,
//         JohnsonAndJohnson: data.filter(person=> person.business_code === 'U001' &&(new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length,
//         Bose: data.filter(person=> person.business_code === 'U002'             && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length,
//         Kellogs: data.filter(person=> person.business_code === 'U005'          && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length,
//         Sony: data.filter(person=> person.business_code === 'U007'             && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length,
//         Puma: data.filter(person=> person.business_code === 'U013'             && (new Date(person.clear_date) >= clearDateFrom && new Date(person.clear_date) < clearDateTo) && ((new Date(person.baseline_create_date)  >= baseDateFrom &&  new Date(person.baseline_create_date) < baseDateTo)) && (new Date(person.due_in_date) >= dueDateFrom && new Date(person.due_in_date) < dueDateTo) && person.invoice_currency === inv_crn).length
//    } 
   const group3 = {
       USD: data.filter(person=> person.invoice_currency === "USD").length,
       CAD: data.filter(person=> person.invoice_currency === "CAD").length,
   }
   console.log(group3)
   
    return(
      <>       
      <Bar
               data={{                
                labels: ['Unilever','JohnsonAndJohnson','Bose','Kellogs','Sony','Puma'],
                datasets: [{
                       label: ["Total Number of customers"],
                       data: groups1,
                       backgroundColor: ['pink'],
                       borderWidth: 1
                    },
                    // {
                    //    label: ["Total open amount"],
                    //    data: groups2,
                    //    backgroundColor: ['blue']
                    // }     
                ]
                }}
                height={500}
                width={500}
                options={{
                    maintainAspectRatio: false,
                }}
                
                
            />
            <Pie 
            data={{
                labels: ["USD","CAD"],
                datasets: [{
                    label: ["Invoice Currency"],
                    data: [group3.USD, group3.CAD],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        ],
                    hoverOffset: 4
                }]
            }}
            
            options={{
                    maintainAspectRatio: false,
                }}

            />    
            {/* <h1>Hello</h1> */}
        </>
    )
}

export default BarChart;