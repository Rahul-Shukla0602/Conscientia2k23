// import { eventEndpoints } from "../apis";
// import {apiconnector} from '../apiconnector'
// import { toast } from "react-hot-toast"

// const {
//   EVENT_DETAILS_API,
//   EVENT_CATEGORIES_API,
//   GET_ALL_EVENT_API,
//   CREATE_EVENT_API,
//   EDIT_EVENT_API,
//   GET_ALL_INSTRUCTOR_EVENT_API,
//   DELETE_EVENT_API,
//   GET_FULL_EVENT_DETAILS_AUTHENTICATED,
// } = eventEndpoints


// export const fetchEventDetails = async (courseId) => {
//   const toastId = toast.loading("Loading...")
//   //   dispatch(setLoading(true));
//   let result = null
//   try {
//     const response = await apiconnector("POST", EVENT_DETAILS_API, {
//       courseId,
//     })
//     console.log("COURSE_DETAILS_API API RESPONSE............", response)

//     if (!response.data.success) {
//       throw new Error(response.data.message)
//     }
//     result = response.data
//   } catch (error) {
//     console.log("COURSE_DETAILS_API API ERROR............", error)
//     result = error.response.data
//     // toast.error(error.response.data.message);
//   }
//   toast.dismiss(toastId)
//   //   dispatch(setLoading(false));
//   return result
// }

// export const fetchEventCategories = async () => {
//   let result = []
//   try {
//     const response = await apiconnector("GET", EVENT_CATEGORIES_API)
//     // console.log("COURSE_CATEGORIES_API API RESPONSE............", response
//     // )
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch Course Categories")
//     }
//     result = response?.data?.allCategory
//     // console.log("result: ",result)
//   } catch (error) {
//     console.log("COURSE_CATEGORY_API API ERROR............", error)
//     toast.error(error.message)
//   }
//   return result
// }

// // add the course details
// export const addEventDetails = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     // console.log("AFTER CREATE COURSE API RESPONSE............", response)
//     const response = await apiconnector("POST", CREATE_EVENT_API, data, {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("BEFORE CREATE COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Add Course Details")
//     }
//     toast.success("Course Details Added Successfully")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("CREATE COURSE API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }


// // edit the course details
// export const editEventDetails = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", EDIT_EVENT_API, data, {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("EDIT COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Update Course Details")
//     }
//     toast.success("Course Details Updated Successfully")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("EDIT COURSE API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }


