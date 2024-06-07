"use client"

import { redirect } from 'next/navigation'
import React from 'react'
import { useFormState } from 'react-dom'
import signupAction from './signupAction'
import { PiWarningFill } from "react-icons/pi";

const Signup = () => {

    const [error, formAction] = useFormState(signupAction, undefined)

  return (
    <div className='w-full flex h-[80vh]'>
        <div className='m-auto w-full p-10 md:p-5 md:w-[420px]'>
            <form action={formAction}>
                <div className='font-bold text-xl'>Signup</div>
                <div className='mt-5 text-sm'>Name <span className='text-red-500'><sup>*</sup></span></div>
                <div><input type='text' name='name' className='w-full border-2 border-gray-300 rounded-md py-2 px-4 mt-2' /> </div>
                <div className='mt-5 text-sm'>Email <span className='text-red-500'><sup>*</sup></span></div>
                <div><input type='email' name='email' className='w-full border-2 border-gray-300 rounded-md py-2 px-4 mt-2' /> </div>
                <div className='mt-5 text-sm'>Password <span className='text-red-500'><sup>*</sup></span></div>
                <div><input type='password' name='password' className='w-full border-2 border-gray-300 rounded-md py-2 px-4 mt-2' /> </div>
                <div className='mt-5 text-sm'>Re-enter Password <span className='text-red-500'><sup>*</sup></span></div>
                <div><input type='password' name='re-password' className='w-full border-2 border-gray-300 rounded-md py-2 px-4 mt-2' /> </div>
                <div><button type='submit' className='mt-5 rounded-md bg-lime-600 text-white w-full text-sm font-bold py-3'>SUBMIT</button></div>
            </form>
            {error && <p className='mt-5 justify-center text-red-600 flex items-center gap-1'><PiWarningFill /> {error}</p>}
        </div>
    </div>
  )
}

export default Signup