import { Schema, model } from "mongoose";

const clientShema = new Schema({
    firstname : { type : String, require: true },
    lastname : { type : String, require: true },
    email : { type : String, require: true ,unique: true },
    document_type : { type : String, require: true },
    document_value : { type : String, require: true },
    roles : {type:{
        count: Number,
        amount: Number,
    }},
})

const ClientModel = model("Client", clientShema, "clients")

export default ClientModel