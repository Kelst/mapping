import React from 'react'

export default function ListItem({login,fio,time,ip="172.16.0.1"}) {
   
  

  return (
    <tr class="relative  transform scale-100 text-md py-1 border-b-2 border-blue-100 cursor-default ">
    <td class="pl-5 pr-3 whitespace-no-wrap">
       
        <div>{time}</div>
    </td>
      <td class="px-2 py-3 whitespace-no-wrap">
         <div class="leading-5 text-gray-500 font-medium">{login} ({fio})</div>
         <div class="leading-4 text-gray-500 ">ip_white -{ip}</div>
      </td>
      
   </tr> 
  )
}
