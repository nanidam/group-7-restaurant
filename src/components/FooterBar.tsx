import { Link } from "react-router-dom";

export function FooterBar() {
  return (
    <>
      <Link to="/admin">
        <button className="admin-btn">Admin</button>
      </Link>
      <p>Made by: Emilia, Nani, Filip</p>
    </>
  );
}
