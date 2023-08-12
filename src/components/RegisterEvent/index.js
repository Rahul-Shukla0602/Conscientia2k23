import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerTeam,editTeamDetails} from "../../services/operations/eventAPI";
import { useParams } from 'react-router-dom';
import {setStep} from '../../slices/eventSlice'
import { useEffect,useState} from "react";
import { toast } from "react-hot-toast"
import {setTeam,setEditTeam} from '../../slices/participantSlice'
import IconBtn from "../common/IconBtn";
import { MdNavigateNext } from "react-icons/md"


export default function RegistrationForm() {

  const dispatch = useDispatch();
  const {register, handleSubmit,formState: { errors }, setValue,getValues} = useForm();
  const {eventId} = useParams()
  const { Team, editTeam } = useSelector((state) => state.participant);
  const [loading, setLoading] = useState(false)
  const {token} = useSelector((state)=>state.auth)
  const {number} = useSelector((state)=>state.participant)

  useEffect(()=>{
    if(editTeam){
       setValue("name", Team.name)
       setValue("college", Team.college)
       setValue("collegeId", Team.collegeId)
       setValue("teamName", Team.teamName)
       setValue("phone", Team.phone)
       setValue("email", Team.email)
       setValue("aadhar", Team.aadhar)
       if(Array.isArray(Team.teamMembers)){
        Team.teamMembers.forEach((member, index) => {
          setValue(`teamMembers[${index}].name`, member.name);
          setValue(`teamMembers[${index}].college`, member.college);
          setValue(`teamMembers[${index}].phone`, member.phone);
          setValue(`teamMembers[${index}].email`, member.email);
          setValue(`teamMembers[${index}].aadhar`, member.aadhar);
        });  
       }
    }
    console.log("TE ",Team) 
    // eslint-disable-next-line
  },[editTeam,Team]);


  const isFormUpdated = () => {
    const currentValues = getValues()
    if(
     Team && Array.isArray(Team.teamMembers)
    ){
      if ( 
        currentValues.name !== Team.name ||
        currentValues.college !== Team.college ||
        currentValues.collegeId !== Team.collegeId ||
        currentValues.teamName !== Team.teamName ||
        currentValues.teamMembers !== Team.teamMembers ||
        currentValues.phone !== Team.phone ||
        currentValues.email !== Team.email ||
        currentValues.aadhar !== Team.aadhar
    )
        return true
    }
    else
        return false
    }

    

  const onSubmit = async (data) => {

    console.log("BB: ",isFormUpdated())
    console.log("AA: ",editTeam)

    // upadte
    if(editTeam){
      if(isFormUpdated()){
        const currentValues = getValues()
        const formData = new FormData()
        formData.append("TeamId",Team._id)
        if(currentValues.name !== Team.name){
          formData.append("name", data.name);
        }
        if(currentValues.college !== Team.college){
          formData.append("college", data.college)
        }
        if( currentValues.collegeId !== Team.collegeId){
          formData.append("collegeId", data.collegeId);
        }
        if(currentValues.teamName !== Team.teamName){
          formData.append("teamName", data.teamName);
        }
        if(currentValues.phone !== Team.phone){
          formData.append("phone", data.phone)
        }
        if(currentValues.email !== Team.email){
          formData.append("email", data.email);
        }
        if(currentValues.aadhar !== Team.aadhar){
          formData.append("aadhar", data.aadhar)
        }
        if(Team?.teamMembers){
          if(Array.isArray(Team.teamMembers)){
              const teamMembersData = data.teamMembers.map((member) => ({
                name: member.name,
                phone: member.phone,
                email: member.email,
                aadhar: member.aadhar,
              }));
              console.log("TEAM MEMBERL: ",teamMembersData)
              formData.append("teamMembers", JSON.stringify(teamMembersData));
          }else{
            formData.append("teamMembers", "[]");
          }
        }

        setLoading(true)
        const result = await editTeamDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setTeam(result));
        }
      }
      else {
        toast.error("No changes made to the form")
      }
    } else {   

    // first time registeration
    const formData = new FormData();
    formData.append("eventId",eventId)
    formData.append("name", data.name);
    formData.append("college", data.college);
    formData.append("collegeId", data.collegeId);
    formData.append("teamName", data.teamName);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("aadhar", data.aadhar);
    if(number!==1){
      if (Array.isArray(data.teamMembers)) {
        const teamMembersData = data.teamMembers.map((member) => ({
            name: member.name,
            phone: member.phone,
            email: member.email,
            aadhar: member.aadhar,
        }));
        formData.append("teamMembers", JSON.stringify(teamMembersData));
        console.log("FORMAT: ", teamMembersData)
      } else {
          formData.append("teamMembers", "[]")
      }
    }
    setLoading(true)
    const res = await registerTeam(formData,token)
      if(res.success){
        console.log("RESPONE: ",res.data) 
        dispatch(setStep(2));
        dispatch(setTeam(res.data)) 
        console.log("DATA of team: ",Team)
        // toast.success("Team registered successfully");
        setEditTeam(true);
      }else {
        toast.error(res.message || "Failed to register team");
      }
      setLoading(false)
  }
}
  return (
    <div className=" bg-fixed text-richblack-50 pt-[200px] fixed inset-0 overflow-y-auto transition-all duration-500 -z-10">
    <p className=" text-center text-[30px] text-richblack-5 mb-4">Registration Form</p>
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md lg:max-w-lg mx-auto bg-richblack-800 p-[24px] rounded-xl border-2 border-richblack-400">
      
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-medium">
          Name <span className="text-pink-500">*</span>
        </label>
        <input
          {...register("name", { required: true })}
          type="text"
          id="name"
          style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
         {errors.name && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
                    name is required
          </span>
          )}
      </div>

      <div className="mb-4">
        <label htmlFor="college" className="block mb-2 font-medium">
          College <span className="text-pink-500">*</span>
        </label>
        <input
          {...register("college", { required: true })}
          type="text"
          id="college"
          style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
         {errors.college && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
                    college is required
          </span>
          )}
      </div>

      <div className="mb-4">
        <label htmlFor="collegeId" className="block mb-2 font-medium">
          College ID <span className="text-pink-500">*</span>
        </label>
        <input
          {...register("collegeId", { required: true })}
          type="text"
          id="collegeId"
          style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
         {errors.collegeId && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
                    name is required
          </span>
          )}
      </div>

      {
        number !== 1 && (
          <div className="mb-4">
            <label htmlFor="teamName" className="block mb-2 font-medium">
              Team Name<span className="text-pink-500">*</span>
            </label>
            <input
              {...register("teamName")}
              type="text"
              id="teamName"
              style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
            />
             {errors.teamName && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    name is required
          </span>
          )}
          </div>
        )
      }

      <div className="mb-4">
        <label htmlFor="phone" className="block mb-2 font-medium">
          Phone <span className="text-pink-500">*</span>
        </label>
        <input
          {...register("phone", { required: true })}
          type="text"
          id="phone"
          style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
         {errors.phone && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    name is required
          </span>
          )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium">
          Email <span className="text-pink-500">*</span>
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
         {errors.email && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    name is required
          </span>
          )}
      </div>

      <div className="mb-4">
        <label htmlFor="aadhar" className="block mb-2 font-medium">
          Aadhar <span className="text-pink-500">*</span>
        </label>
        <input
          {...register("aadhar", { required: true })}
          type="text"
          id="aadhar"
          style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
          // className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
         {errors.aadhar && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    name is required
          </span>
          )}
      </div>
      
      {number!==1   && (<div className="mb-4">
        <div className="space-y-4">
          {Array.from({ length:number-1}).map((_, index) => (
            <div key={index}>
            <label htmlFor="teamMembers" className="block mb-2 font-medium">
              Team Members: {index+1} 
            </label>
              <div className="mb-2">
                <label htmlFor={`teamMembers[${index}].name`} className="block mb-1 font-medium">
                  Name <span className="text-pink-500">*</span>
                </label>
                <input
                  {...register(`teamMembers[${index}].name`)}
                  type="text"
                  id={`teamMembers[${index}].name`}
                  style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
                  // className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
                 {errors?.teamMembers?.[index]?.name && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                      name is required
                  </span>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor={`teamMembers[${index}].phone`} className="block mb-1 font-medium">
                  Phone <span className="text-pink-500">*</span>
                </label>
                <input
                  {...register(`teamMembers[${index}].phone`)}
                  type="text"
                  id={`teamMembers[${index}].phone`}
                  style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
                  // className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors?.teamMembers?.[index]?.phone  && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    name is required
                </span>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor={`teamMembers[${index}].email`} className="block mb-1 font-medium">
                  Email <span className="text-pink-500">*</span>
                </label>
                <input
                  {...register(`teamMembers[${index}].email`)}
                  type="email"
                  id={`teamMembers[${index}].email`}
                  style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
                  // className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors?.teamMembers?.[index]?.email  && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                      name is required
                  </span>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor={`teamMembers[${index}].aadhar`} className="block mb-1 font-medium">
                  Aadhar <span className="text-pink-500">*</span>
                </label>
                <input
                  {...register(`teamMembers[${index}].aadhar`)}
                  type="text"
                  id={`teamMembers[${index}].aadhar`}
                  style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
                  // className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors?.teamMembers?.[index]?.aadhar && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    name is required
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>)}

      {/**/}
            <div className="flex justify-end items-center  gap-x-2">
                      {editTeam && (
                      <button
                          onClick={() => dispatch(setStep(2))}
                          disabled={loading}
                          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300
                           py-[8px] px-[20px] font-semibold text-richblack-900`}
                      >
                          Continue Wihout Saving
                      </button>
                      )}
                      <IconBtn
                      type={'submit'}
                      onClick={() => dispatch(setStep(2))}
                      disabled={loading}
                      text={!editTeam ? "Next" : "Save Changes"}
                      >
                      <MdNavigateNext/>
                      </IconBtn>
            </div>
    </form>
    </div>
  );
}
