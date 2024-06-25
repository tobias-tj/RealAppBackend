import { Schema, Types, model } from "mongoose";

const saleShema = new Schema({
    operation_date: Date,
    total_amount: Number,
    user: {type: Types.ObjectId, ref: "User"}
})

const SaleModel = model("Sale", saleShema, "sales")

export default SaleModel