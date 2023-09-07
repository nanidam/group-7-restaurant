import { ChangeEvent, FormEvent, useState } from "react";
import "../style/bookingPage.scss";

export function BookingPage() {
    const [inputDate, setInputDate] = useState('');
    const [inputGuestAmount, setInputGuestAmount] = useState(0);

    function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
        setInputDate(e.target.value); //Se till att lagra i samma format som api-bokningarna
    }

    function handleNumberChange(e: ChangeEvent<HTMLInputElement>) {
        setInputGuestAmount(+e.target.value);
    }

    console.log(inputDate, inputGuestAmount);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        
        /*Logik för att skicka iväg ett anrop och se om det finns bord lediga
            If- Bord tillgängligt - skickar en vidare & anropar funktion Filip bygger på
            Else - Visa errormeddelande och be om ny förfrågan
        */
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