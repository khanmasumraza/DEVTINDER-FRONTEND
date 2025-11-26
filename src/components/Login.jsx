import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstname, lastname, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6B6B] via-[#FF8E8E] to-[#FFA5A5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <svg viewBox="0 0 24 24" className="w-16 h-16 fill-white mx-auto mb-4">
            <path d="M8.21 4.21c-.3-.3-.71-.46-1.13-.46-.42 0-.83.16-1.13.46-.3.3-.46.71-.46 1.13 0 .42.16.83.46 1.13l7.07 7.07 7.07-7.07c.3-.3.46-.71.46-1.13 0-.42-.16-.83-.46-1.13-.3-.3-.71-.46-1.13-.46-.42 0-.83.16-1.13.46L12 10.34 8.21 4.21zm7.07 7.07L12 14.56l-3.28-3.28-7.07 7.07c-.3.3-.46.71-.46 1.13 0 .42.16.83.46 1.13.3.3.71.46 1.13.46.42 0 .83-.16 1.13-.46L12 13.41l7.79 7.2c.3.3.71.46 1.13.46.42 0 .83-.16 1.13-.46.3-.3.46-.71.46-1.13 0-.42-.16-.83-.46-1.13l-7.07-7.07z"/>
          </svg>
          <h1 className="text-5xl font-bold text-white tracking-tight">tinder</h1>
        </div>

   
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {isLoginForm ? "Sign in" : "Create Account"}
          </h2>


          {!isLoginForm && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all"
            />
          </div>


          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

    
          <button
            onClick={isLoginForm ? handleLogin : handleSignup}
            className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white py-3 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
          >
            {isLoginForm ? "Sign In" : "Create Account"}
          </button>

          {isLoginForm && (
            <p className="text-center text-sm text-gray-500 mt-4 cursor-pointer hover:text-gray-700">
              Trouble signing in?
            </p>
          )}

         
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

        
          <button
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError("");
            }}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-full text-base font-semibold hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-all"
          >
            {isLoginForm ? "Create New Account" : "Sign In Instead"}
          </button>
        </div>

  
        <p className="text-center text-xs text-white mt-6 px-8">
          By signing in, you agree to our Terms. Learn how we process your data in our Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;