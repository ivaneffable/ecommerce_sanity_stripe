import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";

import { CartItem } from "@/context/CartProvider";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  try {
    const items = await req.json();
    const origin = req.headers.get("origin");
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1NKihYFCr53aMQ0XECebSyvU" },
        { shipping_rate: "shr_1NKiigFCr53aMQ0XyyhGhutn" },
      ],
      line_items: items?.map((item: CartItem) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/a4fmc4as/production/"
          )
          .replace("-webp", ".webp");
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${origin}/success`,
      cancel_url: `${origin}/?canceled=true`,
    };
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params);
    console.log("session", session);
    return NextResponse.json(session, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(err?.message, { status: err?.statusCode || 500 });
  }
}
