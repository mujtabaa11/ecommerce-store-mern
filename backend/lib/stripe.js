import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();



export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

stripe.customers.list()
  .then(customers => console.log(customers))
  .catch(err => console.error("Stripe error:", err.message));
