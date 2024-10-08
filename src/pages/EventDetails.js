import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventDetails } from '../services/operations/eventAPI';
import { AiOutlineLink } from 'react-icons/ai';
import {setParticipant} from '../slices/participantSlice';
import { setEvent } from '../slices/eventSlice';
import { setBot } from '../slices/Bots';

const EventDetails = () => {
    const {event} = useSelector((state)=>state.event);
    const dispatch = useDispatch()
    const {eventId} = useParams();
    const [eventData,seteventData] = useState('');
    const options = [];
    const Bots = [];

    let linkTo = eventData.eventName === 'MIND-SPARK' ?
    'https://docs.google.com/forms/d/e/1FAIpQLSfhAaf1NgZoIRLvdgTPBYraURzEyX4fnFwER0FJ4TMzQuLX1g/viewform' 
    : eventData.eventName === 'INTRODUCTION TO MATLAB'? '' 
    : `/event/registerEvent/${eventId}`;

    useEffect(() => {
         (async () => {
          try {
            const res = await fetchEventDetails(eventId)
            console.log("event details res: ", res)
            seteventData(res.data)
            dispatch(setEvent(res.data));
            console.log("events: ",event);
          } catch (error) {
            console.log("Could not fetch Event Details")
          }
        })()
        // eslint-disable-next-line
      }, [eventId])
      console.log(eventData)
      for(let i=0;i<eventData.maxParticipant;i++){
        options.push(i+1);
      }
      for(let i=0;i<3;i++){
        Bots.push(i+1);
      }
      const {number} = useSelector((state)=>state.participant);
      const {botnumber} = useSelector((state)=>state.bot);
      const handleChange = (e) => {
        // setNum(parseInt(e.target.value, 10));
        dispatch(setParticipant(parseInt(e.target.value, 10)));// Convert the selected value to an integer
        console.log("Selected Number of Participants: ", number);
      };
      const handleChangeBot = (e) => {
        dispatch(setBot(parseInt(e.target.value, 10)));// Convert the selected value to an integer
        console.log("Selected Number of Bots: ", botnumber);
      };

      useEffect(() => {
        console.log("Selected Number of Participants: ", number);
        console.log("Selected Number of Bots: ", botnumber);
      }, [number,botnumber]);
  return (
    <div className=' bg-richblack-800 p-10 rounded-2xl text-richblack-200 w-[340px] lg:w-[600px] mx-auto transform translate-y-[120px]'>
        <div className=' flex flex-col gap-2'>
            <img src={eventData.thumbnail} alt='' className=' rounded-3xl lg:w-[700px] w-[300px] lg:h-[400px] h-[350px]'/>
            <p className=' text-richblack-5'>{eventData.eventName}</p>
            <p className=' text-sm lg:text-base '>{eventData.eventDescription}</p>

            {/* Disclaimer text */}
            <p className=' text-sm lg:text-base '>
              <span className=' text-richblack-5 '>Disclaimer: </span>Please note that in the event if the minimum required number of participants
              is not met, we reserve the right to cancel the event, and registered participants will be duly
              informed and provided with a full refund of their registration fees.
            </p>
            
            <div className='flex gap-4'>
                <p className=' text-richblack-5  whitespace-nowrap text-xs lg:text-base'>{
                  eventData.price !== 0 ?<p>PRIZE: {eventData.price} INR</p> :""
                }</p>
                {/* <p className=' text-richblack-5  whitespace-nowrap text-xs lg:text-base'>REGISTRATION FEE: {eventData.fee} INR</p> */}
                {
                  eventId === '64d7c8c2b274fa83f6096657'? 
                  <p className=' text-richblack-5'>REGISTRATION FEE: { eventData.fee + (botnumber-1)*1000 }</p>
                  :
                  
                  eventId === '64c4ebcfb3e4407fb610c3b4' && number ? 
                  <p className=' text-richblack-5  whitespace-nowrap text-xs lg:text-base'>REGISTRATION FEE: {eventData.fee + (number-1)*1000} INR</p>
                  :
                  <p className=' text-richblack-5  whitespace-nowrap text-xs lg:text-base'>REGISTRATION FEE: {eventData.fee} INR</p>
                }
            </div>
            <div className=' flex gap-6'>
               <Link to={eventData.BrochureLink} className='flex justify-center items-center text-pink-100'>
               <AiOutlineLink/>
               Brochure</Link>
               <Link to={eventData.PosterLink} className='flex justify-center items-center text-pink-100'>
               <AiOutlineLink/>
               Poster</Link>
               {
                (eventId === '64d7c8c2b274fa83f6096657') && (
                  <Link to={eventData.WhatYouWillLearn} className='flex justify-center text-sm lg:text-base items-center text-pink-100'>
                  <AiOutlineLink/>
                  Rule set</Link>
                )
               }
               
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

            {/* start for Battle of Bots */}
            <div className=' text-richblack-5'>
              {
                eventId === '64d7c8c2b274fa83f6096657' &&(
                  <div className='flex gap-3'>
                    <p className=' text-sm lg:text-lg'>Select Number Of Bots: </p>
                  <select  className=' text-richblack-900 border-2 border-richblack-900 rounded-lg'
                    onChange={handleChangeBot}
                    value={botnumber} >
                      { Bots.map((option,index)=>{return(<option key={index}>{option}</option>)})}
                  </select>
                  </div>
                )
              }
            </div>
             {/* end for Battle of Bots */}

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

            {
              eventId === '64f04d03de04968701d73996'? 
              <p className=' text-richblack-5'><span className='text-pink-200'>*</span> Registrations are closed.</p>
              :
              <p className=' text-richblack-5'><span className=' text-pink-200'>*</span>The last date of registration is September 15, 2023.</p>
            }
            

            <br></br>
            
            <Link
             className='bg-yellow-200 text-black font-semibold px-2 lg:px-4 py-2 rounded-lg text-center'
             to={linkTo}
            >
               Register
            </Link>
            {/* <div
             className='bg-yellow-200 text-black font-semibold px-2 lg:px-4 py-2 rounded-lg text-center'
             to={linkTo}
            >
               Register
            </div> */}
           
        </div>
    </div>
  )
}

export default EventDetails
