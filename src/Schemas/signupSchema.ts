import {z} from "zod"


export const signupSchema = z.object({
    username:z.string().min(6,"username must contain 6 letter").max(20,"Username cant exceed 20 letter").regex(/^[a-zA-Z0-9_]+$/,"username must not contain any special character"),
    email:z.string().email({message:"invalid email adddress"}),
    fullname:z.string(),
    password:z.string().min(6,{message:"password is atleast 6 digit"})
})