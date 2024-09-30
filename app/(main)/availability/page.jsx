import { getUserAvailability } from "@/actions/availability";
import AvailabilityForm from "./_components/availability-form";
import React from "react";
import { defaultAvailability } from "./data";

const AvailabilityPage = async () => {
  const availability = await getUserAvailability();
  return <AvailabilityForm initialData={availability || defaultAvailability} />;
};

export default AvailabilityPage;
