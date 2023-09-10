import React, { useEffect, useState } from "react";
import { ICustomer } from "../models/ICustomer";
import { IBooking } from "../models/IBooking";
import "../style/AdminUpdateForm.scss";
import { deleteBooking, updateBooking } from "../services/bookingService";

interface AdminUpdateFormProps {
  selectedCustomer: ICustomer | null;
  allBookings: IBooking[];
  setCustomers: (customers: ICustomer[][]) => void;
  customers: ICustomer[][];

  onCancel: () => void;
  setAllBookings: (bookings: IBooking[]) => void;
}

export function AdminUpdateForm({
  selectedCustomer,
  allBookings,
  onCancel,
  setAllBookings,
  setCustomers,
  customers,
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

    setAllBookings(updatedBookings);
    alert("Booking has been updated! :)");
  }

  if (!selectedCustomer) {
    return null;
  }

  async function handleDelete() {
    if (selectedCustomer) {
      //update the state of formData
      const updatedBooking = {
        _id: formData.bookingId,
        id: formData.bookingId,
        restaurantId: "64f862916436ceddb351c43e",
        date: formData.date,
        time: formData.time,
        numberOfGuests: formData.numberOfGuests,
        customerId: selectedCustomer._id,
      };

      const updatedBookings = allBookings.filter(
        (booking) => booking._id !== updatedBooking.id
      );

      const updatedCustomers = customers.filter(
        (customer) => customer[0]._id !== selectedCustomer._id
      );

      setAllBookings(updatedBookings);
      setCustomers(updatedCustomers);
      await deleteBooking(formData.bookingId);
      onCancel();
    }
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
      <div className="btn-wrapper">
        <button type="submit">Update</button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </form>
  );
}
