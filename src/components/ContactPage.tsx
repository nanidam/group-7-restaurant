import { IRestaurant } from "../models/IRestaurant";
import { useEffect, useState } from "react";
import "../style/_contactPage.scss";

export function ContactPage() {
  const [localRestaurantJSON, setLocalRestaurantJSON] = useState<
    IRestaurant[] | null
  >(null);

  useEffect(() => {
    const localRestaurantData = localStorage.getItem("restaurant");
    if (localRestaurantData) {
      setLocalRestaurantJSON(JSON.parse(localRestaurantData));
    }
  }, []);

  return (
    <div className="wrapper">
      {localRestaurantJSON && (
        <>
          <p className="restaurantInfo">{localRestaurantJSON[0].address}</p>
          <p className="restaurantInfo">
            {localRestaurantJSON[0].zip} {localRestaurantJSON[0].city}
          </p>
          <p className="restaurantInfo">Open: 17:00-01:00</p>
          <p className="restaurantInfo">Phone: +39 123 12 12</p>
        </>
      )}
    </div>
  );
}
