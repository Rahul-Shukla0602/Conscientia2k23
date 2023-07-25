import React from 'react'
import RenderSteps from './RenderSteps'
const AddEvent = () => {
  return (
    <div className='lg:w-screen text-richblack-25 overflow-y-scroll h-screen max-h-screen z-[1000]'>
         <div className='flex justify-center'>
            <div className=' absolute lg:left-[500px] left-[240px]'>
                <h1 className='mb-8 text-3xl font-medium text-richblack-5 text-center lg:-ml-[100px]
                  transform translate-x-[-240px] lg:translate-x-[10px]'>Add Event</h1>
                  <RenderSteps/>
            </div>
            <div className="lg:block sticky top-10 hidden max-w-[400px] transform translate-x-[-200px]
             lg:translate-x-[300px] h-[220px] flex-1 rounded-md border-[1px]
             border-richblack-700 bg-richblack-800 p-6 xl:block">
                <p className="mb-8 text-lg text-richblack-50">⚡ Event Upload Tips</p>
                <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
                    <li>Set the Event Price option or make it free.</li>
                    <li>Standard size for the event thumbnail is 1024x576.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all Registered Participant at once.</li>
                </ul>
            </div>
         </div>
    </div>
  )
}

export default AddEvent
