import { IRestaurant } from "../models/IRestaurant";
import "../style/_contactPage.scss";

export function ContactPage() {
  const localRestaurantData = localStorage.getItem("restaurant");
  let localRestaurantJSON: IRestaurant[] | null = null;

  if (localRestaurantData) {
    localRestaurantJSON = JSON.parse(localRestaurantData);
  }

  return (
    <>
      <div className="wrapper">
        {localRestaurantJSON && (
          <>
            <p>{localRestaurantJSON[0].name}</p>
            <p>{localRestaurantJSON[0].address}</p>
            <p>{localRestaurantJSON[0].zip}</p>
            <p>{localRestaurantJSON[0].city}</p>
            <p>Open: 17:00-01:00</p>
            <p>Phone: +39 123 12 12</p>
          </>
        )}
      </div>
    </>
  );
}
