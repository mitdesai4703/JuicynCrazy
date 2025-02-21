import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/appContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin } = useContext(AppContent);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success("Registration successful.");
          setIsLoggedin(true);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-red-700 to-red-400">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-xl shadow-xl w-full sm:w-96 text-gray-200 border border-white/20">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6 text-gray-400">
          {state === "Sign Up" ? "Join us today!" : "Welcome back!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-gray-800/50 border border-gray-700">
              <img src={assets.person_icon} alt="" className="w-5" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none text-white w-full"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <img src={assets.mail_icon} alt="" className="w-5" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none text-white w-full"
              type="email"
              placeholder="Email id"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <img src={assets.lock_icon} alt="" className="w-5" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none text-white w-full"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium text-lg hover:opacity-90 transition-all cursor-pointer">
            {state}
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm mt-4">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"} {" "}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="text-blue-400 cursor-pointer underline hover:text-blue-300"
          >
            {state === "Sign Up" ? "Login here" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
