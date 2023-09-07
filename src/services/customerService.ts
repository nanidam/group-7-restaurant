import axios from "axios";
import { ICustomer } from "../models/ICustomer";

const BASEURL = import.meta.env.VITE_RESTAURANT_API_URL;

export async function createCustomer(customer: ICustomer) {
  const config = {
    url: `${BASEURL}customer/create`,
    method: "POST",
    data: customer,
  };

  const response = await axios(config);
  return response.data as string;
}

export async function getCustomerById(id: string) {
  const config = {
    url: `${BASEURL}customer/${id}`,
    method: "GET",
  };

  const response = await axios(config);
  return response.data;
}

export async function updateCustomer(customer: ICustomer) {
  const config = {
    url: `${BASEURL}customer/update/${customer.id}`,
    method: "PUT",
    data: {
      id: customer.id,
      name: customer.name,
      lastname: customer.lastname,
      email: customer.email,
      phone: customer.phone,
    },
  };

  const response = await axios(config);
  return response.data;
}
