import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest){
    const {searchParams} = new URL(req.url)

    const itemId = searchParams.get("id")

    const connection = await prisma.connections.findFirst({
        where: {
            name: "accurate"
        }
    })

    if(!connection){
        return Response.json({
            status: false
        }) 
    }

    if(connection.host == null || connection.codes == null || connection.session == null || connection.token == null){
        return Response.json({
            status: false
        }) 
    }

    const fetchGetDetailItem = await fetch(connection.host+"/accurate/api/item/detail.do?id="+itemId, {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+connection.token,
            "X-SESSION-ID": connection.session
        }
    })

    const resultGetDetailItem = await fetchGetDetailItem.json()

    if(!resultGetDetailItem.s){
        return Response.json({
            status: false
        })
    }

    return Response.json({
        status: true,
        data: resultGetDetailItem
    })
}