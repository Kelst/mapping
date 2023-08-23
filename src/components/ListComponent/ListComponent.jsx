import React from 'react'
import ListItem from './ListItem'
import dayjs from 'dayjs';

function ListComponent({abons,ip,width=600,checkIpBiling}) {
    // {
    //     uid,
    //     id,
    //     fio
    // time
    // }
  return (
	 <div className="w-[600px]    h-full flex flex-col rounded-xl" >
                    <div class=" text-sm text-gray-500 font-bold px-5 py-2 shadow border-b border-gray-300">
                        Кількість абонентів ( {abons.length} )
                    </div>
                    <div class="w-full h-60 overflow-auto shadow bg-inherit" id="journal-scroll">
                    <table class="w-full">
                        <tbody class="">
                            {abons.length>0?
                            abons.map((e,i)=>{

                            
                                    
                                    return <ListItem  key={i} login={e.id} ip={ip} fio={e.fio} time={e.datetime } />

                                
                            })
                            :""}
                        
                         </tbody>
                    </table>
                    </div>
                    
                    
                </div>

  )
}

export default ListComponent