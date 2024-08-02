"use client"

import { Carousel } from 'flowbite-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type CarouselItemProp = {
    connection: {
        host: string,
        token: string,
        session: string,
    },
    itemId: number
}

const CarouselItem = ({connection, itemId}: CarouselItemProp) => {

    // console.log("ini item id : "+itemId)

    const [data, setData] = useState<any>(null)

    useEffect(() => {

        let host = ""

        if(process.env.NODE_ENV == "development"){
            host = process.env.NEXT_PUBLIC_ROOT_URL as string
        }else{
            host = "https://ldfurniture.co.id"
        }

        const fetchGetDetailItem = fetch(host+"/api/getItemDetail?id="+itemId, {
            method: "GET"
        }).then((res) => res.json()).then(
            (data) => {
                setData(data)
            }
        )

    }, [itemId])

    if(data){

        // console.log(data)

        return (
            <div className='mt-5 p-0 md:p-10'>
                {/* <div>{JSON.stringify(data)}</div> */}
                <div className="h-56 md:h-[560px]">
                    <Carousel>
                    {
                        data.data.d.detailItemImage.length > 0 ? 
                        data.data.d.detailItemImage.map((key: any) => (
                            <Image priority key={key.id} className='w-full h-full' src={connection.host+key.fileName+"?access_token="+connection.token+"&session="+connection.session} width={0} height={0} alt="" sizes="100vw" />
                            // <div>{searchParams.host+key.fileName+"?access_token="+searchParams.token+"&session="+searchParams.session}</div>
                            // <img src={searchParams.host+resultFetchGetDetailItem.d.detailItemImage[0].fileName+"?access_token="+searchParams.token+"&session="+searchParams.session} width={0} height={0} alt="" sizes="100vw" />
                        ))
                        :
                        <Image className='w-full h-full' src={"/default_item.png"} priority width={0} height={0} alt="" sizes="1000vw" />
                    }
                    </Carousel>
                </div>
            </div>
        )
    }else{
        return
    }
}

export default CarouselItem