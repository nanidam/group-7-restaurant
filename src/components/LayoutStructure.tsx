import { Outlet } from "react-router-dom";

export function LayoutStructure() {
    return(
        <>
            <header></header>
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