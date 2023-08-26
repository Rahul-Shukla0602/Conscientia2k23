import React from 'react'
import './Cart.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {
    // clearCart, 
    addDeliveryCharge,
    decreasequnatity, increasequantity, removeDeliveryCharge
} from '../slices/cartSlice'
import Footer from '../components/common/Footer'
import { useForm } from 'react-hook-form'
import IconBtn from '../components/common/IconBtn'
import { setLoading } from '../slices/authSlice'
import { toast } from "react-hot-toast"
import Instore from '../components/Cart/Instore'
import Delivery from '../components/Cart/Delivery'
import UPI from '../components/Cart/UPI'


const Cart = () => {

    const cartitems = useSelector((state) => state.cart)
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const { loading } = useSelector((state) => state.auth)
    const { token } = useSelector((state) => state.auth);
    const {user} = useSelector((state)=> state.profile);
    const dispatch = useDispatch();

    

    // const checkoutbtn = async () => {
    //     console.log("button clicked")
    //     const toastID = toast.loading('Loading...');
    //     dispatch(setLoading(true));
    //     if(token){
    //         if (cartitems.totalitems !== 0 && cartitems.totalamount !== 0) {
    //             let response = await fetch(`${process.env.REACT_APP_BASE_URL}/merchpayment/init`, {
    //                 method: 'POST',
    //                 mode: 'cors',
    //                 headers: {
    //                     'content-type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     amount: cartitems.totalamount,
    //                     items: cartitems.items,
    //                     qty: cartitems.totalitems
    //                 })
    //             })
    //             // console.log("RESPONSE: ",response);
    //             let resjson = await response.json()

    //             const dataobj = JSON.parse(resjson);

    //             const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    //             if (!res) {
    //                 toast.error('Razropay failed to load!!')
    //                 dispatch(setLoading(false));
    //                 toast.dismiss(toastID);
    //                 return
    //             }

    //             console.log("script loaded")
    //             const options = {
    //                 "key": process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
    //                 "amount": dataobj.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //                 "currency": "INR",
    //                 "name": "Conscientia 2k23",
    //                 "description": "Payment for Merchandise",
    //                 "image": "https://www.conscientia.co.in/static/media/logo.4be3c95d539b7aa2e736.png",
    //                 "order_id": dataobj.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //                 "theme": {
    //                     "color": "#3399cc"
    //                 },
    //                 "handler": function (response) {
    //                     // alert(response.razorpay_payment_id);
    //                     // alert(response.razorpay_order_id);
    //                     // alert(response.razorpay_signature)
    //                     afterPayment('success', dataobj.mongoid, response);
    //                 },
    //                 "prefill": {
    //                     "name": user.firstName,
    //                     "email": user.email,
    //                     "contact": +919191919191
    //                 }
    //             };
    //             console.log(options)

    //             const paymentObject = new window.Razorpay(options);

    //             paymentObject.on('payment.failed', function (response) {
    //                 // alert(response.error.code);
    //                 // alert(response.error.description);
    //                 // alert(response.error.source);
    //                 // alert(response.error.step);
    //                 // alert(response.error.reason);
    //                 // alert(response.error.metadata.order_id);
    //                 // alert(response.error.metadata.payment_id);
    //                 afterPayment('failure', dataobj.mongoid, response);
    //             })

    //             paymentObject.open();

    //         } else {
    //             toast.error("Cart is empty")
    //         }
    //     }else{
    //         toast.error("Please login first")
    //     }
    //     dispatch(setLoading(false));
    //     toast.dismiss(toastID);

    // }

    // const afterPayment = async (status, mongoid, res) => {
    //     const toastID = toast.loading('Loading...')
    //     let response = await fetch(`${process.env.REACT_APP_BASE_URL}/merchpayment/verify`,{
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             orderstatus: status,
    //             mongoid: mongoid,
    //             response: res,
    //             userdata: user,
    //             paymentreport: res
    //         })
    //     })
    //     let resjson = await response.json()

    //     const dataobj = JSON.parse(resjson);
    //     if (dataobj.status === 1) {
    //         // console.log("To Clear")
    //         toast.success(dataobj.msg);
    //         dispatch(clearCart({}));
    //     }else{
    //         toast.error(dataobj.msg);
    //     }
    //     toast.dismiss(toastID);
    //     dispatch(setLoading(false));
    // }

    const checkoutnext = (data) => {
        console.log(data)
        if(token){
            if(cartitems.totalamount>0 && cartitems.totalitems>0){
                if(data.merchdelivery == 'delivery'){
                    document.getElementById('cart_container').classList.toggle('hidden')
                    document.getElementById('cart_container').classList.toggle('lg:hidden')
                    document.getElementById('delivery_container').classList.toggle('hidden')
                    document.getElementById('deliveryform').classList.toggle('hidden')
                }else if(data.merchdelivery == 'instore'){
                    document.getElementById('cart_container').classList.toggle('hidden')
                    document.getElementById('cart_container').classList.toggle('lg:hidden')
                    document.getElementById('delivery_container').classList.toggle('hidden')
                    document.getElementById('instoreform').classList.toggle('hidden')
                }
            }else{
                toast.error("Cart is empty")
            }
        }else{
            toast.error("Please login first")
        }
    }

    const onselectchange = (data)=>{
        console.log(data.target.value)
        if(data.target.value === 'delivery'){
            dispatch(addDeliveryCharge({
                charge: 100
            }))
        }else{
            dispatch(removeDeliveryCharge({
                charge: 100
            }))
        }
    }

    return (
        <div className=''>
            <section className="z-20 relative text-base text-white font-light pt-32">
                <span className='block w-full text-center font-bold text-4xl'>Shopping Cart</span>
                <section id='cart_container' className='lg:grid flex'>
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
                        <form onSubmit={handleSubmit(checkoutnext)} className='cart_total_card bg-richblack-800 text-richblack-100 border-[1px] border-richblack-200'>
                            <span>Total Items : {cartitems.totalitems}</span>
                            <span>₹{cartitems.totalamount}</span>
                            <span>{(cartitems.deliveryfee)?"*included ₹100 delivery fee":""}</span>
                            <div className='flex justify-center'>
                                <select name='merchdelivery' id='merchdelivery' {...register('merchdelivery',{
                                    onChange: onselectchange
                                })} onChange={onselectchange} className='text-black font-normal p-2 rounded'>
                                    <option value="instore" selected={!(cartitems.deliveryfee)}>In-Store Pickup</option>
                                    <option value="delivery" selected={(cartitems.deliveryfee)}>Outside Delivery</option>
                                </select>
                            </div>
                            <button
                                className='bg-yellow-100 hover:bg-yellow-300 rounded-xl text-richblack-800 border-[1px] border-richblack-200'
                                type='submit'
                                id='rzp'><span>Checkout</span></button>
                        </form>
                    </section>
                </section>
                <section id='delivery_container' className='hidden flex bg-slate-900 px-3 py-[270px] lg:py-32 flex-col items-center transform -translate-y-[140px] lg:translate-y-[-40px] '>
                <Instore/>
                <Delivery/>
                <UPI/>
                </section>
                <Footer />
            </section>
        </div>
    )
}

export default Cart