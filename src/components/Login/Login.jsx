import React, { useState } from 'react';
import styles from "./login.module.css"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';
import AlertInfo from '../AlertInfo/AlertInfo';
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [open,setOpen]=useState(false)
  const navigate=useNavigate()
  function showInfo(text){
    setText(text)
    setOpen(true)
  }
  
function logIn(username,password) {
// let arrP=[{name:"vladb",password="vladb"},{name:"ruslanb",password:"ruslanb"},]
const pas="mapping"
const log="mapping"
  if (pas==password&&log==username) {
    return true
  }
  return false
}
  const handleLogin = async (e) => {
      e.preventDefault()
      let data= logIn(username,password)

      if(data==true){
        Cookies.set('login',username, { expires: 0.02083 });
        navigate("/mapping")
        return
      }else
      showInfo("Невірний логін або пароль")
  };

  return (
  <div className='absolute top-0 right-0 bg-black'> 
     <AlertInfo open={open} setOpen={setOpen} text={text}/>
     <div className={styles.container}>
     
      <div className={styles.form}>
      <TextField value={username}  onChange={(e)=>setUsername(e.currentTarget.value)}    name='login' label="Login" variant="standard" />
      <TextField value={password} onChange={(e)=>setPassword(e.currentTarget.value)} name='password' label="Password" type='password' variant="standard" />
         <Button onClick={handleLogin} size='large' style={{color:"white", border:"1px solid gray"}} variant='outlined' >Log In</Button>
      </div>
      
     </div></div>
  );
}

export default LoginPage;