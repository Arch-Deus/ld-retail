"use client"
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

// type ButtonDeleteProp = {
//     itemNo: string,
//     soNumber: string
// }

const ButtonDelete = ({id}: any) => {

    const router = useRouter()

    const deleteItem = async () => {
        const deletesThis = await fetch(process.env.NEXT_PUBLIC_ROOT_URL+"/api/deleteItemList?id="+id, {
            method: "DELETE"
        })

        if(deletesThis.status){
            router.push("/cart")
            router.refresh()
        }
    }

  return (
    <>
        <FaTrashAlt className='cursor-pointer text-red-700' onClick={() => deleteItem()} />
    </>
  )
}

export default ButtonDelete