import { Context } from "@/main";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const handleLogout = async () => {
    await axios
      .get("http://localhost:8000/api/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const gotoLogin = async () => {
    navigateTo("/login");
  };

  return (
    <nav className="container">
      <div className="logo">Trauma care</div>
      <div className={show ? "navlinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/appointment"}>APPPONITMENT</Link>
          <Link to={"/about"}>ABOUT US</Link>
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <Button onClick={gotoLogin}>LOGIN</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
