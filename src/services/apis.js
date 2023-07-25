const BASE_URL = process.env.REACT_APP_BASE_URL;
// AUTH ENDPOINTS
export const endpoints={
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API:BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const eventEndpoints = {
    GET_ALL_EVENT_API: BASE_URL + "/event/getAllEvents",
    EVENT_DETAILS_API: BASE_URL + "/event/getEventByID",
    EDIT_EVENT_API: BASE_URL + "/event/editEvent",
    EVENT_CATEGORIES_API: BASE_URL + "/event/showAllCategories",
    CREATE_EVENT_API: BASE_URL + "/event/createEvent",
    GET_ALL_ORGANIZER_EVENT_API: BASE_URL + "/event/getOrganizerEvent",
    DELETE_EVENT_API: BASE_URL + "/event/deleteEvent",
    GET_FULL_EVENT_DETAILS_AUTHENTICATED: BASE_URL + "/event/getFullEventDetails",
}

//CATEGORIE API
export const categories = {
    CATEGORIES_API : BASE_URL + '/event/showAllCategories',
}

export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/event/getCategoryPageDetails",
  }
