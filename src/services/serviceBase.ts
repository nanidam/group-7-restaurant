import axios from "axios";

//TODO: endpoints instead of url?
export async function get<T>(url: string) {
  const response = await axios.get<T>(url);
  return response.data;
}

export async function post<T>(url: string, data: any) {
    const response = await axios.post<T>(url, data);
    return response.data;
}

export async function put<T>(url: string, data: any) {
    const response = await axios.put<T>(url, data);
    return response.data;
}

}*/