import { useEffect, useState } from "react";
import { getBookingsByRestaurantId } from "../services/bookingService";
import { ICustomer } from "../models/ICustomer";
import { getCustomerById } from "../services/customerService";
import "../style/AdminPage.scss";
import { AdminUpdateForm } from "./AdminUpdateForm";
import { IBooking } from "../models/IBooking";
import { Loader } from "./Loader";

export function AdminPage() {
  const [customers, setCustomers] = useState<ICustomer[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allBookings, setAllBookings] = useState<IBooking[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );
  const [showAdminUpdateForm, setShowAdminUpdateForm] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const fetchRestaurantBookings = async () => {
      const getAllBookings = await getBookingsByRestaurantId(
        "64f862916436ceddb351c43e"
      );

      // Promise.all = Loops all "hidden" awaits
      const customerData = await Promise.all(
        getAllBookings.map((booking) =>
          getCustomerById(booking.customerId as string)
        )
      );
      setCustomers(customerData);
      setIsLoading(false);
      setAllBookings(getAllBookings);
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

  const handleCustomerClick = (customer: ICustomer) => {
    setSelectedCustomer(customer);
    setShowAdminUpdateForm(true);
    setFormKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <h1>La Trattoria</h1>
      <h3>Guest List</h3>
      {isLoading ? (
        <section>
          <div className="loaderContainer">
            <Loader></Loader>
          </div>
        </section>
      ) : (
        <section className="customers-container">
          {customers.sort(compareCustomers).map((customer, index) => {
            return (
              <li
                className="customer"
                key={index}
                onClick={() => handleCustomerClick(customer[0])}
              >
                {customer[0].lastname}, {customer[0].name}
              </li>
            );
          })}
        </section>
      )}

      <section>
        {showAdminUpdateForm && selectedCustomer && (
          <AdminUpdateForm
            key={formKey}
            selectedCustomer={selectedCustomer}
            allBookings={allBookings}
            onCancel={() => setShowAdminUpdateForm(false)}
          />
        )}
      </section>
    </>
  );
}

// 64f9d9265eecc88857a6a2ca
// 64f9d9375eecc88857a6a2cb
// 64f9d9495eecc88857a6a2cc
// inserted id create booking 64f9e0405eecc88857a6a2d2
