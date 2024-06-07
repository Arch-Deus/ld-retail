"use client"

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { LiaShoppingCartSolid } from "react-icons/lia";

const ButtonAddToCard = ({item}: any) => {

    const GetModal = dynamic(() => import('@/app/components/Modal'), {
        // ssr: false,
      });

      const [status, setStatus] = useState("")
      const loadingButton = useRef<HTMLButtonElement | null>(null)

      const [dsn, setDsn] = useState({
          type: "",
          message: ""
      })

    async function addToCart(){
        if(loadingButton.current){
            loadingButton.current.innerHTML = `Loading... <CgSandClock />`
        }

        const fetchAddToCart = await fetch("/api/addtocart", {
            method: "POST",
            body: JSON.stringify({
                item_no: item.d.no,
                item_name: item.d.name,
                price: item.d.unitPrice
            })
        })

        const resultFetchAddToCart = await fetchAddToCart.json()

        if(!resultFetchAddToCart.status){
            setStatus("error")

            setDsn({
                type: "error",
                message: resultFetchAddToCart.message
            })

            if(loadingButton.current){
                loadingButton.current.innerHTML = `Add to cart`
            }
        }
        else{

            // revalidatePath("/cart")

            setDsn({
                type: "success",
                message: "Congratulations, item has added to cart"
            })

            setStatus("success")

        }

        // console.log(resultFetchAddToCart)
    }

    
  return (
    <div>
        <button ref={loadingButton} onClick={addToCart} className='rounded-md bg-green-500 p-2 mt-5 text-white flex items-center'><LiaShoppingCartSolid className='mr-1 text-lg' /> Add to cart</button>
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
    </div>
    
  )
}

export default ButtonAddToCard