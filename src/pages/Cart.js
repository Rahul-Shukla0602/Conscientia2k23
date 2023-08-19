import React from 'react'
import './Cart.css'
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineMinus} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { 
    clearCart, 
    decreasequnatity, increasequantity } from '../slices/cartSlice'
import Footer from '../components/common/Footer'
import { setLoading } from '../slices/authSlice'
import { toast } from "react-hot-toast"


const Cart = ()=>{

    const cartitems = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.auth);
    const {user} = useSelector((state)=> state.profile);
    const dispatch = useDispatch();

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    
    const checkoutbtn = async () => {
        console.log("button clicked")
        const toastID = toast.loading('Loading...');
        dispatch(setLoading(true));
        if(token){
            if (cartitems.totalitems !== 0 && cartitems.totalamount !== 0) {
                let response = await fetch(`${process.env.REACT_APP_BASE_URL}/merchpayment/init`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount: cartitems.totalamount,
                        items: cartitems.items,
                        qty: cartitems.totalitems
                    })
                })
                // console.log("RESPONSE: ",response);
                let resjson = await response.json()
    
                const dataobj = JSON.parse(resjson);
    
                const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    
                if (!res) {
                    toast.error('Razropay failed to load!!')
                    dispatch(setLoading(false));
                    toast.dismiss(toastID);
                    return
                }
                
                console.log("script loaded")
                const options = {
                    "key": process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
                    "amount": dataobj.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "Conscientia 2k23",
                    "description": "Payment for Merchandise",
                    "image": "https://www.conscientia.co.in/static/media/logo.4be3c95d539b7aa2e736.png",
                    "order_id": dataobj.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "theme": {
                        "color": "#3399cc"
                    },
                    "handler": function (response) {
                        // alert(response.razorpay_payment_id);
                        // alert(response.razorpay_order_id);
                        // alert(response.razorpay_signature)
                        afterPayment('success', dataobj.mongoid, response);
                    },
                    "prefill": {
                        "name": user.firstName,
                        "email": user.email,
                        "contact": +919191919191
                    }
                };
                console.log(options)
                
                const paymentObject = new window.Razorpay(options);
                
                paymentObject.on('payment.failed', function (response) {
                    // alert(response.error.code);
                    // alert(response.error.description);
                    // alert(response.error.source);
                    // alert(response.error.step);
                    // alert(response.error.reason);
                    // alert(response.error.metadata.order_id);
                    // alert(response.error.metadata.payment_id);
                    afterPayment('failure', dataobj.mongoid, response);
                })
                
                paymentObject.open();
                
            } else {
                toast.error("Cart is empty")
            }
        }else{
            toast.error("Please login first")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastID);
        
    }
    
    const afterPayment = async (status, mongoid, res) => {
        const toastID = toast.loading('Loading...')
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/merchpayment/verify`,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                orderstatus: status,
                mongoid: mongoid,
                response: res,
                userdata: user,
                paymentreport: res
            })
        })
        let resjson = await response.json()
        
        const dataobj = JSON.parse(resjson);
        if (dataobj.status === 1) {
            // console.log("To Clear")
            toast.success(dataobj.msg);
            dispatch(clearCart({}));
        }else{
            toast.error(dataobj.msg);
        }
        toast.dismiss(toastID);
        dispatch(setLoading(false));
    }
    
    

    return (
        <div className=''>
            <section className="z-20 relative text-base text-white font-light pt-32">
                <span className='block w-full text-center font-bold text-4xl'>Shopping Cart</span>
                <section id='cart_container' className=''>
                    <section id='cart_items' className=''>
                        {
                            cartitems.items.map((value, i) => {
                                return (
                                    <div className='cart_items_card bg-richblack-800 text-richblack-100 border-[1px] border-richblack-200'>
                                        <img src={value.img} alt='cartitem'></img>
                                        <div className='cart_items_text'>
                                            <div class="w-full pr-10 py-6 mb-6 md:mb-0">
                                                {/* <h2 class="text-sm title-font text-gray-500 tracking-widest">{value.brand}</h2> */}
                                                <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{value.title}</h1>
                                                <div class="flex border-t border-gray-200 py-2">
                                                    <span class="text-gray-500">Color</span>
                                                    <span class="ml-auto text-gray-900">{value.color}</span>
                                                </div>

                                                <div class="flex border-t border-gray-200 py-2">
                                                    <span class="text-gray-500">Size</span>
                                                    <span class="ml-auto text-gray-900">{value.size}</span>
                                                </div>

                                                {/* merch price */}
                                                <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                                                    <span class="text-gray-500">Quantity</span>
                                                    <span class="ml-auto text-gray-900">{value.qty}</span>
                                                </div>
                                                {/* quantity increase decrease */}
                                                <div class="flex text-richblack-50">
                                                    <span class="title-font font-medium text-2xl">₹{value.rate}</span>
                                                    <button class="flex ml-auto bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded" onClick={() => {
                                                        dispatch(increasequantity({
                                                            ...value,
                                                            index: i
                                                        }))
                                                    }}><AiOutlinePlus name='plus' color=''></AiOutlinePlus></button>
                                                    <button class="flex ml-1 bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded" onClick={() => {
                                                        dispatch(decreasequnatity({
                                                            ...value,
                                                            index: i
                                                        }))
                                                    }}><AiOutlineMinus name='minus' color=''></AiOutlineMinus></button>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </section>
                    <section id='cart_total'>
                        <div className='cart_total_card bg-richblack-800 text-richblack-100 border-[1px] border-richblack-200'>
                            <span>Total Items : {cartitems.totalitems}</span>
                            <span>₹{cartitems.totalamount}</span>
                            <button
                            className='bg-yellow-200 rounded-xl text-richblack-800 border-[1px] border-richblack-200'
                            onClick={checkoutbtn} 
                            id='rzp'><span>Checkout</span></button>
                        </div>
                    </section>
                </section>
                <Footer />
            </section>
        </div>
    )
}

export default Cart