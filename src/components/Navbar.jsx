import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constant"
import { removeUser } from "../utils/userSlice"

const Navbar = () => {

  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogout=async ()=>{
try{
 await axios.post(BASE_URL + "/logout",{},{withCredentials:true})
 dispatch(removeUser());
 return navigate("/login");
}
catch(err){
console.err(err)
}
  }
  return (
     <div className="navbar bg-red-400">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">devTinder</Link>
  </div>
  <div className="flex gap-2">

       <p className="px-4">Welcome {user?.firstname}</p>
    <div className="dropdown dropdown-end mx-6 px-4 flex items-center">
     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
  {user && (
    <div className="w-14 h-12 rounded-full ">
      <img
        alt="User photo"
        src={user.photoUrl}

      />
    </div>
  )}
</div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to="/connections">Connections</Link>
          </li>

          <li>
          <Link to="/requests">Request</Link>
          </li>

        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

  )
}

export default Navbar