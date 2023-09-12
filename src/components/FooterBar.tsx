import "../style/_footerBar.scss";
import { Link } from "react-router-dom";
import { IRestaurant } from "../models/IRestaurant";
import { useEffect, useState } from "react";

export function FooterBar() {
  const [localRestaurantJSON, setLocalRestaurantJSON] = useState<
    IRestaurant[] | null
  >(null);

  useEffect(() => {
    const localRestaurantData = localStorage.getItem("restaurant");
    if (localRestaurantData) {
      setLocalRestaurantJSON(JSON.parse(localRestaurantData));
    }
  }, [setLocalRestaurantJSON]);

  return (
    <>
      {localRestaurantJSON && (
        <div className="footer-wrapper">
          <Link to="/admin">
            <button className="admin-btn">Admin</button>
          </Link>
          <p className="placeholder-text">
            {localRestaurantJSON[0].name} <br />
            Made by: Emilia, Nani, Filip
          </p>
        </div>
      )}
    </>
  );
}
