"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, error } = await createBooking(eventId, slug, email);
    if (success) {
      setSubmitted(true);
      setEmail("");
    } else {
      console.error("Error in creating booking", error);
    }
  };
  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you Signing Up</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
