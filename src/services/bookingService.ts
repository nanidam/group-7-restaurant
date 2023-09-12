import { del, get, post, put } from "./serviceBase";
import { IBooking } from "../models/IBooking";
import { ICreateBooking } from "../models/ICreateBooking";

const BASEURL = import.meta.env.VITE_RESTAURANT_API_URL;

export async function getBooking(id: string) {
  try {
    const response = await get<IBooking>(`${BASEURL}booking/${id}`);
    return response;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}

export async function getBookingsByRestaurantId(restaurantId: string) {
  try {
    const response = await get<IBooking[]>(
      `${BASEURL}booking/restaurant/${restaurantId}`
    );
    return response;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}

export async function createBooking(bookingSpecifics: ICreateBooking) {
    try {
        const response = await post<ICreateBooking>(`${BASEURL}booking/create`, bookingSpecifics);
        return response;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

export async function updateBooking(booking: IBooking) {
  try {
    const response = await put<IBooking>(
      `${BASEURL}booking/update/${booking.id}`,
      booking
    );
    return response;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}

export async function deleteBooking(id: string) {
  try {
    const response = await del(`${BASEURL}booking/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
