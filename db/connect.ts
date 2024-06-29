import mongoose from "mongoose";
import UserModel from '../models/user';
import SaleModel from "../models/sale";
import ProductModel from "../models/product";

async function connectDB(){
    if(!process.env.MONGO_URL){
        throw new Error("Falta la variable de MONGO DB URL");
    }
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Conexion exitosa con Mongo DB");
        // await ProductModel.create({
        //     name: "Mouse",
        //     code: "PQPOPR2T",
        //     supplier_cost: 210,
        // })
        // const newUser = new UserModel({
        //     firstname : "Tobias",
        //     lastname: "Jara",
        //     email : "https.tobias.jara.404@gmail.com",
        //     login_code : "43321",
        //     roles: {
        //         admin: true,
        //         seller : true,
        //     }
        // })
        // console.log(newUser);
        // await newUser.save();
        // await SaleModel.create({
        //     operation_date: new Date(),
        //     user: "6676c0417847131b33a62673",
        //     total_amount: 5000,
        // })
    }catch(error){
        console.log("Hubo un error al conectarnos en a la BBDD", error);
    }
}

export default connectDB;