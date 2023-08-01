import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventDetails } from '../services/operations/eventAPI';
import { AiOutlineLink } from 'react-icons/ai';
import {setParticipant} from '../slices/participantSlice';

const EventDetails = () => {
    const dispatch = useDispatch()
    const {eventId} = useParams();
    const [eventData,seteventData] = useState('');
    const options = [];
    let linkTo = eventData.eventName === 'MIND-SPARK' ?
    'https://docs.google.com/forms/d/e/1FAIpQLSfhAaf1NgZoIRLvdgTPBYraURzEyX4fnFwER0FJ4TMzQuLX1g/viewform' 
    : `/event/registerEvent/${eventId}`;
    useEffect(() => {
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
      for(let i=0;i<eventData.maxParticipant;i++){
        options.push(i+1);
      }
      const {number} = useSelector((state)=>state.participant);
      const handleChange = (e) => {
        // setNum(parseInt(e.target.value, 10));
        dispatch(setParticipant(parseInt(e.target.value, 10)));// Convert the selected value to an integer
        console.log("Selected Number of Participants: ", number);
      };
      useEffect(() => {
        console.log("Selected Number of Participants: ", number);
      }, [number]);
  return (
    <div className=' bg-richblack-800 p-10 rounded-2xl text-richblack-200 w-[340px] lg:w-[600px] mx-auto transform translate-y-[120px]'>
        <div className=' flex flex-col gap-2'>
            <img src={eventData.thumbnail} alt='' className=' rounded-3xl lg:w-[700px] w-[300px] lg:h-[400px] h-[350px]'/>
            <p className=' text-richblack-5'>{eventData.eventName}</p>
            <p>{eventData.eventDescription}</p>
            <div className='flex gap-4'>
                <p className=' text-richblack-5'>{
                  eventData.price !== 0 ?<p>Price: {eventData.price}</p> :""
                }</p>
                <p className=' text-richblack-5'>REGISTRATION FEE: {eventData.fee} INR</p>
            </div>
            <div className=' flex gap-6'>
               <Link to={eventData.BrochureLink} className='flex justify-center items-center text-pink-100'>
               <AiOutlineLink/>
               Brochure</Link>
               <Link to={eventData.PosterLink} className='flex justify-center items-center text-pink-100'>
               <AiOutlineLink/>
               Poster</Link>
            </div>
            
            <div  className=' text-richblack-5'>
              {
                eventData.eventType === 'YES' && (
                  <div className='flex gap-3'>
                    <p className=' text-sm lg:text-lg'>Select Number Of Participants: </p>
                    <select  className=' text-richblack-900 border-2 border-richblack-900 rounded-lg'
                    onChange={handleChange}
                    value={number}
                    >
                      {
                        options.map((option,index)=>{
                          return(
                            <option key={index}>{option}</option>
                          )
                        })
                      }
                  </select>
                  </div>
                )
              }
            </div>
            <div>
              {
                eventId === "64c2a5a52f7a7a75db4c0d9b" ? (
                <div class='flex flex-col md:flex-row text-sm gap-2'>
                  <span class='text-sm'>UPDATE:</span>
                  <p class='text-sm flex-shrink-0'>
                    Registration is valid to 15 Aug and result will be declared on 15th-20th Aug.
                  </p>
                </div>

                ):''
              }
            </div>

            
            {/* <Link
             className='bg-yellow-200 text-black font-semibold px-2 lg:px-4 py-2 rounded-lg text-center'
             to={linkTo}
            >
               Register
            </Link> */}
            <div
             className='bg-yellow-200 text-black font-semibold px-2 lg:px-4 py-2 rounded-lg text-center'
             to={linkTo}
            >
               Register
            </div>
           
        </div>
    </div>
  )
}

export default EventDetails
