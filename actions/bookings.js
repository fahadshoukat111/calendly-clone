"use server";

import { eventSchema } from "@/app/lib/validators";
import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";

// export async function createBooking(bookingData) {
//   try {
//     const event = await db.event.findUnique({
//       where: { id: bookingData.eventId },
//       include: { user: true },
//     });

//     if (!event) {
//       throw new Error("Event not found");
//     }

//     const { data } = await clerkClient.users.getUserOauthAcessToken(
//       event.users.clerkUerId,
//       "oauth_google"
//     );

//     const token = data[0]?.token;
//     if (!token) {
//       throw new Error("Event Creator has not Connected google Calendar");
//     }

//     const oauth2Client = new google.auth.OAuth2();
//     oauth2Client.setCredentials({ access_token: token });
//     const calendar = google.calendar({ version: "v3", auth: oauth2Client });

//     const meetingResponse = await calendar.events.insert({
//       calendarId: "primary",
//       conferenceDataVersion: 1,
//       requestBody: {
//         summary: `${bookingData.name} - ${event.title}`,
//         description: bookingData.additionalInfo,
//         start: { dateTime: bookingData.startTime },
//         end: { dateTime: bookingData.endTime },
//         attendees: [{ email: bookingData, email }, { email: event.user.email }],
//         conferenceData: {
//           createdRequest: { requestId: `${event.id}-${Date.now()}` },
//         },
//       },
//     });
//     const meetingLink = meetingResponse.data.hangoutLink;
//     const googleEventId = meetingResponse.data.id;

//     const booking = await db.booking.create({
//       data: {
//         eventId: event.id,
//         userId: event.userId,
//         name: bookingData.name,
//         email: bookingData.email,
//         startTime: bookingData.startTime,
//         endTime: bookingData.endTime,
//         additionalInfo: bookingData.additionalInfo,
//         meetingLink,
//         googleEventId,
//       },
//     });
//     return { success: true, booking, meetingLink };
//   } catch (errors) {
//     console.error(errors);
//     return { success: false, error: errors.messages };
//   }
// }

export async function createBooking(bookingData) {
  try {
    // Fetch the event and its creator
    const event = await db.event.findUnique({
      where: { id: bookingData.eventId },
      include: { user: true },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    // Get the event creator's Google OAuth token from Clerk
    const { data } = await clerkClient.users.getUserOauthAccessToken(
      event.user.clerkUserId,
      "oauth_google"
    );

    const token = data[0]?.token;

    if (!token) {
      throw new Error("Event creator has not connected Google Calendar");
    }

    // Set up Google OAuth client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Create Google Meet link
    const meetResponse = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `${bookingData.name} - ${event.title}`,
        description: bookingData.additionalInfo,
        start: { dateTime: bookingData.startTime },
        end: { dateTime: bookingData.endTime },
        attendees: [{ email: bookingData.email }, { email: event.user.email }],
        conferenceData: {
          createRequest: { requestId: `${event.id}-${Date.now()}` },
        },
      },
    });

    const meetLink = meetResponse.data.hangoutLink;
    const googleEventId = meetResponse.data.id;

    // Create booking in database
    const booking = await db.booking.create({
      data: {
        eventId: event.id,
        userId: event.userId,
        name: bookingData.name,
        email: bookingData.email,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        additionalInfo: bookingData.additionalInfo,
        meetLink,
        googleEventId,
      },
    });

    return { success: true, booking, meetLink };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message };
  }
}
