import "../style/AdminUpdateForm.scss";

export function AdminUpdateForm() {
  return (
    <form>
      <label htmlFor="restaurantId">Restaurant ID</label>
      <input type="text" id="restaurantId" />

      <label htmlFor="date">Date</label>
      <input type="date" id="date" />

      <label htmlFor="time">Time</label>
      <input type="time" id="time" />

      <label htmlFor="numberOfGuests">Number of Guests</label>
      <input type="number" id="numberOfGuests" />

      <label htmlFor="customerId">Customer ID</label>
      <input type="text" id="customerId" />

      <button type="submit">Submit</button>
    </form>
  );
}
