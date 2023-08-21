import React from 'react'

export default function ButtomCustom({handleFind,text}) {
  return (
    <button onClick={handleFind}
    type="button" class="
     hover:text-white border border-gray-800
      hover:bg-gray-900 focus:ring-4 focus:outline-none
       focus:ring-gray-300 font-medium rounded-lg text-sm 
       px-5 py-2.5 text-center mr-2 mb-2 text-white
       
      ">
         {text}
         </button>
  )
}
