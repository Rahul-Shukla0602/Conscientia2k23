import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, saveDelivery } from '../../slices/cartSlice'
import { setLoading } from '../../slices/authSlice'
import { toast } from "react-hot-toast"


export default function Instore() {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const { loading } = useSelector((state) => state.auth)
    const { token } = useSelector((state) => state.auth);
    const cartitems = useSelector((state)=> state.cart);
    const { user } = useSelector((state)=> state.profile);
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

    async function afterPayment(status, mongoid, res, data){
        const toastID = toast.loading('Loading...')
        console.log(cartitems.deliverydetails);
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
                deliverydata: {
                    delivery: "instore",
                    data: data
                }
            })
        })
        let resjson = await response.json()

        const dataobj = JSON.parse(resjson);
        if (dataobj.status === 1) {
            // console.log("To Clear")
            toast.success(dataobj.msg);
            dispatch(clearCart({}));
            document.getElementById('instoreform').classList.toggle('hidden')
            document.getElementById('cart_container').classList.toggle('hidden')
            document.getElementById('delivery_container').classList.toggle('hidden')
            document.getElementById('cart_container').classList.toggle('lg:hidden')
        }else{
            toast.error(dataobj.msg);
        }
        toast.dismiss(toastID);
        dispatch(setLoading(false));
    }

    async function doPayment(data){
        const toastID = toast.loading('Loading...');
        dispatch(setLoading(true));
        console.log(data)
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
                        afterPayment('success', dataobj.mongoid, response, data);
                    },
                    "prefill": {
                        "name": user.firstName,
                        "email": user.email,
                        "contact": data.phone
                    }
                };

                const paymentObject = new window.Razorpay(options);

                paymentObject.on('payment.failed', function (response) {
                    // alert(response.error.code);
                    // alert(response.error.description);
                    // alert(response.error.source);
                    // alert(response.error.step);
                    // alert(response.error.reason);
                    // alert(response.error.metadata.order_id);
                    // alert(response.error.metadata.payment_id);
                    afterPayment('failure', dataobj.mongoid, response, data);
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


    const checkoutnext = (data) => {
        console.log(data)
        dispatch(saveDelivery({
            delivery: 'instore',
            data: data
        }))
        if(data.payment === 'gateway'){
            doPayment(data);
        }else if(data.payment === 'upi'){
            document.getElementById('instoreform').classList.toggle('hidden')
            document.getElementById('upiform').classList.toggle('hidden')
        }
    }

    const goBack = () => {
        document.getElementById('cart_container').classList.toggle('hidden')
        document.getElementById('cart_container').classList.toggle('lg:hidden')
        document.getElementById('delivery_container').classList.toggle('hidden')
        document.getElementById('instoreform').classList.toggle('hidden')
    }

    return (
        <div className='hidden accomodform' id='instoreform'>
            <form id='merchinstoreform' onSubmit={handleSubmit(checkoutnext)} className="max-w-md text-white lg:max-w-lg mx-auto bg-richblack-800 p-[24px] rounded-xl border-2 border-richblack-400">
                <span className='block text-center text-xl'>{`In-Store Pickup`}</span>

                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                        Name <span className="text-pink-500">*</span>
                    </label>
                    <input
                        {...register("name", { required: "Name is Required" })}
                        type="text"
                        id="name"
                        placeholder="name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    {errors.name && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            {errors.name.message}
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-2 font-medium">
                        Phone <span className="text-pink-500">*</span>
                    </label>
                    <input
                        {...register("phone", { required: "Phone is Required", minLength: { value: 10, message: "Invalid Phone" } })}
                        type="text"
                        id="phone"
                        placeholder="phone no."
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    {errors.phone && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            {errors.phone.message}
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <select name='payment' className=' text-black font-medium w-44 sm:w-auto p-2 rounded' {...register("payment", { required: "Payment method is required"})}>
                        <option value="">Payment Method...</option>
                        <option value="gateway">{`Payment Gateway (No UPI)`}</option>
                        <option value="upi">UPI</option>
                    </select>
                    {errors.payment && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            {errors.payment.message}
                        </span>
                    )}
                </div>

                <div className="flex justify-end items-center  gap-x-2">
                    <button
                        onClick={goBack}
                        disabled={loading}
                        type='button'
                        className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                    >Back
                    </button>
                    <IconBtn
                        type={'submit'}
                        onClick={() => { }}
                        disabled={loading}
                        text={"Payment"}
                    >
                    </IconBtn>
                </div>
            </form>

        </div>
    )
}
