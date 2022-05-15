import { ObjectId } from "mongodb"
import db from "../db.js"

export async function getProducts (rec, res) {
    const { headers } = rec;
    try {
        const products = await db.collection("product").find({}).toArray();
        const shopping = await db.collection("shopping").find({user: headers.user, status: 'wait'}).toArray();
        let qtd = 0;
        if(shopping.length > 0){
            qtd = shopping[0].shpping.length;
        }
        res.status(200).send({products: products, qtd: qtd});
    } catch {
        res.sendStatus(500);
    }
}

export async function postProducts (rec,res) {
    // carrinho
    const { headers, body } = rec;
    
    const IDs = body.map((el) => ObjectId(el));
    try {
        const session = await db.collection('sessions').findOne({'user_id': ObjectId(headers.user), 'token': headers.token});
        if(!session){
            res.sendStatus(401);
            return;
        }
        const products = await db.collection("product").find({"id" : {"$in" : IDs}}).toArray();
        const shopping = await db.collection("shopping").find({user: headers.user ,status: 'wait'}).toArray();
        let productsWait = [];//shopping[0].shpping;
        if(shopping.length > 0){
            productsWait = shopping[0].shpping;
        }
        
        if(productsWait.length > 0) {
            if(IDs.length != 0){
                const totalProducts = [...products]
                totalProducts.push(...productsWait)                
                await db.collection("shopping").updateOne({user: headers.user, status: "wait"}, {$set: {shpping: totalProducts}});
            }
        }else{
            if(IDs.length != 0){
                await db.collection("shopping").insertOne({
                    user: headers.user, 
                    shpping: products, 
                    status: 'wait'
                });
            }
        }
        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
}

