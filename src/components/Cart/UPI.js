import React from 'react'
import { useForm } from 'react-hook-form'
import pay_qr from '../../assets/payment_qr.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../slices/authSlice'
import { toast } from "react-hot-toast"
import { clearCart } from '../../slices/cartSlice'

export default function UPI() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loading } = useSelector((state) => state.auth)
    const cartitems = useSelector((state) => state.cart)
    const {user} = useSelector((state)=>state.profile)
    const dispatch = useDispatch();


    const checkoutnext = async (data) => {
        let toastID = toast.loading("Loading")
        dispatch(setLoading(true))

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/merchpayment/upipayment`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                upipaymentid: data.UPIpaymentID,
                user: user,
                data: cartitems
            })
        })
        let resjson = await response.json()
        let resobj = JSON.parse(resjson);
        if(resobj.status === 1){
            toast.success(resobj.msg);
            dispatch(clearCart({}));
            document.getElementById('upiform').classList.toggle('hidden')
            document.getElementById('cart_container').classList.toggle('lg:hidden')
            document.getElementById('cart_container').classList.toggle('hidden')
            document.getElementById('delivery_container').classList.toggle('hidden')
        }else{
            toast.error("Error in Payment")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastID);
    }

    return (
        <div className="hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-[24px]" id='upiform'>
            <p className="text-2xl font-semibold text-richblack-5">Payment</p>

            <form onSubmit={handleSubmit(checkoutnext)}
                className=' mt-[20px]'
            >

                <img src={pay_qr} alt='QR' className=' rounded-lg' />
                <p className=' text-richblack-5 text-2xl mt-[20px] text-center'><span>UPI ID:{" "}</span>9978944804@paytm</p>
                <p className=' text-richblack-25 mt-[10px]  text-xl '>
                    Pay {" "}
                    <span className=' text-yellow-5'>{cartitems.totalamount}</span>
                    {" "}INR in given QR code.
                </p>

                <label className=' form-style text-richblack-5'>
                    <p className=' text-richblack-25 mt-[10px]  text-xl'>Payment ID: </p>
                    <input type='text'
                        placeholder='paymentID'
                        id="paymentID"
                        {...register("UPIpaymentID", {
                            required: "paymentID is required"
                        })}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full mt-3 py-2 text-richblack-5 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </label>
                {errors.UPIpaymentID && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        {errors.UPIpaymentID.message}
                    </span>
                )}
                <div className=' mt-[20px]'>
                    <p className=' text-richblack-5 text-sm lg:text-lg'>Make sure Your payment ID should be correct </p>
                    <p className=' text-richblack-5 text-sm lg:text-lg'>otherwise we will cancel your purchase.</p>
                </div>

                <div className="ml-auto flex max-w-max items-center gap-x-4 mt-[10px]">
                    <button disabled={loading}
                        className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-200 py-[8px] px-[20px] font-semibold text-richblack-900"
                    >Submit</button>

                </div>

            </form>

        </div>

    )
}
