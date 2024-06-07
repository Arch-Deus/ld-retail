import React from 'react'
import axios from 'axios'
import ItemList from '@/app/marketplace/ItemList'
import Link from 'next/link'
import prisma from '@/app/lib/prisma'

async function getConnection() {

    const connection = await prisma.connections.findFirst({
        where: {
            name: "accurate"
        }
    })

    // console.log(connection)

    return connection
}

async function getItem(page: any) {
    let connection = await getConnection()


    if(connection){
        if(connection.host != null && connection.session != null && connection.token != null && connection.codes != null){

            const params = new URLSearchParams({
                "sp.pageSize": "8",
                "sp.page": page || "1",
            })

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

                        const generateItems = json.d.map((key:any) => {
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
                return {s: false, data: "Cannot retrieve items data from accurate"}
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
    searchParams : {
        keyword: String,
        per_page: Number,
        page: Number
    }
}


const Marketplace = async ({searchParams}: searchParamsProp) => {
    
    const items: any = getItem(searchParams.page)
    const connection = getConnection()

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
    if(listItem.pageData.sp.pageCount - currentPage > 0){
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
    if(listItem.pageData.sp.pageCount - currentPage > 0){
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
                        <ItemList data={listItem.data} connection={listConnection} />
                        <nav className='my-5 hidden md:block'>
                            <ul className='flex items-center justify-center'>
                                {
                                    leadingNavPage.length > 0 ? leadingNavPage.map((page) => <li key={`liPage${page}`} className='px-3 py-2 font-semibold text-sm'><Link href={`/marketplace?page=${page}`}>{page}</Link></li>) : ""
                                }
                                <li className='px-3 py-2 font-semibold text-sm bg-black text-white'>{currentPage}</li>
                                {
                                    followingNavPage.length > 0 ? followingNavPage.map((page) => <li key={`liPage${page}`} className='px-3 py-2 font-semibold text-sm'><Link href={`/marketplace?page=${page}`}>{page}</Link></li>) : ""
                                }
                            </ul>
                        </nav>
                        <nav className='my-5 md:hidden'>
                            <ul className='flex items-center justify-center'>
                                {
                                    leadingNavPageSmallScreen.length > 0 ? leadingNavPageSmallScreen.map((page) => <li key={`liPage${page}`} className='px-3 py-2 font-semibold text-sm'><Link href={`/marketplace?page=${page}`}>{page}</Link></li>) : ""
                                }
                                <li className='px-3 py-2 font-semibold text-sm bg-black text-white'>{currentPage}</li>
                                {
                                    followingNavPageSmallScreen.length > 0 ? followingNavPageSmallScreen.map((page) => <li key={`liPage${page}`} className='px-3 py-2 font-semibold text-sm'><Link href={`/marketplace?page=${page}`}>{page}</Link></li>) : ""
                                }
                            </ul>
                        </nav>
                    </section> 
                : 
                    <div className='p-5 m-5 rounded-md border-[1px] border-red-400 bg-red-300 text-red-500'>{listItem.data}</div>
            }
        </main>
  )
}

export default Marketplace