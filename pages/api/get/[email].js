import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
   
    if (req.method === "GET") {
        try {
            const {email} = req.query; 
            const client =await clientPromise;
            const db = client.db("test");
            const collection = db.collection("wishList");
            const result = await collection.find({email: email}).project({productId: 1, _id: 0}).toArray();
            // const data = JSON.stringify(result);
              res.status(200).json({data: result})
            // console.log(result);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).end('Method Not Allowed');
      }
}