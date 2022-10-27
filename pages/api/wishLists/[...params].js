import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
   
    if (req.method === "DELETE") {
        try {
            const {params} = req.query;
            const client =await clientPromise;
            const db = client.db("test");
            const collection = db.collection("wishList");
            const result = await collection.deleteOne({productId: new ObjectId(params[0]), email: params[1]}, function (error, result) {
               if (error) {
                console.log(error);
               } 
                console.log("deleted"+result);
              });
              res.status(200).json({deleted: "true"})
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'DELETE');
        res.status(405).end('Method Not Allowed');
      }
}