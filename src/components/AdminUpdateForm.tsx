import "../style/AdminUpdateForm.scss";

export function AdminUpdateForm() {
  return (
    <form className="update-form">
      <label htmlFor="customerId">Customer ID</label>
      <input type="text" id="customerId" />

      <label htmlFor="numberOfGuests">Number of Guests</label>
      <input type="number" id="numberOfGuests" />

      <label htmlFor="date">Date</label>
      <input type="date" id="date" />

      <label htmlFor="time">Time</label>
      <input type="time" id="time" />

      <button type="submit">Submit</button>
      <button>Cancel</button>
    </form>
  );
}
