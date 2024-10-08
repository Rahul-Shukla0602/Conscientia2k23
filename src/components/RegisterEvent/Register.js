import React,{useState} from 'react'
// import IconBtn from '../common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../slices/eventSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { 
  resetEventState,
  setEditTeam } from '../../slices/participantSlice'
import {setLoading} from '../../slices/profileSlice'
import { editTeamDetails } from '../../services/operations/eventAPI'
// import { buyEvent } from '../../services/operations/userFeatureAPI'
import pay_qr from '../../assets/payment_qr1.jpeg'



const Register = () => {
  const [registrationError, setRegistrationError] = useState(null);
  const {event} = useSelector((state)=>state.event);
  const {botnumber} = useSelector((state)=>state.bot);
  const { register, handleSubmit,
  // setValue, 
  // getValues,
  formState: { errors }, } = useForm()
  const {loading,
  // user
  } = useSelector((state)=>state.profile)
  const {token} = useSelector((state)=>state.auth);
  const {Team} = useSelector((state)=>state.participant)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {eventId} = useParams();
  const {number} = useSelector((state)=>state.participant)
  const teamId  = Team?._id;
  console.log("team id check1",Team?._id)
  console.log(teamId)
  console.log("teams mai check",Team)

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditTeam(true))
  }
  
  // useEffect(() => {
  //   if (Team?.status === 'Paid') {
  //     setValue("public", true)
  //   }
  //   // eslint-disable-next-line
  // }, [])

  const goToEvent = () => {
    // dispatch(resetEventState())
    navigate("/dashboard/my-profile")
    dispatch(setStep(1));
  }

  // const handleEventRegister= async () => {
  //   if ((Team?.status === 'Paid' && getValues("public") === true) ||(Team?.status === 'NonPaid' && getValues("public") === false)){
  //     goToEvent()
  //     return
  //   }
  //   const formData = new FormData()
  //   formData.append("TeamId", teamId)
  //   const teamStatus = getValues("public")
  //     ? 'Paid'
  //     : 'NonPaid'
  //   formData.append("paymentStatus", teamStatus)
  //   setLoading(true)
  //   const result = await editTeamDetails(formData, token)
  //   if (result) {
  //     goToEvent()
  //   }
  //   setLoading(false)
  // }
  // const onSubmit = ()=>{
  //   if(token){
  //      buyEvent(token,[eventId],number,
  //       teamId,
  //       user,navigate,dispatch)
  //      handleEventRegister();
  //   }
  // }
  // const handleEventRegister= async (data) => {
  
  //   const formData = new FormData()
  //   console.log(teamId);
  //   console.log(data);
  //   formData.append("TeamId", teamId)
  //   formData.append("paymentID",data.paymentID)
  //   console.log(Team.teamMembers);
  //   if(Array.isArray(Team.teamMembers)) {
  //     const teamMembersData = Team.teamMembers.map((member) => ({
  //         name: member.name,
  //         phone: member.phone,
  //         email: member.email,
  //         aadhar: member.aadhar,
  //     }));
  //     formData.append("teamMembers", JSON.stringify(teamMembersData));
  //   } else {
  //       formData.append("teamMembers", "[]")
  //   }

  //   setLoading(true)
  //   console.log('editTeamDetails',formData);
  //   const result = await editTeamDetails(formData, token)
  //   console.log('edit :',result);
  //   if (result) {
  //     goToEvent()
  //   }
  //   setLoading(false)
  // }
  // const onSubmit = (data)=>{
  //   if(token){
  //      handleEventRegister(data);
  //   }
  //   dispatch(resetEventState())
  // }
  const onSubmit = async (data) => {
    if (token) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("TeamId", teamId);
        formData.append("paymentID", data.paymentID);
        
        if (Array.isArray(Team.teamMembers)) {
          const teamMembersData = Team.teamMembers.map((member) => ({
            name: member.name,
            phone: member.phone,
            email: member.email,
            aadhar: member.aadhar,
          }));
          formData.append("teamMembers", JSON.stringify(teamMembersData));
        } else {
          formData.append("teamMembers", "[]");
        }

        const result = await editTeamDetails(formData, token);

        if (result) {
          goToEvent();
        } else {
          // Handle registration error here and show an error message to the user
          setRegistrationError("Registration failed. Please try again."); // Set the error message
        }
      } catch (error) {
        // Handle unexpected errors here and show an error message to the user
        console.error("Error during registration:", error);
        setRegistrationError("An unexpected error occurred. Please try again later."); // Set the error message
      } finally {
        setLoading(false);
      }
    }
    dispatch(resetEventState());
  };

  return (
    <>
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-[24px]">
      <p className="text-2xl font-semibold text-richblack-5">Payment</p>

      <form onSubmit={handleSubmit(onSubmit)}
      className=' mt-[20px]'
      >
        {/* <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
            By checking this box , I confirm that I have given correct information.
            </span>
          </label>
        </div> */}

        {/* Next Prev Button */}
        {/* <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
          onClick={goBack}
            disabled={loading}
            type='button'
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >Back
          </button>
          <IconBtn 
          disabled={loading} text="Payment" />
        </div> */}

        {/*  */}

        <img src={pay_qr} alt='QR' className='w-[440px] h-[530px] rounded-lg'/>
        <p className=' text-richblack-5 text-2xl mt-[20px] text-center'><span>UPI ID:{" "}</span>aaravvvashi25@oksbi</p>
        <p className=' text-richblack-25 mt-[10px]  text-xl '>
          Pay {" "} 
          {
            eventId === '64d7c8c2b274fa83f6096657'?
            <span className=' text-yellow-5'>{ event.fee + (botnumber-1)*1000 }</span>
            :
            <span className=' text-yellow-5'>{eventId==='64c4ebcfb3e4407fb610c3b4' && number ? (event.fee + (number-1)*1000): event.fee }</span>
          }
          {/* <span className=' text-yellow-5'>{eventId==='64c4ebcfb3e4407fb610c3b4' && number ? (event.fee + (number-1)*1000): event.fee }</span> */}
          {" "}INR in given QR code.
        </p>

        <label htmlFor='paymentID' className=' form-style text-richblack-5'>
          <p className=' text-richblack-25 mt-[10px]  text-xl'>Payment ID: </p>
          <input type='text'
           placeholder='Transaction ID'
           id="paymentID"
           
          {...register("paymentID",  {
            required: "payment Id is required", minLength: {
                                        value: 8,
                                        message: "Invalid payment id"
                                      }
          })}
          style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="placeholder:pl-[10px] w-full mt-3 py-2 text-richblack-5 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.paymentID && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
                    payment-id is required
          </span>
          )}
        </label>
        {registrationError && (
            <p className="text-red-500">{registrationError}</p>
        )} 
        <div className=' mt-[20px]'>
          <p className=' text-richblack-5 text-sm lg:text-lg'>Make sure Your payment ID should be correct </p>
          <p className=' text-richblack-5 text-sm lg:text-lg'>otherwise we will cancel your registeration.</p>
        </div>

        <div className="ml-auto flex max-w-max items-center gap-x-4 mt-[10px]">
          <button
            onClick={goBack}
            disabled={loading}
            type= 'submit'
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >Back
          </button>
          <button
          type= 'submit'
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-200 py-[8px] px-[20px] font-semibold text-richblack-900"
          >Register
          </button>
        </div>
      </form>

    </div>
    </>
  )
}

export default Register
