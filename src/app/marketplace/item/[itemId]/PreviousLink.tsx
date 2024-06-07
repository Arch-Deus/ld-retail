"use client"

import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const PreviousLink = () => {
  return (
    <div><IoArrowBackCircleOutline className='text-4xl cursor-pointer' onClick={useRouter().back} /></div>
  )
}

export default PreviousLink