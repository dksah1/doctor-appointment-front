import { Context } from "@/main";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <nav
      className={` fixed top-0 w-full transition-all duration-300 ease-in-out z-50 ${
        isScrolled
          ? "bg-white py-3 shadow-md transform opacity-100"
          : "bg-transparent py-6 transform opacity-100"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="logo cursor-pointer  " href="/">
          Trauma care
        </div>
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
            <Button
              onClick={gotoLogin}
              variant="outline"
              className="hover:bg-primary hover:text-white "
            >
              LOGIN
            </Button>
          )}
        </div>
        <div className="hamburger " onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
