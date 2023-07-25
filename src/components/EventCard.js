import React, {} from 'react'

import { Link } from 'react-router-dom';

const EventCard = ({event}) => {
    
  return (
    <>
      <Link to={`/events/${event._id}`}>
        <div className="bg-richblack-800 p-8 rounded-xl border-[1px] border-richblack-600">
          <div className="rounded-lg">
            <img
              src={event?.thumbnail}
              alt="event thumnail"
              className={`w-[400px] rounded-xl `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{event?.eventName}</p>
            <p>{event?.eventDescription.split(" ").splice(0,10).join(" ")+"..."}</p>
            {/* <p className="text-sm text-richblack-50">
              {event?.organizer?.firstName} {event?.organizer?.lastName}
            </p>
            <p className="text-xl text-richblack-5">Rs. {event?.price}</p> */}
          </div>
        </div>
      </Link>
    </>
  )
}

export default EventCard




