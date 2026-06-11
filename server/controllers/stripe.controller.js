import { stripe } from "../config/stripe.config.js";
import { Booking } from "../models/book.model.js";
export const createBookingCheckout = async (request, response) => {
  try {
    const { id, userId } = request.body;
    if (!id || !userId) {
      return response.status(400).json({
        success: false,
        message: "Booking id and userId are required",
      });
    }
    const booking = await Booking.findOne({
      _id: id,
      userId,
    }).populate("carId");
    if (!booking) {
      return response.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    if (booking.status === "Confirmed" || booking.status === "Cancelled") {
      return response.status(400).json({
        success: false,
        message: "This booking is already processed",
      });
    }
    const car = booking.carId;
    if (!car) {
      return response.status(404).json({
        success: false,
        message: "Car not found",
      });
    }
    const numberOfDay = Math.ceil(
      (new Date(booking.endAt) - new Date(booking.startedAt)) /
        (1000 * 60 * 60 * 24)
    );
    const productData = {
      name: `${car.brand} ${car.model}`,
      description: [
        `Category: ${car.category}`,
        `Fuel: ${car.fuel}`,
        `Transmission: ${car.transmission}`,
        `Capacity: ${car.capacity}`,
        `Location: ${car.location}`,
        `Duration: ${numberOfDay} ${
          numberOfDay === 1 ? "day" : "days"
        }`,
        `Price Per Day: $${car.price}`,
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
            unit_amount: Math.round(booking.total * 100),
          },
        },
      ],
      success_url:
        `${process.env.SERVER_URL}/book/booking-success` +
        `?bookingId=${booking._id}` +
        `&userId=${userId}`,
      cancel_url: `${process.env.CLIENT_URL}/bookings?cancel=true`,
      metadata: {
        bookingId: booking._id.toString(),
        carId: car._id.toString(),
        userId: userId.toString(),
        total: booking.total.toString(),
        startedAt: booking.startedAt.toISOString(),
        endAt: booking.endAt.toISOString(),
      },
    });
    return response.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};