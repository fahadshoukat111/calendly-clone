import { getUserMeetings } from "@/actions/meetings";
import React, { Suspense } from "react";
import MeetingList from "./_components/meeting-list";
import { Tabs,TabsList,TabsTrigger,TabsContent } from "@/components/ui/tabs";

export const metadata = {
  title: "Your Meetings | Schedulrr",
  description: "View and manage your upcoming and past meetings.",
};

export default async function MeetingsPage() {
  return (
    <Tabs defaultValue="upcoming">
      <TabsList className="mb-4">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <Suspense fallback={<div>Loading upcoming meetings...</div>}>
          <UpcomingMeetings />
        </Suspense>
      </TabsContent>
      <TabsContent value="past">
        <Suspense fallback={<div>Loading past meetings...</div>}>
          <PastMeetings />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming");
  return <MeetingList meetings={meetings} type="upcoming" />;
}

async function PastMeetings() {
  const meetings = await getUserMeetings("past");
  return <MeetingList meetings={meetings} type="past" />;
}