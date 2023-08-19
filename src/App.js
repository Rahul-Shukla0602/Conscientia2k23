import { Route, Routes } from "react-router-dom";
import React from "react";
import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Preloader from "./components/common/Preloader";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Error from './pages/Error'
import Sponsers  from "./pages/Sponsers";
import ContactUs  from "./pages/ContactUs";
import MyProfile from "./components/DashBoard/myProfile";
import DashBoard from "./pages/DashBoard";
import { useSelector } from "react-redux";
import Event  from "./pages/Event";
import { ACCOUNT_TYPE } from "./utils/constant";
import AddEvent from "./components/DashBoard/addEvent";
import MyEvents from "./components/DashBoard/MyEvents";
import EditEvent from "./components/DashBoard/EditEvent";
import EventDetails from "./pages/EventDetails";
// import  RegistrationForm  from "./components/RegisterEvent/index";
// import FinalEvent from "./components/RegisterEvent/FinalEvent";
import RenderRegister from "./components/RegisterEvent/RenderRegister";
import Merchandise from "./pages/Merchandise";
import Cart from "./pages/Cart";
import TermsAndCondition from "./pages/TermsAndCondition";
import Privacypolicy from "./pages/Privacypolicy";
import Shippingpolicy from "./pages/Shippingpolicy";
import CancellationAndRefund from "./pages/CancellationAndRefund";
import Campus from "./components/common/Campus";

function App() {
  const [preloader, setPreloader] = useState("visible");
  const [maincontent, setmaincontent] = useState("hidden");
  const { user } = useSelector((state) => state.profile)
  // const {loading} = useSelector((state) => state.profile)
  setTimeout(() => {
    setPreloader("hidden");
    setmaincontent("visible");
  }, 4000);
  // if(loading){
  //   setTimeout(() => {
  //     setPreloader("hidden");
  //     setmaincontent("visible");
  //   }, 4000);
  // }

  return (
    <>
      <div className={preloader}>
        <Preloader />
      </div>
      <div className={maincontent}>
        <div className="app-container gap-4 max-w-screen min-h-screen relative">
          <Background />
          <div className="content-container">
          <div className="navbar-container">
            <Navbar />
          </div>

            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<Signup/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/verify-email" element={<VerifyEmail/>}></Route>
              <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
              <Route path="/update-password/:id" element={<UpdatePassword/>}></Route>
              <Route path="/about" element={<About/>}></Route>
              <Route path="/sponsor" element={<Sponsers/>}></Route>
              <Route path="/contactus" element={<ContactUs/>}></Route>
              <Route path="*" element={<Error/>}></Route>
              <Route path="/events/:eventId" element={<EventDetails/>}/>
              <Route path="/terms" element={<TermsAndCondition/>}/>
              <Route path="/privacy" element={<Privacypolicy/>}/>
              <Route path="/shipping" element={<Shippingpolicy/>}/>
              <Route path="/cancellation" element={<CancellationAndRefund/>}/>
              <Route path="/campus_ambassador" element={<Campus/>}/>
              {/* <Route path="/event/registerEvent/:eventId" element={<RegistrationForm/>}/> */}
              <Route path="/event/registerEvent/:eventId" element={<RenderRegister/>}/> 
              <Route path="/merchandise" element={<Merchandise/>}></Route>
              <Route path="/cart" element={<Cart/>}></Route>
              {/* <Route path="/event" element={<TestingSchool/>}></Route> */}
              <Route element={<DashBoard/>}>
                              <Route path="/dashboard/my-profile" element={<MyProfile/>}/>      
                  { user?.accountType === ACCOUNT_TYPE.ORGANIZER && (
                    <>
                      <Route path="/dashboard/add-event" element={<AddEvent/>}/>
                      <Route path="/dashboard/my-event" element={<MyEvents/>} />
                       <Route path="dashboard/edit-event/:eventId" element={<EditEvent/>} />
                    </>
                  )}
              </Route>
              <Route path="/event" element={<Event/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

