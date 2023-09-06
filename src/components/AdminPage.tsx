import { useEffect, useState } from "react";
import { getBookingsByRestaurantId } from "../services/bookingService";
import { ICustomer } from "../models/ICustomer";
import { getCustomerById } from "../services/customerService";

export function AdminPage() {
  const [customers, setCustomers] = useState<ICustomer[][]>([]);

  useEffect(() => {
    const fetchRestaurantBookings = async () => {
      const allBookings = await getBookingsByRestaurantId(
        "623b85d54396b96c57bde7c3"
      );

      const customerData = await Promise.all(
        allBookings.map((booking) =>
          getCustomerById(booking.customerId as string)
        )
      );
      setCustomers(customerData);
    };

    fetchRestaurantBookings();
  }, []);
  return (
    <>
      <h1>La Trattoria</h1>
      <section>
        <ul>
          {customers.map((customer, index) => {
            return (
              <li key={index}>
                {customer[0].lastname}, {customer[0].name}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
