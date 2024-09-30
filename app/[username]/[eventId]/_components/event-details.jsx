import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";

const EventDetails = ({ event }) => {
  const { user } = event;
  return (
    <div className="p-10 lg:w-1/3 bg-white">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <div className="flex items-center mb-2">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <Clock className="mr-2" />
        <span>{event.duration} minutes</span>
      </div>
      <div className="flex items-center mb-4">
        <Calendar className="mr-2" />
        <span>Google Meet</span>
      </div>
      <p className="text-gray-700">{event.description}</p>
    </div>
  );
};

export default EventDetails;
