import { NextFunction, Request, Response } from "express"
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import { AnyZodObject, ZodError } from "zod"


export const validateRequest = (schema: AnyZodObject) => {
    return (req: any, res: Response, next: NextFunction) => {
        try{
            console.log("Validate request")
            const result = schema.parse({ body: req.body, params: req.params })
            console.log(result)
            next()
        }catch (error){
            if(error instanceof ZodError){
                return res.status(400).json({ ok : false, message: error.errors.map((e) => ({
                    code: e.code,
                    message: e.message
                })),
             })
            }
            console.log("Server Error: ")
            res.status(500).json({ ok: false, message: "Error del servidor" })

        }
    }

}