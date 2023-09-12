import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../style/bookingPage.scss";
import {
  getBookingsByRestaurantId,
  createBooking,
} from "../services/bookingService";
import { IBooking } from "../models/IBooking";
import { ICreateBooking } from "../models/ICreateBooking";

export function BookingPage() {
  const [allBookings, setAllBookings] = useState<IBooking[]>([]);
  const [inputDate, setInputDate] = useState<string>("");
  const [inputGuestAmount, setInputGuestAmount] = useState<number>(1);
  const [isFullyBooked, setIsFullyBooked] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingInfo, setBookingInfo] = useState<ICreateBooking>({
    restaurantId: "",
    date: "",
    time: "",
    numberOfGuests: 0,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });
  const [bookingConfirmation, setBookingConfirmation] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function fetchAllBookings() {
      const localRestaurant = localStorage.getItem("restaurant");
      if (localRestaurant) {
        const restaurant = JSON.parse(localRestaurant);
        const bookings = await getBookingsByRestaurantId(restaurant[0]._id);

        setAllBookings(bookings);
      } else {
        console.log("No restaurant found");
      }
    }

    fetchAllBookings();
  }, []);

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    setInputDate(e.target.value);
  }

  function handleNumberChange(e: ChangeEvent<HTMLInputElement>) {
    setInputGuestAmount(+e.target.value);
  }

  function handleSearchAvailableTimes(e: FormEvent) {
    e.preventDefault();
    setIsFullyBooked(false);

    const matchingBookings = allBookings.filter(
      (booking) => inputDate === booking.date
    );

    if (matchingBookings.length >= 30) {
      console.log("Fully booked, please choose another date");
      setIsFullyBooked(true);
      setAvailableTimes([]);
    } else {
      const bookedTimes = matchingBookings.map((booking) => booking.time);
      const availableTimes = ["18:00", "21:00"].filter(
        (time) => !bookedTimes.includes(time)
      );
      setAvailableTimes(availableTimes);
      setSelectedTime(null);
    }
  }

  function handleTimeSelection(time: string) {
    setSelectedTime(time);
  }

  function handleBookingFormSubmit(e: FormEvent) {
    e.preventDefault();

    const newBooking: ICreateBooking = {
      restaurantId: "",
      date: inputDate,
      time: selectedTime as string,
      numberOfGuests: inputGuestAmount,
      customer: {
        name: bookingInfo.customer.name,
        lastname: bookingInfo.customer.lastname || "",
        email: bookingInfo.customer.email,
        phone: bookingInfo.customer.phone || "",
      },
    };

    const bookingsInLocalStorage = localStorage.getItem("bookings");
    const bookings = bookingsInLocalStorage ? JSON.parse(bookingsInLocalStorage) : [];
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    createBooking(newBooking)
      .then(() => {
        setBookingConfirmation("Booking created successfully");
      })
      .catch((error) => {
        console.error("Error creating booking", error);
      });
  }

  return (
    <>
      <section>
        {selectedTime ? (
          <div className="formContainer">
            {bookingConfirmation ? (
              <p>{bookingConfirmation}</p>
            ) : (
              <>
                <h3>Enter Booking Information</h3>
                <form onSubmit={handleBookingFormSubmit}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={bookingInfo.customer.name}
                    onChange={(e) =>
                      setBookingInfo({
                        ...bookingInfo,
                        customer: {
                          ...bookingInfo.customer,
                          name: e.target.value,
                        },
                      })
                    }
                    required
                  />
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={bookingInfo.customer.lastname}
                    onChange={(e) =>
                      setBookingInfo({
                        ...bookingInfo,
                        customer: {
                          ...bookingInfo.customer,
                          lastname: e.target.value,
                        },
                      })
                    }
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingInfo.customer.email}
                    onChange={(e) =>
                      setBookingInfo({
                        ...bookingInfo,
                        customer: {
                          ...bookingInfo.customer,
                          email: e.target.value,
                        },
                      })
                    }
                    required
                  />
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={bookingInfo.customer.phone}
                    onChange={(e) =>
                      setBookingInfo({
                        ...bookingInfo,
                        customer: {
                          ...bookingInfo.customer,
                          phone: e.target.value,
                        },
                      })
                    }
                    required
                  />
                  <button type="submit">Book</button>
                </form>
              </>
            )}
          </div>
        ) : (
          <div className="formContainer">
            <h3>Create table reservation</h3>
            <form onSubmit={handleSearchAvailableTimes}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                onChange={handleDateChange}
                required
              />
              <label htmlFor="quantity">Number of Guests</label>
              <input
                type="number"
                name="quantity"
                min="1"
                max="6"
                onChange={handleNumberChange}
                required
              />
              <button type="submit">Search</button>
              <span>
                {isFullyBooked
                  ? "Fully booked, Please choose another date"
                  : ""}
              </span>
              {availableTimes.length > 0 && (
                <div>
                  <button
                    type="button"
                    onClick={() => handleTimeSelection("18:00")}
                  >
                    18:00
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTimeSelection("21:00")}
                  >
                    21:00
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </section>
    </>
  );
}