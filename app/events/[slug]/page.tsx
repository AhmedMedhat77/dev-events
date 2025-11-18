import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { BASE_URL } from "@/conf/env";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import Image from "next/image";
import { notFound } from "next/navigation";

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgendaItem = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Event Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTagItem = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap items-center">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);
const EventsDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const request = await fetch(BASE_URL + `/api/events/${slug}`);
  const { data } = await request.json();
  const {
    description,
    title,
    image,
    overview,
    audience,
    date,
    time,
    location,
    mode,
    agenda,
    organizer,
    tags,
  } = data as IEvent;

  if (!description) return notFound();
  const bookings = 10;
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
  console.log(similarEvents);
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>
      <div className="details">
        {/* Left side content */}
        <div className="content">
          <Image src={image} alt={"Event Banner"} width={800} height={800} className="banner" />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="Calendar" label={date} />
            <EventDetailItem icon="/icons/clock.svg" alt="Time" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="Location" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="Mode" label={mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="Audience" label={audience} />
          </section>

          <EventAgendaItem agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Tags</h2>
            <EventTagItem tags={tags} />
          </section>
        </div>

        {/* Right side */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {/* BookEvent */}
            {bookings > 0 ? (
              <p className="text-sm">Join {bookings} people Who have already booked their spot</p>
            ) : (
              <p className="text-sm">Be The First to Book Your Spot</p>
            )}
            <BookEvent />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents?.length > 0 ? (
            similarEvents.map((event) => (
              <EventCard
                key={String(event._id)}
                slug={event.slug}
                image={event.image}
                title={event.title}
                location={event.location}
                date={event.date}
                time={event.time}
              />
            ))
          ) : (
            <p className="text-center">No similar events found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsDetailsPage;
