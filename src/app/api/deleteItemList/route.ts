import prisma from "@/app/lib/prisma"


export async function DELETE(req: Request){
  const {searchParams} = new URL(req.url)
  const id = Number(searchParams.get('id'))

  const deleteItem = await prisma.sales_order_list.delete({
    where: {
        id: id
    }
  })

  if(deleteItem){
    return Response.json({
        status: true,
        message: "Item is deleted successfuly"
    })
  }else{
    return Response.json({
        status: false,
        message: "Fail to delete item"
    })
  }
}