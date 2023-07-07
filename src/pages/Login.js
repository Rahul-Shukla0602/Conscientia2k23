import React from 'react'
import Template from '../components/Auth/Template'
import loginImg from '../assets/image/login.jpeg'
const Login = () => {
  return (
    <Template
      title="Welcome Back"
      description1="Embrace the future of technology and equip yourself with skills that transcend time"
      description2="unlock the tools and knowledge"
      image={loginImg}
      formType="login"
    />
  )
}

export default Login