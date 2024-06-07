
import { Getuser } from '../Getuser';
import { RiAlarmWarningFill } from "react-icons/ri";
import { LiaShoppingCartSolid } from "react-icons/lia";
import ButtonCheckOut from './ButtonCheckOut';
import prisma from '../lib/prisma';
import ButtonDelete from './ButtonDelete';

export const revalidate = 0

function noData(){
    return (
        <div className='mt-5 px-5'>
            <table className='w-full'>
                <thead>
                    <tr className='border-b-2 border-b-gray-200'>
                        <th className='py-3'>PRODUCT</th>
                        <th className='py-3'>PRICE</th>
                        <th className='py-3'>QUANTITY</th>
                        <th className='py-3'>SUB TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-red-500'>
                        <td colSpan={4} className='text-center font-bold py-5'>No items in this cart</td>
                    </tr>
                    <tr className='border-t-2 border-t-gray-200'>
                        <td colSpan={4}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


const Cart = async () => {

    const getuser = await (await Getuser()).json()
    
    try{
        const fetchActiveSalesOrder = await prisma.sales_order.findFirst({
            where: {
                status: "active",
                userId: getuser.data.id
            }
        })

        if(fetchActiveSalesOrder){
            try{
                const fetchListItems = await prisma.sales_order_list.findMany({
                    where: {
                        soId: fetchActiveSalesOrder.sales_order_number
                    }
                })

                // console.log(fetchListItems.length)

                if(fetchListItems.length > 0){
                    let total = 0

                    fetchListItems.map((key: any) => {
                        total += (key.quantity * key.price)
                    })


                    return (
                        <main className='p-5 md:p-10'>
                            <div className='text-2xl px-5 font-semibold flex items-center'>SHOPPING CART <LiaShoppingCartSolid className='text-4xl ml-2' /></div>
                        
                            <div>
                                <div className='text-md px-5 md:flex items-center'>
                                    <div>Sales Order Number : </div>
                                    <div className='text-blue-500 md:pl-2'>{fetchActiveSalesOrder.sales_order_number}</div>
                                </div>
                                <div className='mt-5 px-5'>
                                    <table className='w-full'>
                                        <thead>
                                            <tr className='border-b-2 border-b-gray-200'>
                                                <th className='py-3'>PRODUCT</th>
                                                <th className='py-3'>PRICE</th>
                                                <th className='py-3'>QUANTITY</th>
                                                <th className='py-3'>SUB TOTAL</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fetchListItems.map((key: any) => (
                                                <tr key={key.item_no} className='my-2 text-sm'>
                                                    <td className='py-5'>
                                                        <div className='font-bold'>{key.item_name}</div>
                                                        <div className='text-xs'>({key.item_no})</div>
                                                    </td>
                                                    <td className='py-5 text-center'>Rp {key.price.toLocaleString("id")}</td>
                                                    <td className='py-5 text-center'>{key.quantity}</td>
                                                    <td className='py-5 text-center font-bold'>Rp {(key.quantity * key.price).toLocaleString("id")}</td>
                                                    <td className='text-center'><ButtonDelete id={key.id} /></td>
                                                </tr>
                                            ))}
                                            <tr className='border-t-2 border-t-gray-200'>
                                                <td><div className='mt-5'><ButtonCheckOut soId={fetchActiveSalesOrder.sales_order_number} /></div></td>
                                                <td></td>
                                                <td className='py-5 text-lg font-extrabold text-center'>TOTAL</td>
                                                <td className='py-5 text-lg font-extrabold text-center'>Rp {total.toLocaleString("id")}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </main> 
                    )
                }else{
                   return noData()
                }
            }catch(error){
                return
            }
        }else{
            return noData()
        }
    }catch(error){
        return
    }


}

export default Cart