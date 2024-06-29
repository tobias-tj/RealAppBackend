import { Schema, model } from "mongoose";

export const productShema = new Schema({
    name : { type : String, require: true },
    code : { type : String, require: true },
    supplier_cost : { type: Number, require: true },
    iva: { type: Number, default: 0.12, require: true },
    micro: { type: Number, default: 5.55, require: true},
    salvament_margin: { type: Number, default: 0.25, require: true},
    profit_margin: { type: Number, default: 0.15, require: true}
})

const ProductModel = model("Product", productShema, "products");
export default ProductModel;