import { getEventAvailability, getEventDetail } from "@/actions/event";
import NotFound from "@/app/not-found";
import EventDetails from "./_components/event-details";
import { Suspense } from "react";
import BookingForm from "@/app/(main)/availability/_components/booking-form";

export async function generateMetadata({ params }) {
  const event = await getEventDetail(params.username, params.eventId);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | Your App Name`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };
}

export default async function EventBookingPage({ params }) {
  const event = await getEventDetail(params.username, params.eventId);
  const availability = await getEventAvailability(params.eventId);
  console.log("availability",availability)

  if (!event) {
    NotFound();
  }

  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
      <EventDetails event={event} />
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm event={event} availability={availability}/>
      </Suspense>
    </div>
  );
}
