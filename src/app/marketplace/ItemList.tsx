import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ItemList = (props:any) => {
    // console.log(props.connection.connection)
    // console.log(props.data)
  return (
    <div>
        <div className='px-5 md:px-20 grid grid-cols-2 md:grid-cols-4'>
            {props.data ? props.data.map((item:any) => {
                return(
                    <Link className='border-[1px] border-gray-300 p-5' key={item.d.id} href={"/marketplace/item/"+item.d.id+"?host="+props.connection.host+"&token="+props.connection.token+"&session="+props.connection.session}>
                        <div>
                                <div><span className={item.d.availableToSell > 0 ? " p-2 text-white text-[9px] md:text-xs bg-lime-600" : " p-2 text-white text-[9px] md:text-xs bg-black"}>{item.d.availableToSell > 0 ? "STOCK : "+item.d.availableToSell+" PCS" : "SOLD OUT"}</span> </div>
                                <div className='mt-5'><Image className='w-full h-auto border-0' src={item.d.detailItemImage.length > 0 ? props.connection.host+item.d.detailItemImage[0].fileName+"?access_token="+props.connection.token+"&session="+props.connection.session : "/default_item.png"} width={0} height={0} alt="" sizes="100vw" /></div>
                                <div className='text-center font-light text-xs md:text-sm mt-5 break-words'>{item.d.name}</div>
                                <div className='text-center font-semibold'>Rp {item.d.unitPrice.toLocaleString("id")}</div>
                            
                        </div>
                    </Link>
                )
            }) : ""}
        </div>
    </div>
  )
}

export default ItemList