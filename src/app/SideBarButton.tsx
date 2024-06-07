"use client"

import { PiList } from "react-icons/pi";
import Link from "next/link";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import SearchAction from "./SearchAction";

type propLinks = {
    links: {
        label: string,
        href: string,
        data: any
    }[]
}

const SideBarButton = ({links}: propLinks) => {

    const router = useRouter()

    const currentPath = usePathname()

    const [isOpen, setIsOpen] = useState(false)

    const [keyword, setKeyword] = useState("")

    const toggleSidebar = () => {
        if(isOpen){
            setIsOpen(false)
        }else{
            setIsOpen(true)
        }
    }

    const setKeywords = (keywords: string) => {
        setKeyword(keywords)
    }

    async function searchForm(formData: FormData){
        const result = await SearchAction(formData)
    }

    const goTo = (link: string) => {
        setIsOpen(false)

        router.push(link)
        router.refresh()
    }

  return (
    <>
        <div onClick={() => toggleSidebar()} className='absolute top-1/2 -translate-y-1/2'>
            <PiList  />
        </div>

        <div className={`absolute z-[9999] top-0 ${isOpen ? `left-0` : `left-[-100%]`} w-full h-full block md:hidden`}>
            <div onClick={() => toggleSidebar()} className={`fixed top-0 w-full h-full duration-500 transition-all ${isOpen ? ` bg-black/30 backdrop-blur-md left-0` : ` bg-black/0 left-[-100%]`}`}></div>
            <div className={`fixed top-0 ${isOpen ? `left-0` : `left-[-75%]`} transition-all duration-500 w-3/4 h-full bg-white text-black`}>
                <div className='mx-5 my-5'>
                    <form action={searchForm}>
                        <input name="keyword" onChange={e => setKeywords(e.target.value)} className='rounded-md border-[1px] border-zinc-500 p-2 w-full' placeholder='Search product here...' />
                        <button className="cursor-pointer absolute right-7 top-7 text-2xl"><BiSearchAlt2 /></button>
                    </form>
                </div>
                <div className="my-5">
                    {links.map(({label, href, data}) => (
                        <Link key={href} onClick={() => goTo(href)} href={href} ><div className="flex p-4 text-zinc-900 text-l border-b-2 font-semibold border-zinc-200 hover:text-zinc-500">{label}{label == "LOGOUT" ? <TbLogout className="text-xl ml-2" /> : ""}</div></Link>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default SideBarButton