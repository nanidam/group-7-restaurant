import { Outlet } from "react-router-dom";
import { MenuBar } from "./MenuBar";
import { FooterBar } from "./FooterBar";

export function LayoutStructure() {
  return (
    <>
      <header>
        <MenuBar></MenuBar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <FooterBar />
      </footer>
    </>
  );
}

export default LayoutStructure;
