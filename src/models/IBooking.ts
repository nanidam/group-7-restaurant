export interface IBooking {
  id?: string;
  _id?: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId?: string;
}
