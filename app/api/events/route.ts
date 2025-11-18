import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Helper function to parse array fields (handles both JSON strings and comma-separated strings)
function parseArrayField(field: string): string[] {
  if (!field) return [];
  try {
    // Try parsing as JSON first
    const parsed = JSON.parse(field);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    // If JSON parse fails, treat as comma-separated string
    return field
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }
}

export async function POST(request: Request) {
  try {
    // 1.0 connect to the Database
    await connectDB();
    // Transform the request body into the Event interface
    const formData = await request.formData();
    let eventData;

    try {
      eventData = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        {
          message: "Invalid Json Data Format ",
          error: e instanceof Error ? e.message : "Unknown error",
        },
        { status: 400 }
      );
    }

    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        {
          message: "Image is required",
        },
        { status: 400 }
      );
    }

    const tags = parseArrayField(eventData.tags as string);
    const agenda = parseArrayField(eventData.agenda as string);

    const bufferArray = await file.arrayBuffer();
    const buffer = Buffer.from(bufferArray);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "DevEvent",
          },
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        )
        .end(buffer);
    });

    eventData.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvents = await Event.create({ ...eventData, tags, agenda });
    if (!createdEvents) {
      return NextResponse.json(
        {
          message: "Event creation failed",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Event created successfully",
        data: createdEvents,
      },
      { status: 201 }
    );
    // 2.0 create the event
  } catch (e) {
    return NextResponse.json(
      {
        message: "Event creation failed",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });
    if (!events) {
      return NextResponse.json(
        {
          message: "No events found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Events fetched successfully",
        data: events,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Events fetching failed",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
