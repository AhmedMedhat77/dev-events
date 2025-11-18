"use server";
import Booking from "@/database/booking.model";
import connectDB from "../mongodb";
import { revalidateTag, cacheTag, revalidatePath } from "next/cache";
export async function createBooking(eventId: string, slug: string, email: string) {
  try {
    await connectDB();
    const booking = await Booking.create({ eventId, email, slug });
    if (!booking) {
      return {
        success: false,
        message: "Booking creation failed",
        error: "Unknown error",
      };
    }
    // convert the booking to a plain object
    const bookingObj = booking.toObject();
    // convert the _id and eventId to strings
    bookingObj._id = String(bookingObj._id);
    // convert the eventId to a string
    bookingObj.eventId = String(bookingObj.eventId);
    revalidatePath(`/events/${slug}`, "page");
    revalidatePath(`/events/${slug}`);

    return {
      success: true,
      message: "Booking created successfully",
      data: bookingObj,
    };
  } catch (error) {
    console.log("Error in createBooking", error);
    return {
      success: false,
      message: "Error in creating booking",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getBookingsByEventId(eventId: string) {
  try {
    await connectDB();
    const bookingsCount = await Booking.find({ eventId }).countDocuments();
    cacheTag(`bookings-count-${eventId}`);

    return bookingsCount;
  } catch (error) {
    console.log("Error in getBookingsByEventId", error);
    return 0;
  }
}
