import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Navbar = () => {

  const user=useSelector((store)=>store.user)
  console.log(user)
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
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

  )
}

export default Navbar