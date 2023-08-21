import React, { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import "./styles.module.css"
import dayjs from 'dayjs';
let endOfQ12022 = dayjs(new Date());



export default function DatePicker({startDate,setStartDate,label,future=false,minDate=""}) {
    const [startOfQ12022,setStartOfQ12022]=useState( dayjs('2023-08-03T00:00:00.000'))
    useEffect(()=>{
        if(minDate!=''){
        setStartOfQ12022(dayjs(`${minDate}T00:00:00.000`))
        }
    },[])
  return (
 

   
    <LocalizationProvider   dateAdapter={AdapterDayjs}>
     
      <DateTimePicker 
    minDate={startOfQ12022}
    maxDate={endOfQ12022}
      disableFuture={future}
      ampm={false}
        label={label}
        value={startDate}

        className='stroke-white border-white text-white outline-none hover:border-white'
        onChange={(newValue) => setStartDate(newValue)}
        inputProps={{
          
              color: 'white',
              border:'1px solid white',
              
            
          }}
       
      />
  </LocalizationProvider>

  
  )
}
