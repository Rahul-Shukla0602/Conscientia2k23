
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editEventDetails } from "../../../services/operations/eventAPI"
import { resetEventState, setStep } from "../../../slices/eventSlice"
import { EVENT_STATUS } from "../../../utils/constant"
import IconBtn from "../../../components/common/IconBtn"
import {setEditEvent} from "../../../slices/eventSlice"
 
export default function PublishEvent() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const {event} = useSelector((state) => state.event)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (event?.status === EVENT_STATUS.PUBLISHED) {
      setValue("public", true)
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditEvent(true));
  }

  const goToEvents = () => {
    dispatch(resetEventState())
    navigate("/dashboard/my-event")
  }

  const handleEventPublish = async () => {
    // check if form has been updated or not
    if (!event) {
      console.error("Event object is null or undefined.");
      return;
    }
    if ((event?.status === EVENT_STATUS.PUBLISHED && getValues("public") === true)
     ||(event?.status === EVENT_STATUS.DRAFT && getValues("public") === false)) {
      goToEvents()
      return
    }
    const formData = new FormData()
    formData.append("eventId", event._id)
    const eventStatus = getValues("public")
      ? EVENT_STATUS.PUBLISHED
      : EVENT_STATUS.DRAFT
    formData.append("status", eventStatus)
    setLoading(true)
    const result = await editEventDetails(formData, token)
    if (result) {
      goToEvents()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    // console.log(data)
    handleEventPublish()
  }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 w-fit lg:w-full transform translate-x-[-260px] lg:translate-x-[-100px]">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this event as public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Publish" />
        </div>
      </form>
    </div>
  )
}

