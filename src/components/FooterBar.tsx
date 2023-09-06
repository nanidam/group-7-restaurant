import { Link } from "react-router-dom";
import "../style/FooterBar.scss";

export function FooterBar() {
  return (
    <>
      <div className="footer-wrapper">
        <Link to="/admin">
          <button className="admin-btn">Admin</button>
        </Link>
        <p className="placeholder-text">Made by: Emilia, Nani, Filip </p>
      </div>
    </>
  );
}
