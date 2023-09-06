import { Outlet } from "react-router-dom";
import { MenuBar } from "./MenuBar";

export function LayoutStructure() {
    return(
        <>
            <header>
                <MenuBar></MenuBar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <p>Made by: Emilia, Nani, Filip</p>
            </footer>
        </>
    )
}

export default LayoutStructure;