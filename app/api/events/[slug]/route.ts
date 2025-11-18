import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

type routeParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: Request, { params }: routeParams) {
  try {
    const { slug } = await params;
    //1.0 validate the slug
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
    }

    await connectDB();

    //1.2 sensitize the slug
    const sanitizedSlug = slug.trim().toLowerCase();
    //2.0 find the event
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Event fetched successfully", data: event },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
