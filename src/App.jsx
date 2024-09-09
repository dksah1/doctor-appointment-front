import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import axios from "axios";
import Footer from "./components/Footer";

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true); // Add a loading state to prevent issues with premature renders

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Avoid fetching details if user is not authenticated
        if (!isAuthenticated) return;

        const response = await axios.get(
          "http://localhost:8000/api/user/patient/details",
          {
            withCredentials: true,
          }
        );

        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        // Handle any errors gracefully and reset user state
        setIsAuthenticated(false);
        setUser({});
        console.log("Error in fetching user details:", error);
      } finally {
        setLoading(false); // Ensure loading state is set to false once the call completes
      }
    };

    fetchUser(); // Only fetch details if authenticated
  }, [isAuthenticated, setIsAuthenticated, setUser]);

  if (loading) {
    // Optionally render a loading spinner or message while waiting for authentication state
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
}

export default App;
