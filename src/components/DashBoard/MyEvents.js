import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchOrganizerEvents} from '../../services/operations/eventAPI'
import { useNavigate } from 'react-router'
import IconBtn from '../../components/common/IconBtn'
import EventsTable from './EventsTable'

const MyEvents = () => {
    const {token} = useSelector((state)=> state.auth)
    const [events,setEvent] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchEvents =async ()=>{
            const result = await await fetchOrganizerEvents(token);
            if(result){
                setEvent(result);
            }
        } 
        fetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className='flex flex-col items-center justify-center h-full w-full transform translate-x-[-240px] lg:translate-x-[300px]'>
      <div className="mb-14 flex items-center justify-around text-richblack-5 w-[350px] overflow-y-scroll max-h-max">
          <p className="text-3xl font-medium ">My Events</p>
          <IconBtn text={"Add Event"} onclick={()=>{navigate('/dashboard/add-event')}}>
          </IconBtn>
      </div>
      {
        events && <EventsTable events={events} setEvent={setEvent}/>
      }
    </div>
  )
}

export default MyEvents
