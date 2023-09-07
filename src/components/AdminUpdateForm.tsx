import "../style/AdminUpdateForm.scss";

import { ICustomer } from "../models/ICustomer";
import { IBooking } from "../models/IBooking";

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
  if (!selectedCustomer) {
    // Handle the case when no customer is selected
    return null;
  }

  // Find the booking for the selected customer
  const bookingForSelectedCustomer = allBookings.find(
    (booking) => booking.customerId === selectedCustomer._id
  );

  return (
    <form className="update-form">
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
        defaultValue={bookingForSelectedCustomer?.numberOfGuests || ""}
      />

      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        defaultValue={bookingForSelectedCustomer?.date || ""}
      />

      <label htmlFor="time">Time</label>
      <input
        type="time"
        id="time"
        defaultValue={bookingForSelectedCustomer?.time || ""}
      />

      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
