import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {

  const [emailId,setEmailId]=useState("rohit14@gmail.com");
  const [password,setPassword]=useState("rohitA@123");
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
    console.log(err)
  }
  }
  return (
    <div className="flex justify-center my-10">
    <div className="card bg-lime-100 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center" >Login</h2>
   <div>
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
   
    <div className="card-actions justify-center">
      <button className="btn bg-gray-900 px-8 text-white" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login