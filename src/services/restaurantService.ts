import axios from "axios";
import { get } from "./serviceBase";
import { IRestaurant } from "../models/IRestaurant";

const BASEURL = import.meta.env.VITE_RESTAURANT_API_URL;

export async function createRestaurant() {
    axios.post(`${BASEURL}restaurant/create`, {
        "name": "La Trattoria",
        "address": {
            "street": "Via Roma 23",
            "zip": "00100",
            "city": "Rome"
        }
    })
    .then((response) => {
        console.log(response);  
    })
    .catch((error) =>{
        console.log(error);
    })
}

export async function getRestaurant(id: string) {
    const response = await get<IRestaurant[]>(`${BASEURL}restaurant/:${id}`);
    return response;
}