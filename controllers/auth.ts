import { Request, Response } from "express";
import UserModel from "../models/user";
import sendEmail from "../helpers/mailer";
import jwt from "jsonwebtoken"

export const login = async (req: Request, res: Response) => {
    const { email } = req.params
    const { code } = req.body
    console.log({ email, code })

    const user = await UserModel.findOne({ email, login_code: code})

    if(!user){
        return res.status(400).json({ok: false, message: "Codigo Incorrecto"})
    }


    const token = jwt.sign(
        {
        sub: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        roles: user.roles, 
        }, 
        process.env.JWT_SECRET_KEY as string
    )
    
    res.cookie("jwt", token, {
        //..... 1s  ..1m ...1h ...6 meses
        maxAge: 1000 * 60 * 24 * 180
    })

    res.status(200).json({ok: true, message: "Inicio de sesion exitoso" })

}

export const generateCode = async (req : Request, res : Response) => {
    const { email } = req.params;

    const user = await UserModel.findOne({ email })
    if(!user){
        return res.status(400).json({ok: false, message: "Usuario no existe!"})
    }

    let randomCode = ""
    for (let index = 0; index <= 5; index++) {
        const number = Math.floor(Math.random() * 10)
        randomCode += number
    }
    user.login_code = randomCode
    await user.save()
    sendEmail({
        to: email,
        subject: "Este es tu codigo " + randomCode,
        html: "Codigo para ingresar: " + randomCode,
    })
    res.send("GENERATE CODE");
}