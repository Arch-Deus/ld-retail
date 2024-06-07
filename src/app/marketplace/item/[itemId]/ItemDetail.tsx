"use client"

import React, { useState } from 'react'
import ButtonAddToCard from './ButtonAddToCard'
import PreviousLink from './PreviousLink'
import CarouselItem from './CarouselItem'
import { revalidatePath, revalidateTag } from 'next/cache'

const ItemDetail = ({connection, item, similarItem}: any) => {

    let category = ""
    let finishing = ""
    let description = ""

    const [selectedItem, setSelectedItem] = useState(item.d.no)
    const [submitedItem, setSubmitedItem] = useState(item)
    const [itemId, setItemId] = useState(item.d.id)
    const [itemNo, setItemNo] = useState(item.d.no)
    const [quantity, setQuantity] = useState(item.d.availableToSell)
    const [width, setWidth] = useState(item.d.dimWidth)
    const [height, setHeight] = useState(item.d.dimHeight)
    const [depth, setDepth] = useState(item.d.dimDepth)
    const [notes, setNotes] = useState(item.d.notes)
    const [price, setPrice] = useState(item.d.unitPrice)

    // console.log(submitedItem)

    if(notes){
      const splitDescription = notes.split("]")
      if(splitDescription.length == 4){
        category = splitDescription[0].split("[CATEGORY : ")[1]
        finishing = splitDescription[1].split("[FINISHING : ")[1]
        description = splitDescription[2].split("[DESCRIPTION : ")[1]
      }
    }

    function selectItem(key: any){
        setSelectedItem(key.d.no)
        setSubmitedItem(key)
        setItemId(key.d.id)
        setItemNo(key.d.no)
        setNotes(key.d.notes)
        setPrice(key.d.unitPrice)
        setQuantity(key.d.availableToSell)
    }

    // console.log(similarItem)

    let listSimilarItem: any = []

    similarItem.map((key: any) => {
        if(key.d.notes){
            const splitNotes = key.d.notes.split("]")

            if(splitNotes.length == 4){
                const variant = splitNotes[1].split("[FINISHING : ")[1].split("]")[0]

                if(variant != ""){
                    listSimilarItem.push({
                        variant: variant,
                        no: key.d.no,
                        allData: key
                    })
                }
            }
        }
    })

    // console.log(itemId)


  return (
    <>
    <div className='m-5'><PreviousLink /></div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
        <div className='col-span-2'>
          <div className='flex justify-end'><span className={quantity > 0 ? " p-2 text-white text-xs bg-lime-600" : " p-2 text-white text-xs bg-black"}>{quantity > 0 ? "READY STOCK" : "SOLD OUT"}</span> </div>

          <CarouselItem connection={connection} itemId={itemId} />
      
        </div>
        <div className='p-5'>
          <div className='font-semibold text-3xl text-wrap break-words'>{item.d.name}</div>
          <div className='text-xl text-wrap break-words'>{itemNo}</div>
          <div className='grid grid-cols-4 gap-2 mt-5'>
            {
                listSimilarItem.length > 0 ?
                    listSimilarItem.map((key: any) => (
                        <div key={key.no} onClick={() => selectItem(key.allData)} className={`hover:text-amber-600 hover:border-amber-600 hover:font-bold hover:border-2 text-xs py-1 px-3 items-center flex text-center cursor-pointer rounded-md  ${key.no === selectedItem ? `border-amber-700 text-amber-700 font-bold border-2` : `border-black border-[1px] text-black font-normal`}`}>{key.variant}</div>
                    ))
                :
                ""
            }
          </div>
          <div className='mt-10 text-sm font-light'>{description}</div>
          <section className='mt-10 text-sm'>
              <div className='flex justify-between border-b-[1px] border-b-gray-200 py-1'>
                  <div>Dimension</div>
                  <div>W {width} x H {height} x D {depth} cm</div>
              </div>
              <div className='flex justify-between border-b-[1px] border-b-gray-200 py-1'>
                  <div>Stock</div>
                  <div>{quantity} pcs</div>
              </div> 
              <div className='flex justify-between border-b-[1px] border-b-gray-200 py-1 text-lg font-bold'>
                  <div>Price</div>
                  <div>Rp {price.toLocaleString("id")}</div>
              </div>
              <div><ButtonAddToCard item={submitedItem} /></div>
          </section>
        </div>
      </div>
    </>
  )
}

export default ItemDetail