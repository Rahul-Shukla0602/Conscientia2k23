import React from 'react'
import './Cart.css'
import 'boxicons'
import { Merchs } from '../data/merchs'
import { useDispatch, useSelector } from 'react-redux'
import { decreasequnatity, increasequantity } from '../slices/cartSlice'
import Footer from '../components/common/Footer'

export default function
    () {

    const cartitems = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    // console.log(cartitems.items)

    return (
        <div>
            <section className="z-20 relative bg-slate-900 text-base text-white font-light pt-32">
                <span className='block w-full text-center font-bold text-4xl'>Shopping Cart</span>
                <section id='cart_container'>
                    <section id='cart_items'>
                        {
                            cartitems.items.map((value, i) => {
                                return (
                                    <div className='cart_items_card'>
                                        <img src={value.img}></img>
                                        <div className='cart_items_text'>
                                            <div class="w-full pr-10 py-6 mb-6 md:mb-0">
                                                <h2 class="text-sm title-font text-gray-500 tracking-widest">{value.brand}</h2>
                                                <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{value.title}</h1>
                                                <div class="flex border-t border-gray-200 py-2">
                                                    <span class="text-gray-500">Color</span>
                                                    <span class="ml-auto text-gray-900">{value.color}</span>
                                                </div>
                                                <div class="flex border-t border-gray-200 py-2">
                                                    <span class="text-gray-500">Size</span>
                                                    <span class="ml-auto text-gray-900">{value.size}</span>
                                                </div>
                                                <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                                                    <span class="text-gray-500">Quantity</span>
                                                    <span class="ml-auto text-gray-900">{value.qty}</span>
                                                </div>
                                                <div class="flex">
                                                    <span class="title-font font-medium text-2xl text-gray-900">₹{value.rate}</span>
                                                    <button class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded" onClick={()=>{
                                                        dispatch(increasequantity({
                                                            ...value,
                                                            index: i
                                                        }))
                                                    }}><box-icon name='plus' color='#ffffff'></box-icon></button>
                                                    <button class="flex ml-1 text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded" onClick={()=>{
                                                        dispatch(decreasequnatity({
                                                            ...value,
                                                            index: i
                                                        }))
                                                    }}><box-icon name='minus' color='#ffffff'></box-icon></button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </section>
                    <section id='cart_total'>
                        <div className='cart_total_card'>
                            <span>Total Items : {cartitems.totalitems}</span>
                            <span>₹{cartitems.totalamount}</span>
                            <button><span>Checkout</span></button>
                        </div>
                    </section>
                </section>
            <Footer />
            </section>
        </div>
    )
}
