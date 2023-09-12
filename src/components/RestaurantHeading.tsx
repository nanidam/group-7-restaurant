import { useEffect, useState } from "react";
import { IRestaurant } from "../models/IRestaurant";
import { Loader } from "./Loader";

export function RestaurantHeading() {
  const [restaurant, setRestaurant] = useState<IRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const localRestaurant = localStorage.getItem("restaurant");

    useEffect(() => {
        if(localRestaurant) {
            setRestaurant(JSON.parse(localRestaurant));
            setIsLoading(false);
        } else {
            console.log('No restaurant found');
        }
    }, [localRestaurant]);
    
    if(isLoading) {
        return(
            <section>
                <div className="loaderContainer">
                <Loader></Loader>
                </div>
            </section>
        );
    }

  return (
    <>
      <h1>{restaurant[0].name}</h1>
    </>
  );
}
