import { createBrowserRouter } from "react-router-dom";
import LayoutStructure from "./components/LayoutStructure";
import { StartPage } from "./components/StartPage";
import { NotFound } from "./components/NotFound";
import { BookingPage } from "./components/BookingPage";
import { ContactPage } from "./components/ContactPage";
import { AdminPage } from "./components/AdminPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutStructure></LayoutStructure>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <StartPage></StartPage>,
        index: true,
      },
      {
        path: "/booking",
        element: <BookingPage></BookingPage>,
      },
      {
        path: "/contact",
        element: <ContactPage></ContactPage>,
      },
      {
        path: "/admin",
        element: <AdminPage></AdminPage>,
      },
    ],
  },
]);
