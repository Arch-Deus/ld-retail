"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { LiaShoppingCartSolid } from "react-icons/lia";

type propLinks = {
    links: {
        label: string,
        href: string,
        data: any
    }[]
}

const Navlinks = ({links}: propLinks) => {

    const currentPath = usePathname()

  return (
    <div>
        <ul className='hidden md:flex font-medium text-sm items-center'>
                {links.map(({label, href, data}) => (
                    <li key={href.toString()} className={currentPath == href ? 'p-2 text-amber-800 font-bold' : 'p-2 text-black'}>{label === "CART" ? <a className='relative' href={href.toString()}><LiaShoppingCartSolid className='text-xl' />{data.cart > 0 ? <span className="absolute inline-flex items-center justify-center w-5 h-5 text-[9px] font-bold text-white bg-red-500 rounded-full -top-2 -end-2 dark:border-gray-900">{data.cart}</span>: ""}</a> : <Link href={href.toString()}>{label}</Link>}</li>
                ))}
        </ul>
    </div>
  )
}

export default Navlinks