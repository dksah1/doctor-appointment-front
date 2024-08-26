import { Context } from "@/main";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/patient/register",
        {
          firstName,
          lastName,
          email,
          phone,
          dob,
          gender,
          password,
          role: "Patient",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      console.log("response of patient reg", response);

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
    <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit fugiat,
        voluptate impedit inventore eos animi, ab nam laboriosam aliquid magnam
        molestiae laudantium reprehenderit assumenda accusamus in ea dolorum.
        Dolorem quod cumque doloribus ut ex. Nemo nostrum optio dicta possimus
        labore maiores, iste asperiores vel culpa? Neque aspernatur iure autem
        libero.
      </p>
      <form onSubmit={handleRegister}>
        <div className="">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="justify-end flex-row ">
          <p className="mb-0 ">Already registered?</p>
          <Link to={"/login"} className="no-underline items-center ">
            Login Now
          </Link>
        </div>
        <div className="justify-center items-center  ">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
