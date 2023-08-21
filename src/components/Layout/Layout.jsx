import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../../assets/logo.svg';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate=useNavigate()
  useEffect(()=>{
    const cookieData = Cookies.get('login');
    if (!cookieData) {
      navigate("/login")
   
    }
  },[])
  return (
    <div>
        <nav className='pb-1 mx-2 mt-2 mb-12 relative rounded-xl  bg-sky-500/[.06] border-white border-b border-x  shadow-lg shadow-white 	'>
            <ul  className='flex items-center' >
                <li className='text-white ml-10 mr-5 drop-shadow'><img className=' object-cover h-[100px] w-[140px]' src={Logo} alt="" /></li>
                <h2 className='  absolute top-[30%] right-[46%] text-3xl font-bold'>Сервіс мапінгу</h2>
            </ul>
        </nav>

      <Outlet />

    </div>
  )
}
