import React from 'react'
import prisma from '../lib/prisma'
import axios from 'axios'
import ItemList from './ItemList'
import Link from 'next/link'
import { PiWarningFill } from "react-icons/pi";
import Filters from './Filters'
import Image from 'next/image'
import PreviousLink from './item/[itemId]/PreviousLink'

async function getConnection() {

    const connection = await prisma.connections.findFirst({
        where: {
            name: "accurate"
        }
    })

    // console.log(connection)

    return connection
}

async function getItem(page: String, keyword: String, category: String, type: String, sort: String) {
    let connection = await getConnection()


    if(connection){
        if(connection.host != null && connection.session != null && connection.token != null && connection.codes != null){

            // ITEM CATEGORY : 
            // { name: 'FINISHED GOOD - LOOSE FURNITURE', id: 104 },
            // { name: 'MENTAH-RETAIL', id: 109 },

            let search_params: any = {
                "sp.pageSize": "8",
                "sp.page": page || "1",
                "filter.suspended": false,
            }


            if(keyword && keyword != null){
                const keywords = {
                    "filter.keywords.op": "CONTAIN",
                    "filter.keywords.val[0]": keyword
                }
                search_params = {
                    ...search_params,
                    ...keywords
                }
            }


            if(category && category != null){
                const categories = {
                    "filter.keywords.op": "CONTAIN",
                    "filter.keywords.val[1]": "[CATEGORY : "+category+"]"
                }
                search_params = {
                    ...search_params,
                    ...categories
                }
            }


            if(type && type != null){
                const types = {
                    "filter.itemCategoryId.op": "EQUAL",
                    "filter.itemCategoryId.val": type
                }
                search_params = {
                    ...search_params,
                    ...types
                }
            }else{
                const types = {
                    "filter.itemCategoryId.op": "EQUAL",
                    "filter.itemCategoryId.val[0]": 104,
                    "filter.itemCategoryId.val[1]": 109
                }
                search_params = {
                    ...search_params,
                    ...types
                }
            }

            if(sort && sort != null){
                const sorts = {
                    "sp.sort": sort
                }
                search_params = {
                    ...search_params,
                    ...sorts
                }
            }

            const params = new URLSearchParams(search_params)

            // console.log(search_params)


            try{

                const res = await fetch(connection.host+"/accurate/api/item/list.do?"+params.toString(), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization" : "Bearer "+connection.token,
                        "X-SESSION-ID" : connection.session
                    },
                    // body: JSON.stringify({email, password})
                })

                const json = await res.json()

                // console.log(json)

                if(!res.ok){
                    return {s: false, data: "Failed to retrieve data from accurate"}
                }
                
                if(json.s){
                    if(json.d.length > 0){

                        const generateItems = json.d.map(async (key:any) => {
                            // const paramsDetailItem = new URLSearchParams({
                            //     "id": key.id,
                            // })

                            return axios.get(connection.host+"/accurate/api/item/detail.do?id="+key.id, {
                                headers: {
                                                "Content-Type": "application/json",
                                                "Authorization" : "Bearer "+connection.token,
                                                "X-SESSION-ID" : connection.session
                                            },
                                        })
                                    .then(res => {
                                        // itemList.push(res.data)
                                        return res.data
                                    })
                            
                        })

                        // Promise.all(generateItems).then(() => {
                            // console.log(itemList)
                        return {s: true, data: await Promise.all(generateItems), pageData: json}
                        
                    }else{
                        return {s: false, data: "No data"}
                    }
                }else{
                    return {s: false, data: "No data"}
                }

                return {}
            }catch(error){
                return {s: false, data: "Cannot retrieve items data from accurate. "+JSON.stringify(error)}
            }

            // console.log(jsonConnection)
            // console.log(json)
        }else{
            return {s: false, data: "Incomplete connection data to accurate"}
        }
    }
    else{
        return {s: false, data: "Failed to establish connection to accurate"}
    }

}

type searchParamsProp = {
    searchParams: {
        page: String,
        keyword: String,
        category: String,
        type: String,
        sort: String
    }
}

const Marketplace = async ({searchParams}: searchParamsProp) => {
    const keyword = searchParams.keyword || ""
    const category = searchParams.category || ""
    const type = searchParams.type || ""
    const sort = searchParams.sort || ""
    const items: any = getItem(searchParams.page, keyword, category, type, sort)
    const connection = getConnection()

    const newSearchParams = "keyword="+keyword+"&category="+category+"&type="+type+"&sort="+sort

    const [listItem, listConnection] = await Promise.all([items, connection])
    const currentPage:number = Number(searchParams.page) || 1
       
    let leadingNavPage = []
    if(currentPage > 1){
        for(let i = currentPage - 5; i < currentPage; i++){
            if(i > 0){ 
                leadingNavPage.push(i)
            }
        }
    }

    let followingNavPage = []
    if(listItem.pageData && listItem.pageData.sp.pageCount - currentPage > 0){
        for(let i = currentPage + 1; i <= currentPage + 5; i++){
            if(i <= listItem.pageData.sp.pageCount){
                followingNavPage.push(i)
            }
        }
    }

    let leadingNavPageSmallScreen = []
    if(currentPage > 1){
        for(let i = currentPage - 2; i < currentPage; i++){
            if(i > 0){ 
                leadingNavPageSmallScreen.push(i)
            }
        }
    }

    let followingNavPageSmallScreen = []
    if(listItem.pageData && listItem.pageData.sp.pageCount - currentPage > 0){
        for(let i = currentPage + 1; i <= currentPage + 2; i++){
            if(i <= listItem.pageData.sp.pageCount){
                followingNavPageSmallScreen.push(i)
            }
        }
    }

  return (
       <main>
            {
                
                listItem.s 
                ? 
                    <section>
                        <div className='my-5 px-5 md:px-20 w-full'>
                            <Filters keyword={keyword} />
                        </div>
                        <ItemList data={listItem.data} connection={listConnection} />
                        <nav className='my-5 hidden md:block'>
                            <ul className='flex items-center justify-center'>
                                {
                                    leadingNavPage.length > 0 ? leadingNavPage.map((page) => <li key={`liPage${page}`} className='px-3 py-2 font-semibold text-sm'><Link href={`/marketplace?page=${page}&${newSearchParams}`}>{page}</Link></li>) : ""
                                }
                                <li className='px-3 py-2 font-semibold text-sm bg-black text-white'>{currentPage}</li>
                                {
                                    followingNavPage.length > 0 ? followingNavPage.map((page) => <li key={`liPage${page}`} className='px-3 py-2 font-semibold text-sm'><Link href={`/marketplace?page=${page}&${newSearchParams}`}>{page}</Link></li>) : ""
                                }
                            </ul>
                        </nav>
                        <nav className='my-5 md:hidden'>
                            <ul className='flex items-center justify-center'>
                                {
                                    leadingNavPageSmallScreen.length > 0 ? leadingNavPageSmallScreen.map((page) => <li key={`liPage${page}`} className='px-3 py-2 font-semibold text-sm'><Link href={`/marketplace?page=${page}&${newSearchParams}`}>{page}</Link></li>) : ""
                                }
                                <li className='px-3 py-2 font-semibold text-sm bg-black text-white'>{currentPage}</li>
                                {
                                    followingNavPageSmallScreen.length > 0 ? followingNavPageSmallScreen.map((page) => <li key={`liPage${page}`} className='px-3 py-2 font-semibold text-sm'><Link href={`/marketplace?page=${page}&${newSearchParams}`}>{page}</Link></li>) : ""
                                }
                            </ul>
                        </nav>
                    </section> 
                : 
                    <div>
                        <div className='m-5'><PreviousLink /></div>
                        <div className='w-full flex justify-center'>
                        
                        <Image alt='No Data' sizes='100vw' width={0} height={0} className='w-3/4 md:w-1/2 h-auto' src={"/no_data.jpg"} />
                    </div>
                    </div>
                    
                    // <div className='p-5 m-10 rounded-md border-[1px] border-red-400 bg-red-300 text-red-500 text-center '>
                    //     <div className='flex justify-center text-4xl'><PiWarningFill /></div>
                    //     <div>{listItem.data}</div>
                    // </div>
            }
        </main>
  )
}

export const revalidate = 0

export default Marketplace