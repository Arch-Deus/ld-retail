import Image from 'next/image'
import React from 'react'
import ButtonAddToCard from './ButtonAddToCard'
import PreviousLink from './PreviousLink'
import { Carousel } from 'flowbite-react'
import axios from 'axios'
import CarouselItem from './CarouselItem'
import ItemDetail from './ItemDetail'

export const revalidate = 0


export default async function Item ({params, searchParams}: {
  searchParams: {
    host: string, 
    token: string, 
    session: string
  },
  params: {
    itemId: number, 
  }
}) {

    const fetchGetDetailItem = await fetch(searchParams.host+"/accurate/api/item/detail.do?id="+params.itemId, {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+searchParams.token,
            "X-SESSION-ID": searchParams.session
        }
    })

    const resultFetchGetDetailItem = await fetchGetDetailItem.json()
    // console.log(resultFetchGetDetailItem.d.detailItemImage.length)
    // console.log(resultFetchGetDetailItem)

    if(!resultFetchGetDetailItem.s){
      return
    }



    let search_params: any = {
      "fields": "id,name,no,notes",
      "filter.keywords.op": "EQUAL",
      "filter.keywords.val": resultFetchGetDetailItem.d.name,
      "filter.suspended": false,
    }

    const parameters = new URLSearchParams(search_params)

    try{
      const res = await fetch(searchParams.host+"/accurate/api/item/list.do?"+parameters.toString(), {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+searchParams.token,
              "X-SESSION-ID" : searchParams.session
          },
          // body: JSON.stringify({email, password})
      })

      const json = await res.json()

      // console.log(json)

      let similarItem = []

      if(json.s && json.d.length > 0){
        const generateItems = json.d.map(async (key:any) => {
          // const paramsDetailItem = new URLSearchParams({
          //     "id": key.id,
          // })

          return axios.get(searchParams.host+"/accurate/api/item/detail.do?id="+key.id, {
            headers: {
                  "Content-Type": "application/json",
                  "Authorization" : "Bearer "+searchParams.token,
                  "X-SESSION-ID" : searchParams.session
              },
          })
          .then(res => {
              // itemList.push(res.data)
              return res.data
          })
          
        })

        similarItem = await Promise.all(generateItems)

        // console.log(similarItem.length)

      }

      return (
        <>
          <ItemDetail connection={searchParams} item={resultFetchGetDetailItem} similarItem={similarItem} />
        </>
      )

      // console.log(similarItem)

      // if(similarItem.length > 0){
      //   similarItem.map((key) => 
      //     console.log(key.d.notes))
      // }

      // console.log(json)

    }catch(error){
      return
    }

  
}
