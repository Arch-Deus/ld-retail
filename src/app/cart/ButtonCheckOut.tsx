"use client"

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import dynamic from 'next/dynamic';
import { CgSandClock } from "react-icons/cg";
import { revalidatePath } from "next/cache";



type soIdProp = {
    soId: String
}

const ButtonCheckOut = ({soId}: soIdProp) => {

    const GetModal = dynamic(() => import('../components/Modal'), {
        // ssr: false,
      });

    const router = useRouter()

    const [errorMessage, setErroMessage] = useState("")
    const [status, setStatus] = useState("")
    const [disable, setDisable] = useState(false)

    const loadingButton = useRef<HTMLButtonElement | null>(null)

    const [dsn, setDsn] = useState({
        type: "",
        message: ""
    })


    async function checkOut(){

        if(loadingButton.current){
            loadingButton.current.innerHTML = `Loading... <CgSandClock />`
        }
   
        const fetchCheckOut = await fetch("/api/checkout",{
            method: "POST",
            body: JSON.stringify({
                sales_order_number: soId
            })
        })

        const resultFetchCheckOut = await fetchCheckOut.json()

        if(!resultFetchCheckOut.status){
            let message: string = ""
            resultFetchCheckOut.message.map((key: any) => {
                message += `${key}\n`
            })

            // const createDiv = document.createElement("div")
            // createDiv.innerHTML = message
            // if(errorRef.current){
            //     errorRef.current.innerHTML = ""
            //     errorRef.current.appendChild(createDiv)
            // }

            setStatus("error")

            setDsn({
                type: "error",
                message: message
            })

            if(loadingButton.current){
                loadingButton.current.innerHTML = `Proceed to Check Out`
            }
        }
        else{

            // revalidatePath("/cart")

            setDsn({
                type: "success",
                message: "Congratulations, your order has been submitted"
            })

            setStatus("success")

        }
    }

  return (
    <div>
        <div><button disabled={disable} ref={loadingButton} onClick={checkOut} className='rounded-md p-2 bg-green-500 text-white flex items-center'>Proceed to Check Out</button></div>
        {
            status == "success" && 
            <div>
                <GetModal data={dsn} />
            </div>
        }
        {
            status == "error" &&
            <div className="mt-5 text-red-500 font-semibold">
                {dsn.message}
            </div>
        }
        {/* <GetModal data={{type: "success", message: "success message"}} /> */}
        
        {/* <Modal data={{type: "success", message: "success message"}} /> */}
        
    </div>
  )
}

export default ButtonCheckOut