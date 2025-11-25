import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";


const Login = () => {

  const [emailId,setEmailId]=useState("");
  const [password,setPassword]=useState("");
  const [firstname,setFirstname]=useState("")
  const [lastname,setLastname]=useState("")
  const[isLoginForm,setIsLoginForm]=useState(false)
  const [error, setError] = useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const handleLogin = async ()=>{
  try{ const res=await axios.post(BASE_URL + "/login",{
      emailId,
      password,
  },{withCredentials:true});
  dispatch(addUser(res.data))
  return navigate("/");
  }
  catch(err){
    setError(err?.response?.data || "Something went wrong")
  }
  }

  const handleSignup= async ()=>{
    try{
const res=await axios.post(BASE_URL+"/signup",
  {firstname,lastname,emailId,password},
  {withCredentials:true}
);
dispatch(addUser(res.data.data))
  return navigate("/profile");
    }
    catch(err){
    setError(err?.response?.data || "Something went wrong")
    }
  }
  return (
    <div className="flex justify-center my-10">
    <div className="card bg-lime-100 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center" >{isLoginForm ? "Login" :"SignUp"}</h2>
   <div>

    {!isLoginForm && <><div className="form-control w-full max-w-xs py-4">
  <label className="label">
    <span className="label-text">Firstname</span>
  </label>
  <input type="text" value={firstname}
   placeholder="" className="input input-bordered w-full max-w-xs my-2" 
   onChange={(e)=>setFirstname(e.target.value)}
   />
</div>

<div className="form-control w-full max-w-xs py-4">
  <label className="label">
    <span className="label-text">Last name</span>
  </label>
  <input type="text" value={lastname}
   placeholder="" className="input input-bordered w-full max-w-xs my-2" 
   onChange={(e)=>setLastname(e.target.value)}
   />
</div>
    </>}

<div className="form-control w-full max-w-xs py-4">
  <label className="label">
    <span className="label-text">Email ID</span>
  </label>
  <input type="text" value={emailId}
   placeholder="" className="input input-bordered w-full max-w-xs my-2" 
   onChange={(e)=>setEmailId(e.target.value)}
   />
</div>


   </div>
<div className="form-control w-full max-w-xs my-4">
  <label className="label">
    <span className="label-text">Password</span>
  </label>
  <input type="text" value={password}
   placeholder="" className="input input-bordered w-full max-w-xs my-2" 
     onChange={(e)=>setPassword(e.target.value)}
     />
</div>
   <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn bg-gray-900 px-8 text-white"
       onClick={isLoginForm ? handleLogin:handleSignup}>
{isLoginForm? "Login" : "SignUp"}
      </button>
    </div>
     <p className="m-auto pointer py-2" onClick={()=>setIsLoginForm((value)=>!value)}>
      {isLoginForm? 
      "New User? SignUp Here"
       :"Existing User? Login here"}</p>

  </div>
</div>
</div>

  )
}

export default Login