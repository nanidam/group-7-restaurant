import axios from "axios";
import { get } from "./serviceBase";
import { IBooking } from "../models/IBooking";

const BASEURL = import.meta.env.VITE_RESTAURANT_API_URL;

export async function getBooking(id: string) {
    try {
        const response = await get<IBooking>(`${BASEURL}booking/${id}`);
        return response;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

export async function getBookingsByRestaurantId(restaurantId: string) {
    try {
        const response = await get<IBooking[]>(`${BASEURL}booking/restaurant/${restaurantId}`);
        return response;
    } catch (error) {
        console.error('Error fetching bookings by restaurant ID: ', error);
        throw error;
    }
}

export async function createBooking(bookingData: {
    restaurantId: string;
    date: string;
    time: string;
    numberOfGuests: number;
    customer: {
        name: string;
        lastname: string;
        email: string;
        phone: string;
    };
}) {
    try {
        const response = await axios.post(`${BASEURL}booking/create`, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking: ', error);
        throw error;
    }
}