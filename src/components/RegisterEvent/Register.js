import React,{useEffect} from 'react'
import IconBtn from '../common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../slices/eventSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { resetEventState, setEditTeam } from '../../slices/participantSlice'
import {setLoading} from '../../slices/profileSlice'
import { editTeamDetails } from '../../services/operations/eventAPI'
import { buyEvent } from '../../services/operations/userFeatureAPI'

const Register = () => {
  const { register, handleSubmit, setValue, getValues } = useForm()
  const {loading,user} = useSelector((state)=>state.profile)
  const {token} = useSelector((state)=>state.auth);
  const {Team} = useSelector((state)=>state.participant)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {eventId} = useParams();
  const {number} = useSelector((state)=>state.participant)
  const teamId  = Team?._id || Team?.data?._id;
  console.log(teamId)
  console.log("teams mai check",Team)
  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditTeam(true))
  }
  useEffect(() => {
    if (Team?.status === 'Paid') {
      setValue("public", true)
    }
    // eslint-disable-next-line
  }, [])

  const goToEvent = () => {
    dispatch(resetEventState())
    // navigate("/dashboard/my-events")
  }

  const handleEventRegister= async () => {
    if ((Team?.status === 'Paid' && getValues("public") === true) ||(Team?.status === 'NonPaid' && getValues("public") === false)){
      goToEvent()
      return
    }
    const formData = new FormData()
    formData.append("TeamId", teamId)
    const teamStatus = getValues("public")
      ? 'Paid'
      : 'NonPaid'
    formData.append("paymentStatus", teamStatus)
    setLoading(true)
    const result = await editTeamDetails(formData, token)
    if (result) {
      goToEvent()
    }
    setLoading(false)
  }
  const onSubmit = ()=>{
    if(token){
       buyEvent(token,[eventId],number,
        teamId,
        user,navigate,dispatch)
       handleEventRegister();
    }
  }
  return (
    <>
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Payment</p>
      <form 
      onSubmit={handleSubmit(onSubmit)}
      >
        <div className="my-6 mb-8">
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
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
          onClick={goBack}
            disabled={loading}
            type='button'
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >Back
          </button>
          <IconBtn 
          disabled={loading} text="Payment" />
        </div>
      </form>
    </div>
    </>
  )
}

export default Register
