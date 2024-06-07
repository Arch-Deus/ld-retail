"use server"

import { redirect } from "next/navigation"
import validateEmail from "../helpers/validateEmail"
import validatePassword from "../helpers/validatePassword"
import bcrypt from "bcryptjs"
import prisma from "../lib/prisma"
import { Prisma } from "@prisma/client"

export default async function signupAction(currentState: any, formData: FormData): Promise<string>{

    // get the data
    const email = formData.get("email")?.toString()
    const name = formData.get("name")?.toString()
    const password = formData.get("password")?.toString()
    const repassword = formData.get("re-password")

    if(email == null || password == null || name == null || email == "" || password == "" || name == ""){
        return "Please fill all the field"
    }

    if(password !== repassword)
    {
        return "Password and Re-enter password is not match"
    }

    if(!validateEmail(email) || !validatePassword(password)){
        return "Invalid email or password"
    }

    //hash the password
    const hash = bcrypt.hashSync(password, 8);

     //create a user in db
     try{
        const createUser = await prisma.users.create({
            data: {
                name,
                email,
                password: hash
            }
        })
    } catch(e){
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            let message = ''

            if(e.code == 'P2002')
            {

                message = "Email is not available"

            }
            else
            {

                message = "Sorry, we can't register your account"

            }

            return message
        }
    }
    
    redirect("/login")
}