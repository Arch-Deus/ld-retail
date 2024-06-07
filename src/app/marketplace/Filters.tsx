"use client"

import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import {Collapse} from 'react-collapse';
import { FaFilter } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

type filterProp = {
    keyword: String
}

const Filters = ({keyword}: filterProp) => {

    const [open, setOpen] = useState(false)

    const [itemCateogry, setItemCateogry] = useState("")
    const [itemType, setItemType] = useState("")
    const [sort, setSort] = useState("")

    const router = useRouter()

    const toggle = () => {
        if(open){
            setOpen(false)
        }else{
            setOpen(true)
        }
    }

    const filter = () => {
        router.push("/marketplace?keyword="+keyword+"&category="+itemCateogry+"&type="+itemType+"&sort="+sort)
    }

  return (
    <section>
        <div onClick={toggle} className='flex items-center tracking-wider text-xs justify-end font-semibold'>
            <div className='cursor-pointer flex items-center'><FaFilter className='text-md mr-2' /> FILTERS {open ? <MdKeyboardArrowDown className='text-lg' /> : <MdKeyboardArrowRight className='text-lg' />}</div>
        </div>
        
        <Collapse isOpened={open}>
            <div className="grid grid-cols-1 md:grid-cols-4 my-10 items-end text-right justify-end pr-5">
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div className="hidden md:block"></div>
                    <div>
                        <div>
                            <div className="text-xs font-semibold">CATEGORY</div>
                            <div className="mt-2">
                                <select defaultValue={""} onChange={e => setItemCateogry(e.target.value)} name="category" id="category" className="rounded-md w-full text-xs">
                                    <option value="" disabled>Select Item Category</option>
                                    <option value="ACCESSORIES">ACCESSORIES</option>
                                    <option value="ALMARI">ALMARI</option>
                                    <option value="BED">BED</option>
                                    <option value="BUFFET">BUFFET</option>
                                    <option value="CHAIR">CHAIR</option>
                                    <option value="FIREPLACE">FIREPLACE</option>
                                    <option value="SOFA">SOFA</option>
                                    <option value="MEJA">MEJA</option>
                                    <option value="MIRROR">MIRROR</option>
                                    <option value="NIGHTSTAND">NIGHTSTAND</option>
                                    <option value="OTHER">OTHER</option>
                                    <option value="RACK">RACK</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="text-xs font-semibold">TYPE</div>
                            <div className="mt-2">
                                <select defaultValue={""} onChange={e => setItemType(e.target.value)} name="type" id="type" className="rounded-md w-full text-xs">
                                    <option value="" disabled>Select Item Type</option>
                                    <option value="104">FINISHED GOOD - LOOSE FURNITURE</option>
                                    <option value="109">MENTAH-RETAIL</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="text-xs font-semibold">SORT</div>
                            <div className="mt-2">
                                <select defaultValue={""} onChange={e => setSort(e.target.value)} name="sort" id="sort" className="rounded-md w-full text-xs">
                                    <option value="" disabled>Select Sort</option>
                                    <option value="name|asc">Name Ascending</option>
                                    <option value="name|desc">Name Descending</option>
                                    <option value="unitPrice|asc">Price Lowest</option>
                                    <option value="unitPrice|desc">Price Highest</option>
                                    {/* <option value="totalUnit1Quantity|asc">Stock Lowest</option>
                                    <option value="totalUnit1Quantity|desc">Stock Highest</option> */}
                                </select>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div><button onClick={filter} className="px-5 py-2 rounded-md text-white bg-amber-700">Filter</button></div>
                        </div>
                    </div>

            </div>
        </Collapse>
    </section>
  )
}

export default Filters