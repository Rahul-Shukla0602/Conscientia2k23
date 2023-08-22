import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useForm } from 'react-hook-form';
import './Accomodation.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { addPerson, setgirlminor, setDate, setDetail, clearAccomodation } from '../slices/accomodationSlice'
import { toast } from 'react-hot-toast'
import IconBtn from '../components/common/IconBtn';
import pay_qr from '../assets/payment_qr.jpeg'
import { setLoading } from '../slices/authSlice'
let personno = 0;

export default function Accomodation() {
    const accomodationdata = useSelector((state) => state.accomodation);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { loading } = useSelector((state) => state.auth)
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const [checkoutbtntext, setcheckoutbtn] = useState("Pay and Submit")

    useEffect(() => {
        if (accomodationdata.checkin) {
            document.getElementById(`checkin${accomodationdata.checkin}`).checked = true;
        }
        if (accomodationdata.checkout) {
            document.getElementById(`checkout${accomodationdata.checkout}`).checked = true;
        }
    })

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

    const nexttostep2 = () => {
        if (token) {
            if (accomodationdata.days <= 0) {
                if (accomodationdata.checkin <= 0) {
                    toast.error("Please select Checkin date")
                } else if (accomodationdata.checkout <= 0) {
                    toast.error("Please select Checkout date")
                } else if (accomodationdata.checkin > accomodationdata.checkout) {
                    toast.error("Checkin can not be done after Checkout")
                }
            } else if (accomodationdata.totalperson <= 0) {
                toast.error("Please select at least one person")
            } else {
                dispatch(setLoading(true));
                const toastID = toast.loading("Loading...");
                dispatch(setDetail({ person: 'clear', name: '', phone: '', email: '', aadhar: '' }))
                if (accomodationdata.guardian == 0) {
                    dispatch(setDetail({ person: 'Your Information', name: '', phone: '', email: '', aadhar: '' }))
                } else if (accomodationdata.minor > 0 && accomodationdata.isminorgirl) {
                    dispatch(setDetail({ person: 'Female Guardian', name: '', phone: '', email: '', aadhar: '' }))
                    dispatch(setDetail({ person: 'Male Guardian', name: '', phone: '', email: '', aadhar: '' }))
                } else if (accomodationdata.guardian == 1) {
                    dispatch(setDetail({ person: 'Guardian', name: '', phone: '', email: '', aadhar: '' }))
                } else if (accomodationdata.guardian == 2) {
                    dispatch(setDetail({ person: 'Guardian 1', name: '', phone: '', email: '', aadhar: '' }))
                    dispatch(setDetail({ person: 'Guardian 2', name: '', phone: '', email: '', aadhar: '' }))
                }
                document.getElementById('accostep1').classList.toggle('bg-blue-200');
                document.getElementById('accostep2').classList.toggle('bg-blue-200');
                document.getElementById('noofpersonforacco').classList.toggle('hidden');
                document.getElementById('detailsforacco').classList.toggle('hidden');
                personno = 1;
                dispatch(setLoading(false))
                toast.dismiss(toastID)
            }
        } else {
            toast.error("Please login first")
        }
    }

    const onFormNext = (data) => {
        dispatch(setLoading(true));
        const toastID = toast.loading("Loading...");
        console.log({
            ...data,
            person: accomodationdata.details[personno].person
        });
        dispatch(setDetail({ person: 'update', personno: personno, value: data }))
        if (personno < accomodationdata.details.length - 1) {
            document.getElementById('accomoddetailsform').reset();
            personno++;
        } else {
            // document.getElementById('accomoddetailsform').reset();
            document.getElementById('accostep2').classList.toggle('bg-blue-200');
            document.getElementById('accostep3').classList.toggle('bg-blue-200');
            document.getElementById('detailsforacco').classList.toggle('hidden');
            document.getElementById('checkoutforacco').classList.toggle('hidden');
        }
        dispatch(setLoading(false))
        toast.dismiss(toastID)
    }

    const onFormSubmit = async (data1) => {
        console.log(data1);
        if (token) {
            if (data1.consent) {
                if (data1.eventfree) {
                    dispatch(setLoading(true));
                    const toastID = toast.loading("Loading...");
                    let res = await fetch(`${process.env.REACT_APP_BASE_URL}/accomodation/saveaccomodation`, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            user: user,
                            data: accomodationdata,
                            eventfree: data1.eventfree,
                            paymentID: 'free',
                            paymentStatus: 'success'
                        })
                    })
                    let resjson = await res.json();
                    let resobj = JSON.parse(resjson);
                    if (resobj.status == 'done') {
                        dispatch(setLoading(false))
                        toast.dismiss(toastID)
                        toast.success("Successfully Registered. Check you Email")
                        dispatch(clearAccomodation())
                        personno = 0;
                        document.getElementById('accostep3').classList.toggle('bg-blue-200');
                        document.getElementById('accostep1').classList.toggle('bg-blue-200');
                        document.getElementById('noofpersonforacco').classList.toggle('hidden');
                        document.getElementById('checkoutforacco').classList.toggle('hidden');
                    }
                    console.log(resjson)
                } else {
                    if (data1.payment == '') {
                        toast.error("Please select the payment method")
                    } else if (data1.payment == 'upi') {
                        document.getElementById('upiform').classList.toggle('hidden')
                        document.getElementById('checkoutforacco').classList.toggle('hidden')
                    } else if (data1.payment == 'gateway') {
                        initPayment(data1);
                    }
                }
            } else {
                toast.error("Please accept the declaration")
            }
        } else {
            toast.error("Please Login First")
        }
    }

    const initPayment = async (data1) => {
        dispatch(setLoading(true));
        const toastID = toast.loading("Loading...")

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/accomodation/initpayment`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                amount: accomodationdata.totalcost,
                data: accomodationdata,
                user: user._id
            })
        })

        let resjson = await response.json()
        let resobj = JSON.parse(resjson)
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if (!res) {
            toast.error('Razropay failed to load!!')
            dispatch(setLoading(false));
            toast.dismiss(toastID);
            return
        }

        const options = {
            "key": "rzp_live_7m7zXi9W50G5VO", // Enter the Key ID generated from the Dashboard
            "amount": resobj.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Conscientia 2k23",
            "description": "Payment for Merchandise",
            "image": "https://www.conscientia.co.in/static/media/logo.4be3c95d539b7aa2e736.png",
            "order_id": resobj.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "theme": {
                "color": "#3399cc"
            },
            "handler": function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                afterPayment('success', resobj.mongoid, response);
            },
            "prefill": {
                "name": data1.name,
                "email": data1.email,
                "contact": data1.phone
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
            afterPayment('failure', resobj.mongoid, response);
        })

        paymentObject.open();

        // dispatch(setLoading(false));
        toast.dismiss(toastID);

    }

    const afterPayment = async (status, mongoid, res) => {
        const toastID = toast.loading('Loading...')
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/accomodation/verify`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                orderstatus: status,
                mongoid: mongoid,
                response: res,
                data: accomodationdata,
                user: user
            })
        })
        let resjson = await response.json()

        const dataobj = JSON.parse(resjson);
        toast.dismiss(toastID);
        if (dataobj.status === 1) {
            // console.log("To Clear")
            toast.success(dataobj.msg);
            dispatch(clearAccomodation());
            personno = 0;
            document.getElementById('accostep3').classList.toggle('bg-blue-200');
            document.getElementById('accostep1').classList.toggle('bg-blue-200');
            document.getElementById('noofpersonforacco').classList.toggle('hidden');
            document.getElementById('checkoutforacco').classList.toggle('hidden');
            // dispatch(clearCart({}));
        } else {
            toast.error(dataobj.msg);
        }
        dispatch(setLoading(false));
    }

    const onUPISubmit = async (data) => {
        console.log(data)
        if (data.paymentID == '') {
            toast.error("Please enter the payment ID")
        } else {
            dispatch(setLoading(true));
            const toastID = toast.loading("Loading...");
            let res = await fetch(`${process.env.REACT_APP_BASE_URL}/accomodation/saveaccomodation`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    user: user,
                    data: accomodationdata,
                    eventfree: data.eventfree,
                    paymentID: data.paymentID,
                    paymentStatus: 'pending'
                })
            })
            let resjson = await res.json();
            let resobj = JSON.parse(resjson);
            if (resobj.status == 'done') {
                dispatch(clearAccomodation())
                personno = 0;
                document.getElementById('accostep3').classList.toggle('bg-blue-200');
                document.getElementById('accostep1').classList.toggle('bg-blue-200');
                document.getElementById('noofpersonforacco').classList.toggle('hidden');
                document.getElementById('upiform').classList.toggle('hidden');
                dispatch(setLoading(false))
                toast.dismiss(toastID)
                toast.success("Successfully Registered. Check you Email")
            }
            console.log(resjson)
        }
    }

    const goBack = () => {
        document.getElementById('upiform').classList.toggle('hidden')
        document.getElementById('checkoutforacco').classList.toggle('hidden')
    }

    return (
        <div>
            <section className="bg-slate-900 px-3 py-[270px] lg:py-32 flex flex-col items-center transform -translate-y-[140px] lg:translate-y-[40px] ">
                <span className="text-white text-center font-bold text-4xl">ACCOMODATION</span>
                <div class="text-white w-4/5 sm:w-auto flex mx-auto mt-10 mb-10">
                    <a id='accostep1' class="bg-blue-200 sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t">
                        STEP 1
                    </a>
                    <a id='accostep2' class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t">
                        STEP 2
                    </a>
                    <a id='accostep3' class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t">
                        STEP 3
                    </a>
                </div>
                <div className='accomodform text-white bg-richblack-800 border-[1px] border-richblack-200' id='noofpersonforacco'>
                    <span className='text-sm sm:text-xl'>*CHARGES: ₹100 per person per day<br />*Fill Details of Participants only. Details of Guardians will be taken later.</span>
                    <div className="mt-4 roomdetails">
                        <div className="flex flex-col sm:flex-row items-center justify-around">
                            <div className="mb-4 sm:mb-1 accdates">
                                <span className='checktext'>CHECK IN</span>
                                <div className="flex justify-center" onChange={() => {
                                    dispatch(setDate({ type: 'checkin', value: document.querySelector('input[name="checkin"]:checked').value }))
                                }}>
                                    <label htmlFor="checkin23">
                                        <input type="radio" className='accocheckradio' name="checkin" id="checkin23" value={23} />
                                        <span className='radiotext'>23</span>
                                    </label>
                                    <label htmlFor="checkin24">
                                        <input type="radio" className='accocheckradio' name="checkin" id="checkin24" value={24} />
                                        <span className='radiotext'>24</span>
                                    </label>
                                    <label htmlFor="checkin25">
                                        <input type="radio" className='accocheckradio' name="checkin" id="checkin25" value={25} />
                                        <span className='radiotext'>25</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4 sm:mb-1 accdates">
                                <span className='checktext'>CHECK OUT</span>
                                <div className="flex justify-center" onChange={() => {
                                    dispatch(setDate({ type: 'checkout', value: document.querySelector('input[name="checkout"]:checked').value }))
                                }}>
                                    <label htmlFor="checkout23">
                                        <input type="radio" className='accocheckradio' name="checkout" id="checkout23" value={23} />
                                        <span className='radiotext'>23</span>
                                    </label>
                                    <label htmlFor="checkout24">
                                        <input type="radio" className='accocheckradio' name="checkout" id="checkout24" value={24} />
                                        <span className='radiotext'>24</span>
                                    </label>
                                    <label htmlFor="checkout25">
                                        <input type="radio" className='accocheckradio' name="checkout" id="checkout25" value={25} />
                                        <span className='radiotext'>25</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <span className='text-2xl mt-5 mb-2'>No. of Participants</span>
                        <div className="noofpersons flex-col sm:flex-row items-center flex justify-around">
                            <div className="mb-4 sm:mb-1 text-center">
                                <span className='checktext block text-xl mb-2'>MEN<sup>#</sup></span>
                                <div class="flex text-richblack-50">
                                    <button class="flex ml-auto bg-blue-200 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded" onClick={() => {
                                        dispatch(addPerson({ type: 'men', value: 1 }))
                                    }}><AiOutlinePlus name='plus' color='#ffffff'></AiOutlinePlus></button>
                                    <span class="title-font font-medium text-2xl ml-2 mr-2">{accomodationdata.men}</span>
                                    <button class="flex ml-1 bg-blue-200 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded" onClick={() => {
                                        dispatch(addPerson({ type: 'men', value: -1 }))
                                    }}><AiOutlineMinus name='minus' color='#ffffff'></AiOutlineMinus></button>
                                </div>
                            </div>
                            <div className="mb-4 sm:mb-1 text-center">
                                <span className='checktext block text-xl mb-2'>WOMEN<sup>#</sup></span>
                                <div class="flex text-richblack-50">
                                    <button class="flex ml-auto bg-blue-200 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded" onClick={() => {
                                        dispatch(addPerson({ type: 'women', value: 1 }))
                                    }}><AiOutlinePlus name='plus' color='#ffffff'></AiOutlinePlus></button>
                                    <span class="title-font font-medium text-2xl ml-2 mr-2">{accomodationdata.women}</span>
                                    <button class="flex ml-1 bg-blue-200 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded" onClick={() => {
                                        dispatch(addPerson({ type: 'women', value: -1 }))
                                    }}><AiOutlineMinus name='minus' color='#ffffff'></AiOutlineMinus></button>
                                </div>
                            </div>
                            <div className="mb-4 sm:mb-1 text-center">
                                <span className='checktext block text-xl mb-2'>MINOR<sup>##</sup></span>
                                <div class="flex text-richblack-50">
                                    <button class="flex ml-auto bg-blue-200 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded" onClick={() => {
                                        dispatch(addPerson({ type: 'minor', value: 1 }))
                                    }}><AiOutlinePlus name='plus' color='#ffffff'></AiOutlinePlus></button>
                                    <span class="title-font font-medium text-2xl ml-2 mr-2">{accomodationdata.minor}</span>
                                    <button class="flex ml-1 bg-blue-200 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded" onClick={() => {
                                        dispatch(addPerson({ type: 'minor', value: -1 }))
                                    }}><AiOutlineMinus name='minus' color='#ffffff'></AiOutlineMinus></button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className='switch'>
                                <input type='checkbox' id='isgirlminor' value={true} onChange={() => {
                                    dispatch(setgirlminor({ value: document.getElementById('isgirlminor').checked }))
                                }} />
                                <span className='slider'></span>
                            </label>
                            <span>Girls included in minor?</span>
                        </div>
                        <span className='text-2xl mt-6 mb-2'>Guardian Required: {accomodationdata.guardian} {accomodationdata.guardiantext}</span>
                        <span className='text-2xl mt-4 mb-2'>TOTAL: ₹{accomodationdata.totalcost} {`(${accomodationdata.totalperson} person for ${accomodationdata.days} days)`}</span>
                        <div className="flex justify-center">
                            <button disabled={loading} className='nextbtnacc bg-yellow-50 hover:bg-yellow-400 text-richblack-900' onClick={nexttostep2}>Next</button>
                        </div>
                        <span className='text-sm mt-10 mb-1'>## - Age is less than 18</span>
                        <span className='text-sm mb-2'># - Age is greater than 18</span>
                    </div>

                </div>
                <div className='hidden accomodform' id='detailsforacco'>

                    <form id='accomoddetailsform' onSubmit={handleSubmit(onFormNext)} className="max-w-md text-white lg:max-w-lg mx-auto bg-richblack-800 p-[24px] rounded-xl border-2 border-richblack-400">
                        <span className='block text-center text-xl'>{accomodationdata.details[personno].person}</span>

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
                            <label htmlFor="email" className="block mb-2 font-medium">
                                Email <span className="text-pink-500">*</span>
                            </label>
                            <input
                                {...register("email", { required: "Email is Required" })}
                                type="email"
                                placeholder="email"
                                id="email"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            {errors.email && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="aadhar" className="block mb-2 font-medium">
                                Aadhar <span className="text-pink-500">*</span>
                            </label>
                            <input
                                {...register("aadhar", {
                                    required: "Aadhar is required", minLength: {
                                        value: 12,
                                        message: "Invalid AADHAR"
                                    }
                                })}
                                type="text"
                                id="aadhar"
                                placeholder="aadhar"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" w-full text-richblack-5 px-4 py-2 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
                            // className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            {errors.aadhar && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    {errors.aadhar.message}
                                </span>
                            )}
                        </div>

                        <div className="flex justify-end items-center  gap-x-2">
                            <IconBtn
                                type={'submit'}
                                onClick={() => { }}
                                disabled={loading}
                                text={"Next"}
                            >
                            </IconBtn>
                        </div>
                    </form>

                </div>

                <div className='hidden accomodform' id='checkoutforacco'>

                    <form id='consentform' onSubmit={handleSubmit(onFormSubmit)} className="max-w-md text-white lg:max-w-lg mx-auto bg-richblack-800 p-[24px] rounded-xl border-2 border-richblack-400">

                        <div className="mb-4">
                            <span className='text-2xl mt-4 mb-2'>TOTAL: ₹{accomodationdata.totalcost} {`(${accomodationdata.totalperson} person for ${accomodationdata.days} days)`}</span>
                        </div>
                        <div className="mb-4">
                            <input {...register("eventfree")} name='eventfree' id='eventfree' type='checkbox' className='mr-2' onChange={() => {
                                if (document.getElementById('eventfree').checked) {
                                    setcheckoutbtn("Submit")
                                } else {
                                    setcheckoutbtn("Pay and Submit")
                                }
                            }} />
                            <label htmlFor='consent' className='mb-2 font-medium'>
                                Are you a Participants of Rocketry?
                            </label>
                        </div>
                        <div className="mb-4">
                            <input {...register("consent")} name='consent' type='checkbox' className='mr-2' />
                            <label htmlFor='consent' className='mb-2 font-medium'>
                                I do hereby declare that all the above information given by me are true to the best of my knowledge and belief.
                            </label><span className="text-pink-500">*</span>
                        </div>

                        <div className="mb-4 text-black">
                            <select name='payment' className='w-44 sm:w-auto p-2 rounded' {...register("payment")}>
                                <option value="">Payment Method...</option>
                                <option value="gateway">{`Payment Gateway (No UPI)`}</option>
                                <option value="upi">UPI</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor='payment' className='mb-2 font-medium'>
                                {`*Preferred Method is Gateway (with Cards)`}
                            </label>
                        </div>

                        <div className="flex justify-end items-center gap-x-2">

                            <IconBtn
                                type={'submit'}
                                onClick={() => { alert("Card") }}
                                disabled={loading}
                                text={checkoutbtntext}
                            >
                            </IconBtn>
                        </div>

                    </form>

                </div>

                <div className="hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-[24px]" id='upiform'>
                    <p className="text-2xl font-semibold text-richblack-5">Payment</p>

                    <form onSubmit={handleSubmit(onUPISubmit)}
                        className=' mt-[20px]'
                    >

                        <img src={pay_qr} alt='QR' className=' rounded-lg' />
                        <p className=' text-richblack-5 text-2xl mt-[20px] text-center'><span>UPI ID:{" "}</span>9978944804@paytm</p>
                        <p className=' text-richblack-25 mt-[10px]  text-xl '>
                            Pay {" "}
                            <span className=' text-yellow-5'>{accomodationdata.totalcost}</span>
                            {" "}INR in given QR code.
                        </p>

                        <label className=' form-style text-richblack-5'>
                            <p className=' text-richblack-25 mt-[10px]  text-xl'>Payment ID: </p>
                            <input type='text'
                                placeholder='paymentID'
                                id="paymentID"

                                {...register("paymentID")}
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full mt-3 py-2 text-richblack-5 border border-richblack-600 rounded-md bg-richblack-700 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </label>
                        <div className=' mt-[20px]'>
                            <p className=' text-richblack-5 text-sm lg:text-lg'>Make sure Your payment ID should be correct </p>
                            <p className=' text-richblack-5 text-sm lg:text-lg'>otherwise we will cancel your registeration.</p>
                        </div>

                        <div className="ml-auto flex max-w-max items-center gap-x-4 mt-[10px]">
                            <button
                                onClick={goBack}
                                disabled={loading}
                                type='button'
                                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                            >Back
                            </button>
                            <button
                                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-200 py-[8px] px-[20px] font-semibold text-richblack-900"
                            >Submit</button>
                        </div>

                    </form>

                </div>

            </section>
            <Footer />
        </div>
    )
}
