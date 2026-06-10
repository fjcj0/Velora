import Stripe from "stripe";
import { Car } from "../models/car.model.js";
import { Booking } from "../models/book.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1) Create Stripe Checkout Session
export const createBookingCheckout = async (request, response) => {
  try {
    const { carId, numberOfDay } = request.body;

    if (!carId || !numberOfDay) {
      return response.status(400).json({
        success: false,
        message: "carId and numberOfDay are required",
      });
    }

    const car = await Car.findById(carId);

    if (!car) {
      return response.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    if (!car.available) {
      return response.status(400).json({
        success: false,
        message: "Car is not available",
      });
    }

    const total = car.price * numberOfDay;

    const startedAt = new Date();
    const endAt = new Date(startedAt);
    endAt.setDate(endAt.getDate() + Number(numberOfDay));

   const productData = {
  name: `${car.brand} ${car.model}`,
  description: [
    `🚗 Category: ${car.category}`,
    `📍 Location: ${car.location}`,
    `⏱ Duration: ${numberOfDay} day(s)`,
    `💰 Price per day: $${car.price}`,
  ].join("\n"),
  images: car.image ? [car.image] : [],
};
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: productData,
            unit_amount: Math.round(total * 100),
          },
        },
      ],

      success_url:
        `${process.env.SERVER_URL}/api/bookings/booking-success` +
        `?carId=${car._id}` +
        `&days=${numberOfDay}` +
        `&userId=${request.user._id}`,

      cancel_url: `${process.env.CLIENT_URL}/cars?cancel=true`,

      metadata: {
        carId: car._id.toString(),
        userId: request.user._id.toString(),
        numberOfDay: numberOfDay.toString(),
        total: total.toString(),
        startedAt: startedAt.toISOString(),
        endAt: endAt.toISOString(),
      },
    });

    return response.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
