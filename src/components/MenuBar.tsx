import { Link } from "react-router-dom";
import '../style/_menuBar.scss';

export function MenuBar() {
    return (
        <nav>
            <ul className="menuList">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/booking">Booking</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
            <span>La Trattoria</span>
        </nav>
    )
}