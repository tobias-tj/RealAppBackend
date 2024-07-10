import { Request, Response } from "express";
import SaleModel from "../models/sale";
import ClientModel from "../models/client";

export const getAll = async (req: any, res: Response) => {
    try{
        const filter = req.user.isAdmin ? {} : { user: req.user.sub };
        const sales = await SaleModel.find(filter)
    
        res.status(200).json({ ok: true, data: sales})
    }catch (error){
        res.status(500).json({ ok: false, message: "Error del servidor" })
    }
}

export const create = async (req: any, res: Response) => {
    const { operation_date, total_amount, product, payment_methods, client } = req.body;
    console.log({client})
    const createdSale = await SaleModel.create({
        operation_date, 
        total_amount,
        product,
        payment_methods,
        client, 
        user: req.user.sub
    })
    await ClientModel.findByIdAndUpdate(createdSale.client, {
        $inc: { "sales.count": 1, "sales.amount" : total_amount}
    })
    res.status(201).json({ ok: true, data: createdSale })

}