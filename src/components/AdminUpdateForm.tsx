import React, { useEffect, useState } from "react";
import { ICustomer } from "../models/ICustomer";
import { IBooking } from "../models/IBooking";
import "../style/AdminUpdateForm.scss";
import { updateBooking } from "../services/bookingService";

interface AdminUpdateFormProps {
  selectedCustomer: ICustomer | null;
  allBookings: IBooking[];
  onCancel: () => void;
}

export function AdminUpdateForm({
  selectedCustomer,
  allBookings,
  onCancel,
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
      console.log(bookingForSelectedCustomer);

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
      id: formData.bookingId,
      restaurantId: "64f862916436ceddb351c43e",
      customerId: selectedCustomer._id,
      numberOfGuests: formData.numberOfGuests,
      date: formData.date,
      time: formData.time,
    };
    await updateBooking(updatedBooking);
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
