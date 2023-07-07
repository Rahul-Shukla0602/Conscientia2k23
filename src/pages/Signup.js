import React from 'react'
import Template from '../components/Auth/Template'
import signupImg from '../assets/image/Signup.jpeg'
const Signup = () => {
  return (
    <Template
      title="Join us at Conscientia and embark on an exciting adventure."
      description1="Embrace the future of technology and equip yourself with skills that transcend time"
      description2="unlock the tools and knowledge"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
