"use server";

import Event from "@/database/event.model";
import connectDB from "../mongodb";

export async function getSimilarEventsBySlug(slug: string) {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });
    if (!event) {
      return [];
    }
    const similarEvents = await Event.find({
      _id: { $ne: event?._id },
      tags: { $in: event?.tags },
    })
      .lean()
      .sort({ createdAt: -1 });

    return similarEvents;
  } catch (error) {
    console.log("Error in getSimilarEventsBySlug", error);
    return [];
  }
}
