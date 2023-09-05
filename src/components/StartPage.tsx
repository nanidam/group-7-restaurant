import { useEffect, useState } from "react"
import { IRestaurant } from "../models/IRestaurant";
import { createRestaurant, getRestaurant } from "../services/restaurantService";

export function StartPage() {
    const [restaurant, setRestaurant] = useState<IRestaurant[]>([]); 

    useEffect(() => {
        const localRestaurant = localStorage.getItem('restaurant');

        async function createNewRestaurant() {
            const data = await createRestaurant();

            fetchRestaurant(data);
        }

        async function fetchRestaurant(id: string) {
            const data = await getRestaurant(id);

            localStorage.setItem('restaurant', JSON.stringify(data));
            setRestaurant(data);          
        }

        if(localRestaurant) {
            console.log('Restaurant exists');
            
            setRestaurant(JSON.parse(localRestaurant));
            console.log(restaurant);
        } else {
            createNewRestaurant();
        }
    }, []);

    return(
        <section>
        <h1>Welcome to {restaurant[0].name}!</h1>
        <p>
            {restaurant[0].name} is a popular Italian restaurant located in the heart of Rome, known for its authentic Italian cuisine and cozy atmosphere. 
            We offer classic pasta dishes, wood-fired pizzas, and delicious desserts, making it a favorite dining spot for both locals and tourists 
            looking to experience the flavors of Italy in a traditional trattoria setting.
        </p>
        </section>
    )
}