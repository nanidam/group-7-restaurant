import { useEffect, useState } from "react";
import { IRestaurant } from "../models/IRestaurant";
import { createRestaurant, getRestaurant } from "../services/restaurantService";

export function StartPage() {
  const [restaurant, setRestaurant] = useState<[]>([]);

  useEffect(() => {
    const restaurantId = createRestaurant();
  });

  return <>Startpage</>;
}
