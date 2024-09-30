"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import { bookingSchema } from "@/app/lib/validators";

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  
}

export const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });
  return (
    <div>
      <div>
        <DatePicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date);
            setSelectedTime(null);
          }}
        />
      </div>
      <div></div>
    </div>
  );
};


