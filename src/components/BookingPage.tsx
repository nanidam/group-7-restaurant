import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../style/bookingPage.scss";
import { getBookingsByRestaurantId } from "../services/bookingService";
import { IBooking } from "../models/IBooking";

export function BookingPage() {
    const [allBookings, setAllBookings] = useState<IBooking[]>([]);
    const [inputDate, setInputDate] = useState('');
    const [inputGuestAmount, setInputGuestAmount] = useState(0);
    const [isFullyBooked, setIsFullyBooked] = useState(false);

    useEffect(() => {
        async function fetchAllBookings() {
            const localRestaurant = localStorage.getItem('restaurant');
            if(localRestaurant) {
                const restaurant = (JSON.parse(localRestaurant));
                const bookings = await getBookingsByRestaurantId(restaurant[0]._id);

                setAllBookings(bookings);
            } else {
                console.log('No restaurant found');
            }
        }

       fetchAllBookings();
    }, [setAllBookings]);

    function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
        setInputDate(e.target.value);
    }

    function handleNumberChange(e: ChangeEvent<HTMLInputElement>) {
        setInputGuestAmount(+e.target.value);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsFullyBooked(false);

        allBookings.map((booking) => {
            if(inputDate === booking.date) {
                console.log('There are reservations made this date');
                checkBookingsOnMatchingDay();
            } else {
                console.log('No bookings this date, A reservation can be made');
            }
        })
    }

    function checkBookingsOnMatchingDay() {
        const bookingAmount= allBookings.filter((booking) => inputDate === booking.date);

        if(bookingAmount.length < 30) {
            console.log('Available tables left, A reservation can be made');
        } else if(bookingAmount.length == 30) {
            console.log('Fully booked, Alert user');
            setIsFullyBooked(true);
        }
    }

    return(
        <>
            <section>
                <div className="formContainer">
                    <h3>Create table reservation</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" onChange={handleDateChange} required></input>
                        <label htmlFor="quantity">Number of Guests</label>
                        <input type="number" name="quantity" min="1" max="6" onChange={handleNumberChange} required></input>
                        <button>Search</button>
                        <span>{isFullyBooked? 'Fully booked, Please choose another date' : ''}</span>
                    </form>
                </div>
            </section>
        </>
    )
}