import { useEffect, useState } from "react";
import { IRestaurant } from "../models/IRestaurant";
import { createRestaurant, getRestaurant } from "../services/restaurantService";
import "../style/_startPage.scss";
import { Loader } from "./Loader";
import { RestaurantHeading } from "./RestaurantHeading";

export function StartPage() {

    const [restaurant, setRestaurant] = useState<IRestaurant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const localRestaurant = localStorage.getItem('restaurant');

    useEffect(() => {
      async function createNewRestaurant() {
        const data = await createRestaurant();
        fetchRestaurant(data);
      }
  
      async function fetchRestaurant(id: string) {
        try {
          const data = await getRestaurant(id);
          localStorage.setItem('restaurant', JSON.stringify(data));
          setRestaurant(data);
        } catch (error) {
          console.error('Error fetching restaurant:', error);
        } finally {
          setIsLoading(false);
        }
      }
      
      if (localRestaurant) {
        setRestaurant(JSON.parse(localRestaurant));
        setIsLoading(false);
      } else {
        createNewRestaurant();
      }
    }, []);
  
    if(isLoading) {
        return (
          <section>
            <div className="loaderContainer">
              <Loader></Loader>
            </div>
          </section>
        )
    }
  
    return (
      <section>
            <p>
                {restaurant[0].name} is a popular Italian restaurant located in the heart of Rome, known for its authentic Italian cuisine and cozy atmosphere. 
                We offer classic pasta dishes, wood-fired pizzas, and delicious desserts, making it a favorite dining spot for both locals and tourists 
                looking to experience the flavors of Italy in a traditional trattoria setting.
            </p>
            <button>Menu</button>      
      </section>
    );
}

