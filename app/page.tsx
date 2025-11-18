import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { BASE_URL } from "@/conf/env";
import { IEvent } from "@/database/event.model";

const page = async () => {
  const response = await fetch(BASE_URL + "/api/events");
  const events = await response.json();

  return (
    <section className="">
      <h1 className="text-center">
        The Hub For Every Dev <br /> Event You Mustn&apos;t Miss
      </h1>
      <p className="text-center mt-5">Hackathons, Meetups And Conferences, All in one place.</p>
      <ExploreBtn />
      <div id="events" className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events && events.data.length > 0 ? (
            events.data.map((event: IEvent) => <EventCard key={event.slug} {...event} />)
          ) : (
            <p className="text-center">No events found</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default page;
