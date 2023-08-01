import React from 'react'

const IconBtn = ({
  text,
  onclick,
  disabled,
  outline=false,
  customClasses,
  type,
  // children,
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onclick}
    className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent text-yellow-50" : "bg-yellow-50"
        } cursor-pointer rounded-md px-2 py-2 font-semibold text-richblack-900 ${customClasses}`}
    type={type}    
    >
      {
        text
      }
    </button>
  )
}

export default IconBtn
