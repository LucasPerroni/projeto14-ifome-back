import express from "express"
import cors from "cors"
import { ObjectId } from "mongodb"
import db from "./db.js"
import dotenv from "dotenv"

import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid';

import loginRouter from "./routes/loginRouter.js"
import productsRouter from "./routes/productsRouter.js"

dotenv.config()

// create express
const app = express()
app.use(express.json())
app.use(cors())

// routes
app.use(loginRouter)
app.use(productsRouter)

//const product = 
 
        // {   
        //     type: "fast-food",
        //     name: "hot-dog", 
        //     id: new ObjectId,
        //     price: 6.25, 
        //     image: "https://media.istockphoto.com/photos/hot-dog-on-white-picture-id1130731707?k=20&m=1130731707&s=612x612&w=0&h=7NJFU6IqoSzun76MA3f4osiRc_EZuAQJ4Wfahxzf9Wk=", 
        //     description: "muito bom"
        // }
        // {   
        //     type: "fast-food",
        //     name: "hamburger", 
        //     id: new ObjectId,
        //     price: 8.00, 
        //     image: "https://img.freepik.com/fotos-gratis/hamburguer-de-carne-com-salada-de-queijo-e-tomate-em-piso-escuro_140725-89524.jpg?w=2000", 
        //     description: "delicia"}
        // {   
        //     type: "saladas",
        //     name: "salada tropical", 
        //     id: new ObjectId,
        //     price: 9.60, 
        //     image: "https://img.itdg.com.br/tdg/images/recipes/000/084/992/279635/279635_original.jpg?mode=crop&width=710&height=400", 
        //     description: "coisa mais linda"}
        // {   
        //     type: "saladas",
        //     name: "salada tradicional", 
        //     id: new ObjectId,
        //     price: 5.80, 
        //     image: "https://img.itdg.com.br/images/recipes/000/000/233/346244/346244_original.jpg", 
        //     description: "perfeito"}
    

// await db.collection("product").insertOne(product);
//  await db.collection("product").deleteMany({});


// app.post('/sign-in', async (rec,res) => {
//     const { body } = rec;
//     try {
//         const user = await db.collection('users').findOne({email: body.email});
//         //console.log(user);
//         // const { error, value } = loginSchema.validate(body);
//         // if(error){ 
//         //     res.sendStatus(422);
//         //     return;
//         // }
//         if(bcrypt.compareSync(body.password, user.password)){
//             const token = uuid();
//             const session = await db.collection('sessions').findOne({'user_id': user._id});
//             if(session){
//                 console.log(session)
//                 res.status(200).send({'user_id': session.user_id, 'token': session.token});
//                 return;
//             }else{
//                 await db.collection("sessions").insertOne({'user_id': user._id, 'token': token});
//                 res.status(200).send({'user_id': user._id, 'token': token});
//                 return;
//             }
//         }
//         res.sendStatus(401);
//     } catch (e) {
//         console.log(e);     
//         res.sendStatus(422);   
//     }
// })

// port
const port = process.env.PORT || 5000
app.listen(port)
