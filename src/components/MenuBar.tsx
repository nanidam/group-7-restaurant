import { Link } from "react-router-dom";
import '../style/_menuBar.scss';

export function MenuBar() {
    return (
        <nav>
            <ul className="menuList">
                <li>
                    <Link to="/">Start</Link>
                </li>
                <li>
                    <Link to="/booking">Booking</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}