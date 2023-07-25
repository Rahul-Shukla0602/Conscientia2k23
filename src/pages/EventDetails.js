import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { apiconnector } from '../services/apiconnector';
// import { useSelector } from 'react-redux';
// import {setLoading} from '../slices/profileSlice'
// import {eventEndpoints} from '../services/apis'
import { fetchEventDetails } from '../services/operations/eventAPI';
import { AiOutlineLink } from 'react-icons/ai';

const EventDetails = () => {
    const {eventId} = useParams();
    const [eventData,seteventData] = useState('');
    // const { loading } = useSelector((state) => state.profile)

    useEffect(() => {
        // Calling fetchCourseDetails fucntion to fetch the details
         (async () => {
          try {
            const res = await fetchEventDetails(eventId)
            console.log("event details res: ", res)
            seteventData(res.data)
          } catch (error) {
            console.log("Could not fetch Event Details")
          }
        })()
      }, [eventId])
      console.log(eventData)
  return (
    <div className=' bg-richblack-800 p-10 rounded-2xl text-richblack-200 w-[340px] lg:w-[600px] mx-auto transform translate-y-[120px]'>
        <div className=' flex flex-col gap-2'>
            <img src={eventData.thumbnail} alt='' className=' rounded-3xl lg:w-[700px] w-[300px] lg:h-[400px] h-[350px]'/>
            <p>{eventData.eventName}</p>
            <p>{eventData.eventDescription}</p>
            <div className='flex gap-4'>
                <p>{
                  eventData.price !== 0 ? {"Price":eventData.price} :""
                }</p>
                <p>Fee: {eventData.fee}</p>
            </div>
            <div className=' flex gap-6'>
               <Link to={eventData.BrochureLink} className='flex justify-center items-center text-pink-100'>
               <AiOutlineLink/>
               Brochure</Link>
               <Link to={eventData.PosterLink} className='flex justify-center items-center text-pink-100'>
               <AiOutlineLink/>
               Poster</Link>
            </div>
            <button
             className='bg-yellow-200 text-black font-semibold px-2 lg:px-4 py-2 rounded-lg'
            >Resigter</button>
        </div>
    </div>
  )
}

export default EventDetails
