export interface ICustomer {
  _id: string | number | readonly string[] | undefined;
  id?: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
}
