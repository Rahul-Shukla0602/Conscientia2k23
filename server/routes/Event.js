const express = require("express")
const router = express.Router()

const {
    createEvent,
    getAllEvents,
    getEventByID,
  } = require("../controllers/Event")
  
  // Categories Controllers Import
  const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
  } = require("../controllers/Category")
  
  
  const { auth, isOrganizer, isParticipant, isAdmin } = require("../middlewares/auth")
  
  // ********************************************************************************************************
  //                                      Event routes
  // ********************************************************************************************************
  
  router.post("/createEvent", auth,isOrganizer , createEvent)
  router.get("/getAllEvents", getAllEvents)
  router.post("/getEventByID", getEventByID)
  
  // ********************************************************************************************************
  //                                      Category routes (Only by Admin)
  // ********************************************************************************************************
  // 
  // TODO: Put IsAdmin Middleware here
  router.post("/createCategory", auth, isAdmin, createCategory)
  router.get("/showAllCategories", showAllCategories)
  router.post("/getCategoryPageDetails", categoryPageDetails)
  
  
  module.exports = router