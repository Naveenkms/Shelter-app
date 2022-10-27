import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    if (req.method === "POST") {
        try {
            const data = req.body.data;
            console.log(req.body);
            const email= req.body.email;
            const client =await clientPromise;
            const db = client.db("test");
            const collection = db.collection("wishList");
            const insert = await collection.insertOne({
              productId: new ObjectId(data._id)  ,
              description: data.description, 
              img: data.img,
              lat: data.lat,
              long: data.long,
              location: data.location,
              price: data.price,
              star: data.star,
              title: data.title,
              email: email
              }, function (error, result) {
                console.log(error);
                console.log("added"+result);
              });
              res.status(200).json({success: "true"})
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    }
     else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
      }
}