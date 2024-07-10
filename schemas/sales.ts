import { isValidObjectId } from "mongoose";
import { z } from "zod";
import ValidateObjectId from "../helpers/validateObjectId";

const payment_methods_TYPES = [
    "Sin utilizacion Sist. Financiero",
    "Conpensacion de deudas",
    "Tarjetas de debito",
    "Tarjetas de credito",
    "Dinero Electronico",
    "Otros con utilizacion del sitema financiero",
    "Endoso de titulos",
] as const

const TIME_UNITS = z.enum(["Dias", "Meses", "Años"]);


const saleProductShema = z.object({
    code: z.string(),
    name: z.string().optional(),
    qty: z.number(),
    unit_price: z.number(),
    discount: z.number().optional(),
})

const salePaymentMethodShema = z.object({
    method: z.enum(payment_methods_TYPES),
    amount: z.number(),
    time_unit: TIME_UNITS,
    time_value: z.number(),
}) 


export const SaleShema = z.object({
    operation_date: z.string(),
    total_amount: z.number(),
    product: z.array(saleProductShema),
    payment_methods: z.array(salePaymentMethodShema),
    client: z.custom(ValidateObjectId)
})

export const SaleCreationScema = z.object({
    body: SaleShema,
})

export type Sale = z.infer<typeof SaleShema> 