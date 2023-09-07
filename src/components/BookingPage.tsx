import "../style/bookingPage.scss";

export function BookingPage() {
    return(
        <>
            <section>
                <h3>Book a table:</h3>
                <div className="formContainer">
                    <form>
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date"></input>
                        <label htmlFor="quantity">Guests</label>
                        <input type="number" name="quantity" min="1" max="6"></input>
                        <button>Search</button>
                    </form>
                </div>
            </section>
        </>
    )
}