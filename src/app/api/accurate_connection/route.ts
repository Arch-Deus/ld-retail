import prisma from "@/app/lib/prisma"


export async function GET(){
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

    const fetchDbConnection = await fetch("https://account.accurate.id/api/open-db.do?id=687355", {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+connection.token
        }
    })

    const jsonFetchDbConnection = await fetchDbConnection.json()

    if(!jsonFetchDbConnection.s){
        return Response.json({
            status: false
        }) 
    }

    return Response.json({
        test: "aaaa",
        status: true,
        data: jsonFetchDbConnection
    }) 
}