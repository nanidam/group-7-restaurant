import { Outlet } from "react-router-dom";
import { MenuBar } from "./MenuBar";
import { FooterBar } from "./FooterBar";
import { RestaurantHeading } from "./RestaurantHeading";

export function LayoutStructure() {
  return (
    <>
      <header>
        <MenuBar></MenuBar>
      </header>
      <main>
        <RestaurantHeading></RestaurantHeading>
        <Outlet></Outlet>
      </main>
      <footer>
        <FooterBar />
      </footer>
    </>
  );
}

export default LayoutStructure;
