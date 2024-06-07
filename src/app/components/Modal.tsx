"use client";
import { PiCheckCircle } from "react-icons/pi";
import { VscError } from "react-icons/vsc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

type modalProp = {
    data: {
        type: String,
        message: String
    }
}

function Modal({data}: modalProp) {
    
    const [display, setDisplay] = useState(data.type == "success" ? true : false)

    const router = useRouter()

    function closeButton(){
        // revalidatePath("/", "layout")
        router.push("/cart")
        // setDisplay(false)
        router.refresh()
    }

    return (
        <>
        {
            display && 
            <dialog
                className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-30 z-50 overflow-auto backdrop-blur-sm flex justify-center items-center">
                <div className="bg-white m-auto p-8 w-96 rounded-md">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-9xl">
                            {data.type == "success" ? <PiCheckCircle className="text-green-500" /> : <VscError />}
                        </div>
                        <div className="my-5 flex items-center text-center">{data.message}</div>
                        <div><button onClick={closeButton} type="button" className="bg-blue-500 text-white p-2 rounded-md">Close</button></div>
                    </div>
                </div>
            </dialog>
        }
        </>
    );
}

export default Modal;