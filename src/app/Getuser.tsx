import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import prisma from "./lib/prisma";


export async function Getuser(){
    const cookie = cookies().get("Authorization")


  if(!cookie){
    return Response.json({
        status: false,
        message: "Not authorized",
        data: cookie
    })
  }

  // console.log(cookie)

  // Validate it
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
  )
  
  const jwt = cookie.value

  try{
    const { payload } = await jose.jwtVerify(jwt, secret, { })

    const fetchUser = await prisma.users.findUnique({
      where: {
        id: payload.sub
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    if(!fetchUser){
      return Response.json({
          status: false,
          message: "Not authorized",
          data: {}
      })
    }
    
    return Response.json({
        status: true,
        message: "Authorized",
        data: fetchUser
    })
  }
  catch(error){
    return Response.json({
        status: false,
        message: "Not authorized",
        data: {}
    })
  }
}