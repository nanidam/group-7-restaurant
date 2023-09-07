import React, { useEffect, useState } from "react";
import { ICustomer } from "../models/ICustomer";
import { IBooking } from "../models/IBooking";
import "../style/AdminUpdateForm.scss";
import { updateBooking } from "../services/bookingService";

interface AdminUpdateFormProps {
  selectedCustomer: ICustomer | null;
  allBookings: IBooking[];
  onCancel: () => void;
  setAllBookings: (bookings: IBooking[]) => void;
}

export function AdminUpdateForm({
  selectedCustomer,
  allBookings,
  onCancel,
  setAllBookings,
}: AdminUpdateFormProps) {
  const [formData, setFormData] = useState({
    bookingId: "",
    numberOfGuests: 0,
    date: "",
    time: "",
  });

  useEffect(() => {
    if (selectedCustomer) {
      const bookingForSelectedCustomer = allBookings.find(
        (booking) => booking.customerId === selectedCustomer._id
      );

      if (bookingForSelectedCustomer && bookingForSelectedCustomer._id) {
        setFormData({
          bookingId: bookingForSelectedCustomer._id,
          numberOfGuests: bookingForSelectedCustomer.numberOfGuests,
          date: bookingForSelectedCustomer.date,
          time: bookingForSelectedCustomer.time,
        });
      }
    }
  }, [selectedCustomer, allBookings, setFormData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCustomer) {
      return null;
    }
    const updatedBooking = {
      _id: formData.bookingId,
      id: formData.bookingId,
      restaurantId: "64f862916436ceddb351c43e",
      date: formData.date,
      time: formData.time,
      numberOfGuests: formData.numberOfGuests,
      customerId: selectedCustomer._id,
    };

    await updateBooking(updatedBooking);
    onCancel();

    const updatedBookings = allBookings.map((booking) => {
      if (booking._id === updatedBooking.id) {
        return updatedBooking;
      }
      return booking;
    });

    const test = allBookings.filter(
      (booking) => booking._id === updatedBooking.id
    );
    console.log(test);
    setAllBookings(updatedBookings);
    alert("Booking has been updated! :)");
  }

  if (!selectedCustomer) {
    return null;
  }

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <button className="cancel-btn" type="button" onClick={onCancel}>
        X
      </button>

      <label htmlFor="customerId">Customer ID</label>
      <input
        type="text"
        id="customerId"
        defaultValue={selectedCustomer._id}
        readOnly
      />

      <label htmlFor="numberOfGuests">Number of Guests</label>
      <input
        type="number"
        id="numberOfGuests"
        value={formData.numberOfGuests}
        onChange={(e) =>
          setFormData({ ...formData, numberOfGuests: Number(e.target.value) })
        }
      />

      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />

      <label htmlFor="time">Time</label>
      <input
        type="time"
        id="time"
        value={formData.time}
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
      />

      <button type="submit">Update</button>
      <button>Delete</button>
    </form>
  );
}
