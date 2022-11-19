import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const collection = db.collection("datas");
        const id = req.body._id;
        const result = await (await collection.findOne({_id: new ObjectId(id)}));
        // client.close()
      
        // console.log(req.);
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: result.title,
                description: result.description,
                images: [result.img]

              },
              unit_amount: result.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/searchPage`,
      });
      // res.redirect(303, session.url);
      res.json({ id: session.id });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
