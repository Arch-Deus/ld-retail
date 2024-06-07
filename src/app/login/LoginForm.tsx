"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegAddressBook } from "react-icons/fa";
import { PiPassword } from "react-icons/pi";
import { LoginAction } from './LoginAction';
import { PiWarningFill } from "react-icons/pi";

type connectionProp = {
    connection: String
}

const LoginForm = ({connection}: connectionProp) => {

    // const [errorStatus, setErrorStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    // const [hidden, setHidden] = useState(true)

     async function userLogin (formData: FormData) {
        
        const result = await LoginAction(formData)
        
        if(!result.status){
            // setErrorStatus(true)
            setErrorMessage(result.message)
        }
        // else{
        //     setErrorMessage("")
        // }
        
    } 

    // const {pending} = useFormStatus()

  return (
    <main>
        <div className='w-full flex h-[80vh]'>
            <div className='m-auto w-full p-10 md:p-5 md:w-[420px]'>
                <div className='font-bold text-xl'>LOGIN</div>
                <form action={userLogin}>
                    <div className='mt-5 text-sm'>Email <span className='text-red-500'><sup>*</sup></span></div>
                    <div><input type="email" name="email" className='w-full border-2 border-gray-300 rounded-md py-2 px-4 mt-2' /> </div>
                    <div className='mt-5 text-sm'>Password <span className='text-red-500'><sup>*</sup></span></div>
                    <div><input type="password" name="password" className='w-full border-2 border-gray-300 rounded-md py-2 px-4 mt-2' /> </div>
                    <div><button className='mt-5 rounded-md bg-lime-600 text-white w-full text-sm font-bold py-3'>LOG IN</button></div>
                    <div className='grid grid-cols-2 justify-between mt-5'>
                        <div className='text-sm'><Link className='flex items-center gap-1' href="/signup" ><FaRegAddressBook /> <span>Signup</span></Link></div>
                        {/* <div className='text-sm justify-end'><Link className='flex gap-1 items-center justify-end' href="/"> Lost your password? <PiPassword /></Link></div> */}
                    </div>
                </form>
        {errorMessage ? <p className={`transition-all duration-200  mt-5 justify-center text-red-600 flex items-center gap-1`}><PiWarningFill /> {errorMessage}</p> : ""}
            </div>
        </div>
    </main>
  )
}

export default LoginForm