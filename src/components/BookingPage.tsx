import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../style/bookingPage.scss";
import { IRestaurant } from "../models/IRestaurant";
import { getBookingsByRestaurantId } from "../services/bookingService";
import { IBooking } from "../models/IBooking";

export function BookingPage() {
    const [restaurant, setRestaurant] = useState<IRestaurant[]>([]);
    const [inputDate, setInputDate] = useState('');
    const [inputGuestAmount, setInputGuestAmount] = useState(0);
    const [bookings, setBookings] = useState<IBooking[]>([]);

    const localRestaurant = localStorage.getItem('restaurant');

    useEffect(() => {
        if(localRestaurant) {
            setRestaurant(JSON.parse(localRestaurant));
        } else {
            console.log('No restaurant found');
        }
    }, [localRestaurant]);

    function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
        setInputDate(e.target.value); //Se till att lagra i samma format som api-bokningarna
    }

    function handleNumberChange(e: ChangeEvent<HTMLInputElement>) {
        setInputGuestAmount(+e.target.value);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        
        fetchBookings(restaurant[0].id);
        /*Logik för att skicka iväg ett anrop och se om det finns bord lediga
            If- Bord tillgängligt - skickar en vidare & anropar funktion Filip bygger på
            Else - Visa errormeddelande och be om ny förfrågan
        */
    }

    async function fetchBookings(id: string) {
        try {
            const data = await getBookingsByRestaurantId(id);
            console.log(data);
            setBookings(data);
        } catch (error) {
            console.log('Error fetching bookings', error);
        }
    }

    return(
        <>
            <section>
                <div className="formContainer">
                    <h3>Create Booking</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" onChange={handleDateChange}></input>
                        <label htmlFor="quantity">Number of Guests</label>
                        <input type="number" name="quantity" min="1" max="6" onChange={handleNumberChange}></input>
                        <button>Search</button>
                    </form>
                </div>
            </section>
        </>
    )
}