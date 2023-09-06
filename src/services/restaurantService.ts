import axios from "axios";
import { get } from "./serviceBase";
import { IRestaurant } from "../models/IRestaurant";

const BASEURL = import.meta.env.VITE_RESTAURANT_API_URL;

export async function createRestaurant() {
    try {
        const response = await axios.post(`${BASEURL}restaurant/create`, {
            "name": "La Trattoria",
            "address": {
                "street": "Via Roma 23",
                "zip": "00100",
                "city": "Rome"
            },
        });
        return response.data;
    } catch(error) {
        console.log('Error: ', error);
        throw error;        
    }
    
}

export async function getRestaurant(id: string) {
    const response = await get<IRestaurant[]>(`${BASEURL}restaurant/${id}`);
    return response;
}