import prisma from "@/app/lib/prisma"
import { revalidatePath } from "next/cache"


export async function POST(req: Request, res: Response){
    const body = await req.json()


    async function newItem(so_number: string){

        const checkItem = await prisma.sales_order_list.findFirst({
            where: {
                soId: so_number,
                item_no: body.item_no
            }
        })

        if(checkItem){

            try{

                const updateItem = await prisma.sales_order_list.update({
                    where: {
                        id: checkItem.id
                    },
                    data: {
                        quantity: checkItem.quantity+1
                    }
                })
                
                if(updateItem){
                    return Response.json({status: true, message: "Success to update item"})
                }

                Response.json({status: false, message: "Failed to update item"})

            }catch(error){
                return Response.json({status: false, message: "Failed to update item"})
            }

        }
        else{
            try{
                const createNewItem = await prisma.sales_order_list.create({
                    data: {
                        item_no: body.item_no,
                        item_name: body.item_name,
                        price: body.price,
                        soId: so_number,
                        quantity: 1
                    }
                })

                if(createNewItem){
                    revalidatePath("/cart")
                    return Response.json({status: true, message: "Success to create item"})
                }

                return Response.json({status: false, message: "Failed to create item"})
            }catch(error){
                return Response.json({status: false, message: "Failed to create item"})
            }
        }
    }

    try{
        
        const checkActiveSo = await prisma.sales_order.findFirst({
            where: {
                status: "active",
                userId: "clv205yud0000q1ncf4qnfxzz"
            }
        })

        const date = new Date()

        const checkTotalSo = await prisma.sales_order.findFirst({
            where: {
                sales_order_number: {
                    contains: 'LD/JPR/RTL-WEB/'+date.getMonth()+'/'+date.getFullYear()
                }
            },
            orderBy: [
                {
                    sales_order_number: 'desc'
                }
            ]
        })

        let so_counter = null

        if(!checkTotalSo){
            so_counter = 1
        }else{
            const splitSO = checkTotalSo.sales_order_number.split("/")

            so_counter = Number(splitSO[5]) + 1
        }

        // console.log(so_counter)
        // console.log(checkTotalSo)

        if(!checkActiveSo){
            const newSo = await prisma.sales_order.create({
                data:{
                    sales_order_number: "LD/JPR/RTL-WEB/"+date.getMonth()+"/"+date.getFullYear()+"/"+(so_counter),
                    customerNo: "C.00018",
                    status: "active",
                    userId: "clv205yud0000q1ncf4qnfxzz"
                }
            })

            if(!newSo){
                return Response.json({status: false, message: "Failed to create new sales order"})
            }

            return newItem(newSo.sales_order_number)
            
        }else{
            return newItem(checkActiveSo.sales_order_number)
        }


    }catch(error){
        return Response.json({status: false, message: "Failed to fetch sales order "+JSON.stringify(error)})
    }


    
}