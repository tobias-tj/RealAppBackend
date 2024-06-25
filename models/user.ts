import { Schema, model } from "mongoose";

const userShema = new Schema({
    firstname : { type : String, require: true },
    lastname : { type : String, require: true },
    email : { type : String, require: true ,unique: true },
    login_code : { type : String, require: true, length : 6 },
    roles : {type:{
        admin : Boolean,
        seller : Boolean,
    }, require: true},
})

export default model("User", userShema, "users")