import { Schema, Types, model } from "mongoose";
import { productShema } from "./product";

export const paymentMethodShema = new Schema({
    method: { type: String },
    amount: { type: Number, require: true},
    time_value: { type: Number, require: true},
    time_unit: { type: String, require: true},
})

const saleShema = new Schema({
    operation_date: String,
    total_amount: Number,
    product: [
        {
            code: String,
            name: String,
            qty: Number,
            unit_price: Number,
            discount: {type: Number, default: 0}
        }
    ],
    payment_methods: [paymentMethodShema],
    user: { type: Types.ObjectId, ref: "User" },
    client: { type: Types.ObjectId, ref: "Client" },
})

const SaleModel = model("Sale", saleShema, "sales")

export default SaleModel