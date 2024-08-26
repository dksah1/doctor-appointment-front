import { Context } from "@/main";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        { email, password, confirmPassword, role: "Patient" },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please login to continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et similique,
        quaerat dolor beatae impedit saepe earum ab rerum assumenda adipisci
        quasi dolores obcaecati asperiores quisquam deserunt eaque! Nemo,
        placeat aperiam.
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <div className="justify-end flex-row ">
          <p className="mb-0 ">Not registered?</p>
          <Link to={"/register"} className="no-underline items-center ">
            Register Now
          </Link>
        </div>
        <div className="justify-center items-center  ">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
