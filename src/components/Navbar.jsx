
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#FF6B6B]">
              <path d="M8.21 4.21c-.3-.3-.71-.46-1.13-.46-.42 0-.83.16-1.13.46-.3.3-.46.71-.46 1.13 0 .42.16.83.46 1.13l7.07 7.07 7.07-7.07c.3-.3.46-.71.46-1.13 0-.42-.16-.83-.46-1.13-.3-.3-.71-.46-1.13-.46-.42 0-.83.16-1.13.46L12 10.34 8.21 4.21zm7.07 7.07L12 14.56l-3.28-3.28-7.07 7.07c-.3.3-.46.71-.46 1.13 0 .42.16.83.46 1.13.3.3.71.46 1.13.46.42 0 .83-.16 1.13-.46L12 13.41l7.79 7.2c.3.3.71.46 1.13.46.42 0 .83-.16 1.13-.46.3-.3.46-.71.46-1.13 0-.42-.16-.83-.46-1.13l-7.07-7.07z"/>
            </svg>
            <span className="ml-2 text-xl font-bold text-[#FF6B6B]">tinder</span>
          </Link>
          
         
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700 hidden sm:block">
              Hi, <span className="font-semibold">{user?.firstname}</span>
            </span>
            
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#FF6B6B] transition-all"
              >
                <img src={user?.photoUrl} alt="User" className="w-full h-full object-cover" />
              </button>
              
              {dropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl z-20 py-2 border border-gray-100">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/connections" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Connections
                    </Link>

                    
                      <Link 
                      to="/premium" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Premium
                    </Link>

                    <Link 
                      to="/requests" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Requests
                    </Link>


                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar