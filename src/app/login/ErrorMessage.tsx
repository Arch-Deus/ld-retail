"use server"

import { revalidatePath } from "next/cache";
import { PiWarningFill } from "react-icons/pi";
               
type errorProp = {
    error: String
}

const ErrorMessage = ({error}: errorProp) => {
    

    revalidatePath("/login")
  return (
    <div>
        {error != "" ? <p className={`transition-all duration-200   mt-5 justify-center text-red-600 flex items-center gap-1`}><PiWarningFill /> {error}</p> : ""}
    </div>
  )
}

export default ErrorMessage