import React from 'react'
import prisma from '../lib/prisma'
import { redirect } from 'next/navigation'
import { cookies, headers } from 'next/headers'
import { RiAlarmWarningFill } from "react-icons/ri";
import LoginForm from './LoginForm';
import { revalidatePath } from 'next/cache';

async function resetConnectionData(connectionId: string){
    try{
        const resetConnection = await prisma.connections.update({
            where: {
                connection_id: connectionId
            },
            data: {
                host: null,
                token: null,
                session: null,
                codes: null
            }
        })

        return {s: true, data: resetConnection}
    }catch(error){
        return {s: false, data: error}
    }
}

function printError(errorMessage: string){
    return (
        <div className='text-red-500 bg-red-300 border-[1px] border-red-500 p-5 m-5 rounded-md'>
            <div className='text-5xl flex justify-center'><RiAlarmWarningFill /></div>
            <div className='flex justify-center'>{errorMessage}</div>
        </div>
    )
}

const Login = async ({searchParams}: {searchParams:  {[code: string]: string}}) => {

    revalidatePath("/login")

    const cookie = cookies().get("Authorization")

    if(cookie){
        redirect("/")
    }

    // const connection = await prisma.users.findMany()

    // console.log(connection)

    const header = headers()
    const domain = header.get("x-forwarded-proto")+"://"+header.get("host")

    const accurateScope = process.env.NEXT_PUBLIC_ACCURATE_SCOPE
    const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL
    const accurateClientId = process.env.NEXT_PUBLIC_ACCURATE_CLIENT_ID

    const connection = await prisma.connections.findFirst({
        where: {
            name: "accurate"
        }
    })

    if(!connection){
        return printError("Connection Could not be found")
    }

    if(connection.host == null || connection.codes == null || connection.session == null || connection.token == null){
        const resetConnection = await resetConnectionData(connection.connection_id)

        if(!resetConnection.s){
            return printError("Failed to reset connection data")
        }

        if(!searchParams.code){
            redirect(`https://account.accurate.id/oauth/authorize?client_id=${accurateClientId}&response_type=code&redirect_uri=${domain}/login&scope=${accurateScope}`)
        }

        const auth = Buffer.from(accurateClientId+":"+process.env.NEXT_PUBLIC_ACCURATE_CLIENT_SECRET).toString("base64")

        const header = new Headers({
            "Authorization": "Basic "+auth,
            "Content-Type": "application/x-www-form-urlencoded\r\n",
        })

        const resultCheckAuthAccurate = await fetch("https://account.accurate.id/oauth/token", {
            method: "POST",
            headers: header,
            body: new URLSearchParams({"code": searchParams.code, "grant_type": "authorization_code", "redirect_uri": domain+"/login"})
        })

        const jsonResultCheckAuthAccurate = await resultCheckAuthAccurate.json()

        if(!jsonResultCheckAuthAccurate.access_token){
            return printError("Accurate authentication is failed")
        }

        const fetchDbConnection = await fetch("https://account.accurate.id/api/open-db.do?id=687355", {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+jsonResultCheckAuthAccurate.access_token
            }
        })

        const jsonFetchDbConnection = await fetchDbConnection.json()

        if(!jsonFetchDbConnection.s){
            return printError("Failed to establish connection to accurate database")
        }

        const updateConnection = await prisma.connections.update({
            where: {
                connection_id: connection.connection_id
            },
            data: {
                host: jsonFetchDbConnection.host,
                session: jsonFetchDbConnection.session,
                token: jsonResultCheckAuthAccurate.access_token,
                codes: searchParams.code
            }
        })

        if(!updateConnection){
            return printError("Failed to update connection data")
        }

        redirect("/login")
    }

    const fetchDbConnection = await fetch("https://account.accurate.id/api/open-db.do?id=687355", {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+connection.token
        }
    })

    const jsonFetchDbConnection = await fetchDbConnection.json()

    if(!jsonFetchDbConnection.s){
        const resetConnection = await resetConnectionData(connection.connection_id)

        if(!resetConnection){
            return printError("Failed to reset connection data")
        }

        redirect("/login")
    }

    // console.log(connection)

  return (
    <div>
        <LoginForm connection={connection.name} />
    </div>
  )
}

export default Login