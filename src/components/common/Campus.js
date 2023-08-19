import React from 'react'
import { Link } from 'react-router-dom'
import cimage from '../../assets/cp1.png'
import wimage from '../../assets/What_caps.jpeg'
import {AiFillTrophy} from 'react-icons/ai'
import {MdOutlineCardGiftcard} from 'react-icons/md'
import {TbCertificate} from 'react-icons/tb'; // Corrected import
import {BsFillPersonFill} from 'react-icons/bs'
import Footer from '../common/Footer'
const Campus = () => {
  return (
    <div className=' text-richblack-5 pt-[160px] lg:pt-[100px] w-screen'>

      <div className='pl-[20px] lg:pl-[160px] mb-[140px]'> 

       <div className='flex flex-col lg:flex-row justify-center items-center'>
        <div className='w-[350px] lg:w-[600px] flex flex-col mx-auto lg:justify-center gap-[20px] lg:gap-[40px]'>
                <h1 className=' text-3xl lg:text-6xl font-bold lg:font-extrabold font-inter'>CAMPUS <br></br> AMBASSADOR</h1>
                <p className=' font-medium'>Join Conscientia's campus ambassador program and become the face of
                Conscientia2k23, IIST's technical festival in your college and city. Embrace the role of our mascot and champion the event with pride.</p>
                <p className=' font-medium'>Embrace the chance to represent us, enjoy increased visibility, 
                foster connections with fellow campus members, orchestrate impressive events and workshops, and above all, enhance your professional aptitude.</p>
                <p className=' font-medium'>Demonstrate your digital expertise by becoming a campus ambassador in the realm of social media influencers!</p>

                <Link
                to='https://forms.gle/pewx7pmy2XmBwSZv5'
                target='_blank'
                className="bg-yellow-200 w-[200px] text-center text-black font-semibold px-10 lg:px-10 py-3 rounded-lg"
                >Register</Link>
            </div>
            <img src={cimage} alt='' className=''/>
       </div>
       
       <div className='flex flex-col lg:flex-row gap-[50px]  justify-center items-center'>
        <div className=' w-[300px] lg:w-[600px] flex flex-col gap-[20px]'>
            <h1 className=' text-5xl font-bold font-inter'>WHY CA?</h1>
            <p><b>Campus Ambassador</b><br></br> Program can help you improve or learn new skills.
            This program can assist you in developing the following skills:</p>
            <p><b>Networking</b><br></br>The ability to network entails developing and maintaining relationships
            with new contacts.</p>
            <p><b>Strategy development</b><br></br>Developing a strategy can assist you in communicating who your
            organisation is to your target audience in a clear and consistent manner.</p>
            <p><b>Marketing</b><br></br>Strong marketing skills necessitate the ability to generate interesting
            ideas and pitch them to your target audience.</p>
            <p><b>Communication</b>Sharing information with others requires good communication skills.</p>
            <p><b>Leadership</b><br></br>Leadership abilities can assist you in effectively managing a team or an entire organization.</p>
            <p><b>Time management</b><br></br>Increased productivity can result from good time management.</p>
            <p><b>Adaptability</b><br></br>Adaptability is a skill that is defined as the capacity to alter or adapt to new circumstances.</p>
        </div>
        <img src={wimage} alt='' className=' rounded-xl'/>
       </div>

       <div className=' flex flex-col lg:flex-row items-center mt-[30px]'>
            <img src={cimage} alt='' className=' hidden lg:block'/>
            <div className=' flex flex-col gap-14'>
                <h1 className=' text-4xl font-bold font-inter'>CAMPUS AMBASSADOR RULES</h1>
                <ul className=' list-disc flex flex-col gap-4 text-xl font-thin'>
                    <li>You have to share posters/event details/workshop registrations etc through 
                    social media and talk.</li>
                    <li>You will be getting points based on the story/status views you get for the contents.</li>
                    <li>Getting us workshop registrations will also earn you points.</li>
                    <li>A leaderboard will be maintained based on the total points earned by each CA.</li>
                    <li>Winner will be chosen based on the final leaderboard.</li>
                    <li>Any current school/college students can be CAs.</li>
                    <li>There can be up to 3 CAs from an institute.</li>
                    <li>You can share each event posters only twice as per instructions.</li>
                    <li>You are allowed to share only up to 4 posters a day.</li>
                </ul>
            </div>
       </div>
       <div className=' flex flex-col gap-6 mt-[40px]'>
           <h1  className=' text-5xl font-bold font-inter'>INCENTIVES</h1>
           <p className=' flex items-center text-lg gap-4'><AiFillTrophy/><p>Prizes worth Rs. 10000 consisting of merchandise and coupons of top brands.</p></p>
           <p className=' flex items-center text-lg gap-4'><TbCertificate/><p>Certificate of Appreciation from Conscientia2k23, IIST bearing its signature.</p></p>
           <p className=' flex items-center text-lg gap-4'><MdOutlineCardGiftcard/><p>Free Goodies and Hampers from our Title Sponsor</p></p>
           <p className=' flex items-center text-lg gap-4'><BsFillPersonFill/><p>Top performing CAs will get a chance to visit IIST Campus and attend free one workshop at Conscientia2k23.</p></p>
       </div>
       </div>   

       <div className=''>
       <Footer/>
       </div>
    </div>
  )
}

export default Campus
