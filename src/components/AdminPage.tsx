import { useEffect, useState } from "react";
import { getBookingsByRestaurantId } from "../services/bookingService";
import { ICustomer } from "../models/ICustomer";
import { getCustomerById } from "../services/customerService";
import "../style/AdminPage.scss";
import { AdminUpdateForm } from "./AdminUpdateForm";

export function AdminPage() {
  const [customers, setCustomers] = useState<ICustomer[][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantBookings = async () => {
      const allBookings = await getBookingsByRestaurantId(
        "623b85d54396b96c57bde7c3"
      );

      // Promise.all = Loops all "hidden" awaits
      const customerData = await Promise.all(
        allBookings.map((booking) =>
          getCustomerById(booking.customerId as string)
        )
      );
      setCustomers(customerData);
      setIsLoading(false);
    };

    fetchRestaurantBookings();
  }, []);

  // Bubble sort customers list based on lastname
  const compareCustomers = (
    firstCustomer: ICustomer[],
    secondCustomer: ICustomer[]
  ): number => {
    return (
      firstCustomer[0].lastname.charCodeAt(0) -
      secondCustomer[0].lastname.charCodeAt(0)
    );
  };

  return (
    <>
      <h1>La Trattoria</h1>
      <h3>Guest list:</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="customers-container">
          {customers.sort(compareCustomers).map((customer, index) => {
            return (
              <li
                className="customer"
                key={index}
                onClick={() => console.log(customer[0].name)}
              >
                {customer[0].lastname}, {customer[0].name}
              </li>
            );
          })}
        </section>
      )}
      <section>
        <AdminUpdateForm></AdminUpdateForm>
      </section>
    </>
  );
}
