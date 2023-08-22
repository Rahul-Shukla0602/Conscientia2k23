import {userEndpoints} from '../apis'
import { toast } from "react-hot-toast";
import {apiconnector} from "../apiconnector"
import rzpLogo from "../../assets/image/logo.png" 
import { setPaymentLoading } from "../../slices/eventSlice";
import { clearCart} from "../../slices/cartSlice";

const {EVENT_PAYMENT_API,
       EVENT_VERIFY_API,
       SEND_PAYMENT_SUCCESS_EMAIL_API
      } = userEndpoints;

      function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
    
            script.onload = () => {
                resolve(true);
            }
            script.onerror= () =>{
                resolve(false);
            }
            document.body.appendChild(script);
        })
    }
    
    
    export async function buyEvent(token,events,number,teamId,userDetails, navigate, dispatch) {
        const toastId = toast.loading("Loading...");
        try{
            //load the script
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    
            if(!res) {
                toast.error("RazorPay SDK failed to load");
                return;
            }
    
            //initiate the orde
            console.log("HELLOJI!1")
            const orderResponse = await apiconnector("POST", EVENT_PAYMENT_API, 
                                    {events,number,teamId},
                                    {
                                        Authorization: `Bearer ${token}`,
                                    })
                                    console.log("HELLOJI!2")
            if(!orderResponse.data.success) {
                throw new Error(orderResponse.data.message);
            }
            console.log("HELLOJI!3")
            console.log("PRINTING orderResponse", orderResponse);
            console.log("HELLOJI!4")
            //options
            const options = {
                key: "rzp_live_7m7zXi9W50G5VO",
                currency: orderResponse.data.message.currency,
                amount: `${orderResponse.data.message.amount}`,
                order_id:orderResponse.data.message.id,
                name:"Conscientia",
                description: "Thank You for Rgistering in the event",
                image:rzpLogo,
                prefill: {
                    name:`${userDetails.firstName}`,
                    email:userDetails.email
                },
                handler: function(response) {
                    //send successful wala mail
                    sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
                    //verifyPayment
                    console.log(response)
                    verifyPayment({...response, events, teamId}, token, navigate, dispatch);
                }
            }
            //miss hogya tha 
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            paymentObject.on("payment.failed", function(response) {
                toast.error("oops, payment failed");
                console.log(response.error);
            })
    
        }
        catch(error) {
            console.log("PAYMENT API ERROR.....", error);
            toast.error("Could not make Payment");
        }
        toast.dismiss(toastId);
    }
    
    async function sendPaymentSuccessEmail(response, amount, token) {
        try{
            const emailres =  await apiconnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },{
                Authorization: `Bearer ${token}`
            })
            console.log("emailres: ",emailres)
            return emailres;
        }
        catch(error) {
            console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
        }
    }
    
    //verify payment
    async function verifyPayment(bodyData, token, navigate, dispatch) {
        const toastId = toast.loading("Verifying Payment....");
        dispatch(setPaymentLoading(true));
        try{
            const response  = await apiconnector("POST", EVENT_VERIFY_API, bodyData, {
                Authorization:`Bearer ${token}`,
            })
    
            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("payment Successful, you are addded to the event");
            navigate("/dashboard/enrolled-events");
            dispatch(clearCart());
        }   
        catch(error) {
            console.log("PAYMENT VERIFY ERROR....", error);
            toast.error("Could not verify Payment");
        }
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
    }