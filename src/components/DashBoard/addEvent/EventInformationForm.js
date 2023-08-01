import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { fetchEventCategories } from '../../../services/operations/eventAPI'
import Upload from './Upload'
import RequirementsField from './RequirementsField'
import IconBtn from '../../common/IconBtn'
import { setEvent, setStep } from '../../../slices/eventSlice'
import {setLoading} from '../../../slices/profileSlice'
import { MdNavigateNext } from "react-icons/md"
import { editEventDetails } from '../../../services/operations/eventAPI'
import { addEventDetails } from '../../../services/operations/eventAPI'


const EventInformationForm = () => {
    const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    } = useForm()
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { event, editEvent } = useSelector((state) => state.event)
    const {loading} = useSelector((state)=>state.profile);
    const [eventCategories, setEventCategories] = useState([])
    console.log(eventCategories)
    // useEffect(()=>{
    //   console.log('HEL');
       
    // },[])
    useEffect(()=>{
        const getCategories = async ()=>{
            setLoading(true);
            const categories = await fetchEventCategories()
            console.log("categories: ",categories);
            if (categories && categories.length > 0) {
                console.log("categories", categories)
                setEventCategories(categories)
            }
            setLoading(false)
        }
        if(editEvent){
            setValue("eventTitle", event.eventName)
            setValue("eventShortDesc", event.eventDescription)
            setValue("eventePrice", event.price)
            setValue("eventeFee", event.fee)
            setValue("eventCategory", event.category)
            setValue("eventBenefits", event.WhatYouWillLearn)
            setValue("eventRequirements", event.instructions)
            setValue("eventImage", event.thumbnail)
            setValue("startDate", event.startDate)
            setValue("endDate", event.endDate)
            setValue("eventBrochureLink",event.BrochureLink)
            setValue("eventPosterLink",event.PosterLink)
            setValue("eventTeam",event.eventType)
            setValue("eventNumber",event.maxParticipant)
        }
        getCategories()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if (
            currentValues.eventTitle !== event.courseName ||
            currentValues.eventShortDesc !== event.courseDescription ||
            currentValues.eventPrice !== event.price ||
            currentValues.eventFee !== event.fee ||
            currentValues.eventBenefits !== event.WhatYouWillLearn ||
            currentValues.eventCategory._id !== event.category._id ||
            currentValues.eventRequirements.toString() !== event.instructions.toString() ||
            currentValues.eventImage !== event.thumbnail ||
            currentValues.startDate !== event.startDate ||
            currentValues.endDate !== event.endDate ||
            currentValues.eventBrochureLink !== event.BrochureLink ||
            currentValues.eventPosterLink !== event.PosterLink ||
            currentValues.eventTeam !== event.eventType ||
            currentValues.eventNumber !== event.maxParticipant
          )
            return true
        else
            return false
        }
  const onSubmit = async (data) => {
    if (editEvent) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("eventId", event._id)
        if (currentValues.eventTitle !== event.eventName) {
          formData.append("eventName", data.eventTitle)
        }
        if (currentValues.eventShortDesc !== event.eventDescription) {
          formData.append("eventDescription", data.eventShortDesc)
        }
        if (currentValues.eventPrice !== event.price) {
          formData.append("price", data.eventPrice)
        }
        if (currentValues.eventFee !== event.fee) {
          formData.append("fee", data.eventFee)
        }
        if (currentValues.eventBenefits !== event.whatYouWillLearn) {
          formData.append("WhatYouWillLearn", data.eventBenefits)
        }
        if (currentValues.eventCategory._id !== event.category._id) {
          formData.append("category", data.eventCategory)
        }
        if (
          currentValues.eventRequirements.toString() !==
          event.instructions.toString()
        ) {
          formData.append("instructions",JSON.stringify(data.eventRequirements))
        }
        if (currentValues.eventImage !== event.thumbnail) {
          formData.append("thumbnail", data.eventImage)
        }
        if (currentValues.startDate !== event.startDate) {
          formData.append("startDate", data.startDate)
        }
        if (currentValues.endDate !== event.endDate) {
          formData.append("endDate", data.endDate)
        }
        if (currentValues.eventBrochureLink !== event.BrochureLink) {
          formData.append("BrochureLink", data.eventBrochureLink)
        }
        if (currentValues.eventPosterLink !== event.PosterLink) {
          formData.append("PosterLink", data.eventPosterLink)
        }
        if (currentValues.eventTeam !== event.eventType) {
          formData.append("eventType", data.eventTeam)
        }
        if (currentValues.eventNumber !== event.maxParticipant) {
          formData.append("maxParticipant", data.eventName)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editEventDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setEvent(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }
    const formData = new FormData()
    formData.append("eventName", data.eventTitle)
    formData.append("eventDescription", data.eventShortDesc)
    formData.append("price", data.eventPrice)
    formData.append("fee", data.eventFee)
    formData.append("WhatYouWillLearn", data.eventBenefits)
    formData.append("category", data.eventCategory)
    formData.append("startDate", data.startDate)
    formData.append("endDate", data.endDate)
    formData.append("instructions", JSON.stringify(data.eventRequirements))
    formData.append("thumbnail", data.eventImage)
    formData.append("BrochureLink", data.eventBrochureLink)
    formData.append("PosterLink", data.eventPosterLink)
    formData.append("eventType", data.eventTeam)
    formData.append("maxParticipant", data.eventNumber)
    setLoading(true)
    const result = await addEventDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setEvent(result))
    }

    setLoading(false)
    console.log("formData: ",formData)
  }

  return (
    
        <form
        onSubmit={handleSubmit(onSubmit)}
        className='mb-[200px] flex flex-col justify-center gap-10 transform  translate-x-[-240px] lg:translate-x-[-40px] text-richblack-5 w-[350px] lg:w-[600px]
        bg-richblack-800 border-2 border-richblack-500 rounded-lg p-[24px] lg:mr-[35px]'>

            <label className='flex flex-col gap-4' htmlFor="eventTitle">
                <p>Event Title<sup className="text-pink-200">*</sup></p>
                <input
                    type='text'
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    id="eventTitle"
                    placeholder="Enter Event Title"
                    {...register("eventTitle", { required: true })}
                />
                {errors.eventTitle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    event title is required
                </span>
                )}
            </label>

            <label className='flex flex-col gap-4' htmlFor="eventShortDesc">
                <p>event Short Description<sup className="text-pink-200">*</sup></p>
                <textarea
                    id="eventShortDesc"
                    placeholder="Enter Description"
                    {...register("eventShortDesc", { required: true })}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5  resize-x-none min-h-[135px] "
                />
                {errors.eventShortDesc && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                     event Description is required
                </span>
                )}
            </label>

            <label className='flex flex-col gap-4 relative'  htmlFor="eventPrice">
                <p>Event Price<sup className="text-pink-200">*</sup></p>
                <input
                    type='text'
                    id="eventPrice"
                    placeholder="Enter Event Price"
                    {...register("eventPrice", {
                    required: true,
                    valueAsNumber: true,
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                    })}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" w-full !pl-12 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    
                />
                <HiOutlineCurrencyRupee className="absolute left-3 top-16 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                {errors.eventPrice && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    event Price is required
                </span>
                )}
            </label>

            <label className='flex flex-col gap-4 relative'  htmlFor="eventFee">
                <p>Event Fee<sup className="text-pink-200">*</sup></p>
                <input
                    type='text'
                    id="eventFee"
                    placeholder="Enter Event Fee"
                    {...register("eventFee", {
                    required: true,
                    valueAsNumber: true,
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                    })}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" w-full !pl-12 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    
                />
                <HiOutlineCurrencyRupee className="absolute left-3 top-16 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                {errors.eventFee && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    event Fee is required
                </span>
                )}
            </label>

            <label className='flex flex-col gap-4' htmlFor="eventCategory">
                <p>event Category<sup className="text-pink-200">*</sup></p>
                <select
                {...register("eventCategory", { required: true })}
                defaultValue=""
                id="eventCategory"
                style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                >
                <option value="" disabled>
                    Choose a event
                </option>
                {!loading &&
                  eventCategories?.map((category, indx) => (
                <option key={indx} value={category?._id}>
                    {category?.name}
                </option>
                ))}
                </select>
                {errors.eventCategory && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                Event Category is required
                </span>
                )}
            </label>

           {/* Brochure */}
            <label className='flex flex-col gap-4' htmlFor="eventBrochureLink">
                <p>event Brochure URL<sup className="text-pink-200">*</sup></p>
                <input
                    id="eventBrochureLink"
                    placeholder="Enter Brochure Link"
                    {...register("eventBrochureLink", { required: true })}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                />
                {errors.eventBrochureLink && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                     event Brochure Link is required
                </span>
                )}
            </label>

            {/* Poster Link */}

            <label className='flex flex-col gap-4' htmlFor="eventPosterLink">
                <p>event Poster URL<sup className="text-pink-200">*</sup></p>
                <input
                    id="eventPosterLink"
                    placeholder="Enter Poster Link"
                    {...register("eventPosterLink", { required: true })}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                />
                {errors.eventPosterLink && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                     event Poster Link is required
                </span>
                )}
            </label>

            <Upload
                name="eventImage"
                label="event Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editEvent ? event?.thumbnail : null}
            />

            <div className='flex gap-4'>
                <label className=' flex flex-col gap-3'>
                  <p>StartDate<sup className="text-pink-200">*</sup></p>
                  <input
                    type='date'
                    id="startDate"
                    {...register("startDate",{required:true})}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" lg:w-[265px] rounded-[0.5rem] bg-richblack-700 p-[8px] text-richblack-500"
                  />
                </label>

                <label className=' flex flex-col gap-3'>
                  <p>EndDate<sup className="text-pink-200">*</sup></p>
                  <input
                    type='date'
                    id="endDate"
                    {...register("endDate",{required:true})}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" lg:w-[265px] rounded-[0.5rem] bg-richblack-700 p-[8px] text-richblack-400"
                  />
                </label>
            </div>

            <label className='flex flex-col gap-4'>
                <p>Benefits of the event<sup className="text-pink-200">*</sup></p>
                <textarea
                    id="eventBenefits"
                    placeholder="Enter benefits of the event"
                    {...register("eventBenefits", { required: true })}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                />
                {errors.eventBenefits && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Benefits of the event is required
                </span>
                )}
            </label>

            <label className='flex flex-col gap-4' htmlFor="eventTeam">
                <p>Team Event<sup className="text-pink-200">*</sup></p>
                <input
                    id="eventTeam"
                    placeholder="Enter YES or NO"
                    {...register("eventTeam", { required: true })}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                />
                {errors.eventTeam && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    eventTeam is required
                </span>
                )}
            </label>

            <label className='flex flex-col gap-4' htmlFor="eventNumber">
                <p>Max Participant<sup className="text-pink-200">*</sup></p>
                <input
                    id="eventNumber"
                    placeholder="Enter Number Ranging from 1 to N"
                    {...register("eventNumber", { required: true,
                    valueAsNumber: true,
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    }
                     })}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className=" w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                />
                {errors.eventNumber&& (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                      event Number required
                </span>
                )}
            </label>

            <RequirementsField
                name="eventRequirements"
                label="Requirements/Instructions"
                register={register}
                setValue={setValue}
                errors={errors}
                getValues={getValues}
            />
            
            <div className="flex justify-end gap-x-2">
                    {editEvent && (
                    <button
                        onClick={() => dispatch(setStep(2))}
                        disabled={loading}
                        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                    >
                        Continue Wihout Saving
                    </button>
                    )}
                    <IconBtn
                    disabled={loading}
                    text={!editEvent ? "Next" : "Save Changes"}
                    >
                    <MdNavigateNext/>
                    </IconBtn>
            </div>
            
        </form>
        
  )
}

export default EventInformationForm
