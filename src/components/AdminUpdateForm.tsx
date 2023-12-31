import "../style/_adminUpdateForm.scss";
import React, { useEffect, useState } from "react";
import { ICustomer } from "../models/ICustomer";
import { IBooking } from "../models/IBooking";
import { deleteBooking, updateBooking } from "../services/bookingService";
import { UpdateBookingConfirmation } from "./UpdateBookingConfirmation";

interface AdminUpdateFormProps {
  selectedCustomer: ICustomer | null;
  allBookings: IBooking[];
  onCancel: () => void;
  setAllBookings: (bookings: IBooking[]) => void;
  setCustomers: (customers: ICustomer[][]) => void;
  customers: ICustomer[][];
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

  const [showConfirmation, setShowConfirmation] = useState(false);

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

    const restaurantData = localStorage.getItem("restaurant");

    if (restaurantData) {
      const restaurant = JSON.parse(restaurantData);

      const updatedBooking = {
        _id: formData.bookingId,
        id: formData.bookingId,
        restaurantId: restaurant[0]._id,
        date: formData.date,
        time: formData.time,
        numberOfGuests: formData.numberOfGuests,
        customerId: selectedCustomer._id,
      };

      const updatedBookings = allBookings.map((booking) => {
        if (booking._id === updatedBooking.id) {
          return updatedBooking;
        }
        return booking;
      });

      await updateBooking(updatedBooking);
      setAllBookings(updatedBookings);
      setShowConfirmation(true);
    }
  }

  function handleCloseConfirmation() {
    setShowConfirmation(false);
  }

  if (!selectedCustomer) {
    return null;
  }

  async function handleDelete() {
    if (selectedCustomer) {
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
    <>
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
      {showConfirmation && (
        <UpdateBookingConfirmation
          onClose={handleCloseConfirmation}
          onCancel={onCancel}
        ></UpdateBookingConfirmation>
      )}
    </>
  );
}
