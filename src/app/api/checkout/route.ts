import prisma from "@/app/lib/prisma"

function formatDate(date: any) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}


export async function POST(req: Request){
    const body = await req.json()

    const connection = await prisma.connections.findFirst({
        where: {
            name: "accurate"
        }
    })

    if(connection && connection.host != null && connection.token != null && connection.session != null && connection.codes != null){

        const salesOrder = await prisma.sales_order.findFirst({
            where: {
                sales_order_number: body.sales_order_number
            }
        })

        if(!salesOrder){
            return
        }

        const salesOrderList = await prisma.sales_order_list.findMany({
            where: {
                soId: salesOrder.sales_order_number
            }
        })

        if(!salesOrderList){
            return
        }

        let items: any = []
        let counter = 0;

        salesOrderList.map((key) => {
            items[counter] = {
                itemNo: key.item_no,
                quantity: key.quantity,
                unitPrice: key.price,
                departmentName: "Produksi Retail",
                projectNo: "KTR-002"
            } 
            counter++
        })

 
        const fetchSalesOrder = await fetch(connection.host+"/accurate/api/sales-order/save.do", {
            method: "POST",
            headers: {
                "Authorization": "Bearer "+connection.token,
                "X-SESSION-ID": connection.session,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "customerNo": salesOrder.customerNo,
                "number": salesOrder.sales_order_number,
                "transDate": formatDate(Date.now()),
                "detailItem": items
            })
        })

        const resultFetchSalesOrder = await fetchSalesOrder.json()

        if(!resultFetchSalesOrder.s){
            return Response.json({
                status: false,
                message: resultFetchSalesOrder.d
            })
        }

        const updateSalesOrder = await prisma.sales_order.update({
            where: {
                sales_order_number: body.sales_order_number
            },
            data:{
                status: "checked out"
            }
        })

        if(!updateSalesOrder){
            return Response.json({
                status: false,
                message: ["Failed to update sales order"]
            })
        }

        return Response.json({
            status: true,
            message: ["Success to update sales order"]
        })

        // return Response.json(JSON.stringify({
        //     "customerNo": salesOrder.customerNo,
        //     "number": salesOrder.sales_order_number,
        //     "transDate": formatDate(Date.now()),
        //     "detailItem": items}))

    }
    else{
        return Response.json({
            status: false,
            message: ["Cannot establish connection to accurate"]
        })
    }
}