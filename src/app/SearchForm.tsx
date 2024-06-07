"use client"

import SearchAction from './SearchAction'
import { BiSearchAlt2 } from "react-icons/bi";

const SearchForm = () => {

    async function searchForm(formData: FormData){
        const result = await SearchAction(formData)
    }

  return (
    <div className='w-full pr-5 pl-7 hidden md:block'>
        <form action={searchForm}>
            <input name='keyword' className='rounded-md border-2 border-gray-200 px-5 py-2 w-full' placeholder='Search product here...' />
            <button className="cursor-pointer absolute right-[360px] top-10 text-2xl"><BiSearchAlt2 /></button>
        </form>
    </div>
  )
}

export default SearchForm