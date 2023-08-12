import React from 'react'

const CancellationAndRefund = () => {
  return (
    <div  className=" text-white text-2xl container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3 py-[270px] lg:py-32  transform -translate-y-[140px] lg:translate-y-[40px]">
      <h1 className=' text-3xl font-semibold text-center pb-[100px]'>Cancellation And Refund Policy</h1>
      <p> All sales and services are defined as:</p>

      <ul className=' list-disc'>
        <li>Purchase of Conscientia Merchandise</li>
        <li>Registration of Events/Workshops</li>
      </ul>

      <p>
        All the sales and services are <b>Non-Refundable</b>. 
        The users are requested to check the merchandise before payment at the stall during Conscientia. 
        All the merchandise being delivered to customers through India Post are duly checked for any damages before
        shipment.
      </p>

     <p>
        If any user recieves a damaged product, they can contact the team using the contacts given in the website. 
        After verification, the merchandise will be replaced with same merchandise order. The user have to bear the 
        cost of sending the shipped merchandise back to us. The replacement will be shipped free-of-cost to the 
        customer.
     </p>

     <p>
     Cancellation of registration of events requests will be entertained only in special cases. Contact
      the team for such requests. 
     </p>
      
     <p>
      Requests for cancellation of registration of workshop and refund of the registration fee will NOT be 
      entertained in any case. 
     </p>
    </div>
  )
}

export default CancellationAndRefund
