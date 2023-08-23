import { Alert, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AlertInfo from '../AlertInfo/AlertInfo';
import isIPAddress from '../../tools/tools';
import DatePicker from '../DatePicker/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import ButtomCustom from '../ButtomCustom/ButtomCustom';
import LoaderData from '../loaderData/LoaderData';
import ListComponent from '../ListComponent/ListComponent';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Mapping() {
  const navigate=useNavigate()

  const [loading, setLoading] = React.useState(false);

  const [ipValue,setIpValue]=useState('188.191.238.1');
  const [alertInfo,setAlertInfo]=useState('');
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [minDate,setMinDate]=useState('');
  const [checkIpWhite,setCheckIpWhite]=useState(false)
  const [checkIpBiling,setCheckIpBiling]=useState(false)
  const [white_ip_id,setWhite_ip_id]=useState(1)
  const [abons,setAbons]=useState([])
  async function handleDownloadDate() {
    setLoading(true)
      try {
        const response = await axios.post('http://194.8.147.150:3010/download',{abons:abons,ip:ipValue}, {
          responseType: 'blob',
        });
        setLoading(false)
  
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'abons.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Видалити елемент після завантаження
      } catch (error) {
        console.error('Error downloading file:', error);
      }
      
    }
  async function fetchTables() {
    try {
       let resp=await axios.get("http://194.8.147.150:3010/showTable")
       let data=resp.data[0]
       setMinDate(data.replace(/_/g, "-"))
    } catch (error) {
      
    }
   
    
  }
useEffect(()=>{
  const cookieData = Cookies.get('login');
  if (!cookieData) {
    navigate("/login")
 
  }
  fetchTables()

},[])

  const handleIpValue=(e)=>{
    setIpValue(e.target.value)
    setCheckIpBiling(false)
  }

 const handleFind=async(e)=>{
  setCheckIpWhite(false)
  setCheckIpBiling(false)
  setAbons([])
if(!isIPAddress(ipValue)){
  setAlertInfo("Невірний формат ip адреси")
  setOpen(true)
  return
}
 let resp=await axios.get(`http://194.8.147.150:3010/check-white-ip?white_ip=${ipValue}`)
 let data=resp.data
 console.log(data);
 if(data.length==0){
  setAlertInfo("В таблиці ip_white не знайдено IP")
  setOpen(true)
  setCheckIpBiling(true)
  return
 }else{
  //якщо є ip у ip_white
  setAlertInfo("Виберіть період який вас цікавить")
  setOpen(true)
  setWhite_ip_id(data[0].id)
  setCheckIpWhite(true)

 }

  }


  const handleGetListOfUser=async()=>{
    //отримати список сірих ip залежно від періоду, вибраного , далі по них знайти користувача із білінгу 
    try {
      
    setLoading(true)
    let resp=await axios(`http://194.8.147.150:3010/checkIpByDate?startDate=${startDate}&endDate=${endDate}&id=${white_ip_id}`)
    let data=resp.data
    setLoading(false)
    console.log(data);
     setAbons(data)
    if(data.length==0){
      setAlertInfo("В цей час не було користування IP")
      setOpen(true) 
      setWhite_ip_id(1)
      setIpValue('')
      setCheckIpWhite(false)
      setCheckIpBiling(false)
    }} catch (error) {
      
    }
    finally{
      setLoading(false)
    }

  }
const handleFindInBiling= async()=>{
   //188.191.239.243

   try {
    setLoading(true)
    let reaponse=await axios.get(`http://194.8.147.150:3010/find_ip_biling?ip=${ipValue}`);
    const data=reaponse.data
    setLoading(false)
    setAbons(data)
    console.log(data);
   } catch (error) {
    console.log(error);
   }
   finally{
setLoading(false)
   }
   


}
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <div className='max-w-[1250px]  m-auto'>
       {
        loading&& <LoaderData/>
      }
       <div className='max-w-[750px] border border-white rounded-xl mx-auto p-8 shadow-md shadow-white max flex flex-col items-center '>
       <div className='flex items-start  gap-3  justify-center'>
        <div>
            <input onChange={(e)=> handleIpValue(e)} value={ipValue} type="text" id="first_name" 
            className="bg-black border border-gray-300 text-gray-900 text-sm rounded-lg 
             focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500" placeholder='Введіть IP' />
        </div>
            {!checkIpBiling? <ButtomCustom handleFind={handleFind} text={"check ip_white"}/>: <ButtomCustom handleFind={handleFindInBiling} text={"пошук в білінгу"}/>}
        </div>
        
            
        {checkIpWhite&&
        <div className='flex flex-col gap-5 justify-center items-center' >
          <div className='flex gap-7 p-3 items-center justify-center rounded-md  shadow-md mt-2 shadow-white border-white border'>
          <DatePicker minDate={minDate} future={true} label={""} startDate={startDate} setStartDate={setStartDate}/>
          <DatePicker future={true} label={""} startDate={endDate} setStartDate={setEndDate}/>
            
          </div>
          <ButtomCustom handleFind={handleGetListOfUser} text={"Get list of users"}/>

          </div>
          }
          <ListComponent abons={abons} ip={ipValue} checkIpBiling={checkIpBiling} />
         {
         abons.length>0&& 
          <ButtomCustom text={"Download"} handleFind={handleDownloadDate} />
         }
       </div>
      
    <AlertInfo open={open} handleClose={handleClose} text={alertInfo}/>
    </div>
  )
}
