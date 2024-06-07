import prisma from "@/app/lib/prisma";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest){

    const {searchParams} = new URL(req.url)

    if(searchParams.get("user")){

        try{
            const activeCart = await prisma.sales_order.findFirst({
                where: {
                    status: "active",
                    userId: searchParams.get("user")?.toString()
                }
            })

            if(activeCart){

                try{
                    const listItems = await prisma.sales_order_list.findMany({
                        where: {
                            soId: activeCart.sales_order_number
                        }
                    })

                    if(listItems.length > 0){
                        return Response.json({
                            status: true,
                            message: "Items are in cart",
                            data: {activeCart, listItems}
                        })
                    }else{
                        return Response.json({
                            status: false,
                            message: "No item in this cart",
                            data: {}
                        })                        
                    }

                   

                }catch(error){
                    return Response.json({
                        status: false,
                        message: "Database connection failed",
                        data: {}
                    })
                }

            }else{
                return Response.json({
                    status: false,
                    message: "No item in this cart",
                    data: {}
                })
            }
        }catch(error){
            return Response.json({
                status: false,
                message: "Database connection failed",
                data: {}
            })
        }
    }else{
        return Response.json({
            status: false,
            message: "Missing parameter \"user\"",
            data: {}
        })
    }
    
    
}