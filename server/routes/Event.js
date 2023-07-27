const express = require("express")
const router = express.Router()

const {
    createEvent,
    getAllEvents,
    getEventByID,
    editEvent,
    getOrganizerEvents,
    deleteEvent
  } = require("../controllers/Event")
  
  // Categories Controllers Import
  const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
  } = require("../controllers/Category")

  const {
    registerEvent
  } = require('../controllers/Participant')
  
  
  const { auth, isOrganizer, isParticipant, isAdmin } = require("../middlewares/auth")
  
  // ********************************************************************************************************
  //                                      Event routes
  // ********************************************************************************************************
  
  router.post("/createEvent", auth,isOrganizer , createEvent)
  router.get("/getAllEvents", getAllEvents)
  router.post("/getEventByID", getEventByID)
  router.post("/editEvent",auth,isOrganizer,editEvent)
  router.get("/getOrganizerEvent",auth,isOrganizer,getOrganizerEvents)
  router.delete("/deleteEvent", deleteEvent)
  router.post("/registerEvent",registerEvent)
  
  // ********************************************************************************************************
  //                                      Category routes (Only by Admin)
  // ********************************************************************************************************
  // 
  // TODO: Put IsAdmin Middleware here
  router.post("/createCategory", auth, isAdmin, createCategory)
  router.get("/showAllCategories", showAllCategories)
  router.post("/getCategoryPageDetails", categoryPageDetails)
  
  
  module.exports = router