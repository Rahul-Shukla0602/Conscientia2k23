// import React,{useEffect, useState} from 'react'
// import { useForm } from 'react-hook-form'
// import { toast } from "react-hot-toast"
// import { HiOutlineCurrencyRupee } from "react-icons/hi"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchEventCategories } from '../../../services/operations/eventAPI'
// import Upload from './Upload'
// import RequirementsField from './RequirementsField'
// import IconBtn from '../../common/IconBtn'
// import { setEvent, setStep } from '../../../slices/eventSlice'
// import { MdNavigateNext } from "react-icons/md"
// import { editEventDetails } from '../../../services/operations/eventAPI'
// import { addEventDetails } from '../../../services/operations/eventAPI'
// const EventInformationForm = () => {
//     const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//     } = useForm()
//     const dispatch = useDispatch()
//     const { token } = useSelector((state) => state.auth)
//     const { event, editEvent } = useSelector((state) => state.event)
//     const [loading, setLoading] = useState(false)
//     const [eventCategories, setEventCategories] = useState([])

//     useEffect(()=>{
//         const getCategories = async ()=>{
//             setLoading(true);
//             const categories = await fetchEventCategories()
//             // console.log("categories: ",categories);
//             if (categories.length > 0) {
//                 // console.log("categories", categories)
//                 setEventCategories(categories)
//             }
//             setLoading(false)
//         }
//         if(editEvent){
//             // console.log("data populated", editCourse)
//             setValue("eventTitle", event.courseName)
//             setValue("eventShortDesc", event.courseDescription)
//             setValue("eventePrice", event.price)
//             setValue("eventTags", event.tag)
//             setValue("eventBenefits", event.whatYouWillLearn)
//             setValue("eventCategory", event.category)
//             setValue("eventRequirements", event.instructions)
//             setValue("eventImage", event.thumbnail)
//         }
//         getCategories()
//     },[])

//     const isFormUpdated = () => {
//         const currentValues = getValues()
//         // console.log("changes after editing form values:", currentValues)
//         if (
//             currentValues.eventTitle !== event.courseName ||
//             currentValues.eventShortDesc !== event.courseDescription ||
//             currentValues.eventPrice !== event.price ||
//             currentValues.eventTags.toString() !== event.tag.toString() ||
//             currentValues.eventBenefits !== event.whatYouWillLearn ||
//             currentValues.eventCategory._id !== event.category._id ||
//             currentValues.eventRequirements.toString() !==
//             event.instructions.toString() ||
//             currentValues.eventImage !== event.thumbnail
//         )
//             return true
//         else
//             return false
//         }

//     //   handle next button click
//   const onSubmit = async (data) => {
//     // console.log(data)
//     if (editEvent) {
//       // const currentValues = getValues()
//       // console.log("changes after editing form values:", currentValues)
//       // console.log("now course:", course)
//       // console.log("Has Form Changed:", isFormUpdated())
//       if (isFormUpdated()) {
//         const currentValues = getValues()
//         const formData = new FormData()
//         // console.log(data)
//         formData.append("courseId", event._id)
//         if (currentValues.courseTitle !== event.courseName) {
//           formData.append("courseName", data.courseTitle)
//         }
//         if (currentValues.courseShortDesc !== event.courseDescription) {
//           formData.append("courseDescription", data.courseShortDesc)
//         }
//         if (currentValues.coursePrice !== event.price) {
//           formData.append("price", data.coursePrice)
//         }
//         if (currentValues.courseTags.toString() !== event.tag.toString()) {
//           formData.append("tag", JSON.stringify(data.eventTags))
//         }
//         if (currentValues.courseBenefits !== event.whatYouWillLearn) {
//           formData.append("whatYouWillLearn", data.courseBenefits)
//         }
//         if (currentValues.courseCategory._id !== event.category._id) {
//           formData.append("category", data.courseCategory)
//         }
//         if (
//           currentValues.courseRequirements.toString() !==
//           event.instructions.toString()
//         ) {
//           formData.append(
//             "instructions",
//             JSON.stringify(data.eventRequirements)
//           )
//         }
//         if (currentValues.courseImage !== event.thumbnail) {
//           formData.append("thumbnailImage", data.eventImage)
//         }
//         // console.log("Edit Form data: ", formData)
//         setLoading(true)
//         const result = await editEventDetails(formData, token)
//         setLoading(false)
//         if (result) {
//           dispatch(setStep(2))
//           dispatch(setEvent(result))
//         }
//       } else {
//         toast.error("No changes made to the form")
//       }
//       return
//     }
//     const formData = new FormData()
//     formData.append("eventName", data.eventTitle)
//     formData.append("eventDescription", data.eventShortDesc)
//     formData.append("price", data.eventPrice)
//     formData.append("tag", JSON.stringify(data.eventTags))
//     formData.append("whatYouWillLearn", data.eventBenefits)
//     formData.append("category", data.eventCategory)
//     // formData.append("status", COURSE_STATUS.DRAFT)
//     formData.append("instructions", JSON.stringify(data.eventRequirements))
//     formData.append("thumbnailImage", data.courseImage)
//     setLoading(true)
//     const result = await addEventDetails(formData, token)
//     if (result) {
//       dispatch(setStep(2))
//       dispatch(setEvent(result))
//     }
//     setLoading(false)
//     console.log("formData: ",formData)
//   }

//   return (
//         <form
//         onSubmit={handleSubmit(onSubmit)}
//         className='mb-[200px] flex flex-col justify-center gap-10 transform translate-x-[-40px] text-richblack-5 lg:w-[600px]
//         bg-richblack-800 border-2 border-richblack-500 rounded-lg p-[24px] first-letter first-letter lg:mr-[35px]'>

//             {/* <label className='flex flex-col gap-4' htmlFor="eventTitle">
//                 <p>Event Title<sup className="text-pink-200">*</sup></p>
//                 <input
//                     type='text'
//                     style={{
//                       boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                     }}
//                     className=" w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
//                     id="eventTitle"
//                     placeholder="Enter Event Title"
//                     {...register("eventTitle", { required: true })}
//                 />
//                 {errors.eventTitle && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                     event title is required
//                 </span>
//                 )}
//             </label>

//             <label className='flex flex-col gap-4' htmlFor="eventShortDesc">
//                 <p>event Short Description<sup className="text-pink-200">*</sup></p>
//                 <textarea
//                     id="eventShortDesc"
//                     placeholder="Enter Description"
//                     {...register("eventShortDesc", { required: true })}
//                     style={{
//                       boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                     }}
//                     className=" w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5  resize-x-none min-h-[135px] "
//                 />
//                 {errors.eventShortDesc && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                      event Description is required
//                 </span>
//                 )}
//             </label>

//             <label className='flex flex-col gap-4 relative'  htmlFor="eventPrice">
//                 <p>Event Price<sup className="text-pink-200">*</sup></p>
//                 <input
//                     type='text'
//                     id="eventPrice"
//                     placeholder="Enter Event Price"
//                     {...register("eventPrice", {
//                     required: true,
//                     valueAsNumber: true,
//                     pattern: {
//                         value: /^(0|[1-9]\d*)(\.\d+)?$/,
//                     },
//                     })}
//                     style={{
//                       boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                     }}
//                     className=" w-full !pl-12 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    
//                 />
//                 <HiOutlineCurrencyRupee className="absolute left-3 top-16 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
//                 {errors.eventPrice && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                     event Price is required
//                 </span>
//                 )}
//             </label>

//             <label className='flex flex-col gap-4' htmlFor="eventCategory">
//                 <p>event Category<sup className="text-pink-200">*</sup></p>
//                 <select
//                 {...register("eventCategory", { required: true })}
//                 defaultValue=""
//                 id="eventCategory"
//                 style={{
//                       boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                     }}
//                     className=" w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
//                 >
//                 <option value="" disabled>
//                     Choose a event
//                 </option>
//                 {!loading &&
//                   eventCategories?.map((category, indx) => (
//                 <option key={indx} value={category?._id}>
//                     {category?.name}
//                 </option>
//                 ))}
//                 </select>
//                 {errors.eventCategory && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Event Category is required
//                 </span>
//                 )}
//             </label>

//             <Upload
//                 name="eventImage"
//                 label="event Thumbnail"
//                 register={register}
//                 setValue={setValue}
//                 errors={errors}
//                 editData={editEvent ? event?.thumbnail : null}
//             /> */}

//             {/* <label className='flex flex-col gap-4'>
//                 <p>Benefits of the event<sup className="text-pink-200">*</sup></p>
//                 <textarea
//                      id="eventBenefits"
//                     placeholder="Enter benefits of the event"
//                     {...register("eventBenefits", { required: true })}
//                     className="form-style resize-x-none min-h-[130px] w-full"
//                 />
//                 {errors.eventBenefits && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                     Benefits of the event is required
//                 </span>
//                 )}
//             </label> */}

//             {/* <RequirementsField
//                 name="eventRequirements"
//                 label="Requirements/Instructions"
//                 register={register}
//                 setValue={setValue}
//                 errors={errors}
//                 getValues={getValues}
//             /> */}

//             {/* <div className="flex justify-end gap-x-2">
//                     {editEvent && (
//                     <button
//                         onClick={() => dispatch(setStep(2))}
//                         disabled={loading}
//                         className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
//                     >
//                         Continue Wihout Saving
//                     </button>
//                     )}
//                     <IconBtn
//                     disabled={loading}
//                     text={!editEvent ? "Next" : "Save Changes"}
//                     >
//                     <MdNavigateNext/>
//                     </IconBtn>
//             </div> */}
            
//          </form>
//   )
// }

// export default EventInformationForm
