import { cookies } from 'next/headers';
import Image from 'next/image'
import React from 'react'
import * as jose from 'jose'
import Navlinks from './Navlinks';
import SearchAction from './SearchAction';
import SearchForm from './SearchForm';
import prisma from './lib/prisma';
import SideBarButton from './SideBarButton';

export const revalidate = 0

const Navbar = async () => {

    const cookie = cookies().get("Authorization")

    let navlinks = []

    if(!cookie){
        navlinks.push({
            label: "HOME",
            href: "/",
            data: {}
        },{
            label: "SIGN UP / LOGIN",
            href: "/login",
            data: {}
        })
    }else{
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)

        const jwt = cookie.value

        try{
            const { payload } = await jose.jwtVerify(jwt, secret, { })

            let inCart = 0

            const so = await prisma.sales_order.findFirst({
                where: {
                    status: "active",
                    userId: payload.sub
                }
            })
        
            if(so){
                const soList = await prisma.sales_order_list.findMany({
                    where: {
                        soId: so.sales_order_number
                    }
                })

                if(soList && soList.length > 0){
                    inCart = soList.length
                }
            }

            navlinks.push({
                label: "HOME",
                href: "/",
                data: {}
            },{
                label: "MARKETPLACE",
                href: "/marketplace",
                data: {}
            },{
                label: "CART",
                href: "/cart",
                data: {
                    cart: inCart
                }
            },{
                label: "LOGOUT",
                href: "/logout",
                data: {}
            })
        }
        catch(error){
            navlinks.push({
                label: "HOME",
                href: "/",
                data: {}
            },{
                label: "SIGN UP / LOGIN",
                href: "/login",
                data: {}
            })
        }
    }

    // console.log(navlinks)

  return (
    <div className='flex items-center justify-between py-3 md:py-7 px-2 md:px-10'>
        <div className='hidden md:block'>
            <Image src='/logo-LD-Furniture.png' className='w-full h-auto' priority={true} alt='LD Logo' sizes='30vw' width={0} height={0} />
        </div>

        <div className='flex md:hidden relative w-full'>
            <SideBarButton links={navlinks} />
            <div className='w-full grid justify-items-center'><Image className='w-auto h-7' priority={true} sizes='30vw' src='/Logo-LD_text-only.png' alt='LD Logo' width={0} height={0} /></div>
        </div>

        {cookie ? <SearchForm /> : ""}

        <div>
            <Navlinks links={navlinks} />
        </div>
    </div>
  )
}

export default Navbar