"use server"

import { cookies } from 'next/headers';
import validateEmail from '../helpers/validateEmail';
import validatePassword from '../helpers/validatePassword';
import prisma from '../lib/prisma';
import bcrypt from "bcryptjs"
import * as jose from 'jose'
import { redirect } from 'next/navigation';

export const LoginAction = async (formData: FormData) => {

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if(!validateEmail(email) || !validatePassword(password)){
        return {
            status: false,
            message: "Invalid email or password"
        }
    }

    const user = await prisma.users.findFirst({
        where: {
            email: email
        }
    })

    if(!user){
        return {
            status: false,
            message: "Invalid email"
        }
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password)

    if(!isCorrectPassword){
        return {
            status: false,
            message: "Invalid password"
        }
    }

    //create jwt token
    const secret = new TextEncoder().encode(
        process.env.JWT_SECRET,
        )
    const alg = 'HS256'
    
    const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime('24h')
    .setSubject(user.id.toString())
    .sign(secret)

    cookies().set("Authorization", jwt, {
        secure: true,
        httpOnly: true,
        expires: Date.now() + 24 *60 * 60 * 1000 * 3, // 3 days
        path: '/',
        sameSite: 'strict'
    })

    redirect("/")
}
