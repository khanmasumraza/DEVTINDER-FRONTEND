import React, { useState } from 'react'
import Usercard from './Usercard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
   const [firstname,setfirstname]=useState(user.firstname);
  const [lastname,setlastname]=useState(user.lastname);
  const [age, setage] = useState(user.age || "");
  const [about,setabout]=useState(user.about || "");
  const [photoUrl,setphotoUrl]=useState(user.photoUrl);
  const [gender,setgender]=useState(user.gender || "");
  const [error,seterror]=useState("");
  const[showToast,setshowToast]=useState(false)
  const dispatch=useDispatch();

  const saveProfile=async ()=>{
    seterror("")
    try{
         console.log("Sending data:", {firstname, lastname, photoUrl, about,age,gender})
const res= await axios.put(BASE_URL+"/profile/edit",{firstname,lastname,photoUrl,about},{withCredentials:true});
    console.log("Response:", res.data);
dispatch(addUser(res?.data?.data));
setshowToast(true);
setTimeout(() => {
  setshowToast(false);
}, 3000);
    }
    catch(err){
     console.error(err)
      seterror(err.response?.data || "Failed to update profile")
    }
  }
  return (
    <><div className='flex justify-center  gap-10 my-10'>
    <div className="card bg-lime-100 w-96 shadow-xl p-6 rounded-lg">
  <div className="card-body">
    <h2 className="card-title justify-center" >Edit Profile</h2>

<div className="form-control w-full max-w-xs py-4">
  <label className="label">
    <span className="label-text">Firstname</span>
  </label>
  <input type="text" value={firstname}
   placeholder="" className="input input-bordered w-full max-w-xs my-2" 
   onChange={(e)=>setfirstname(e.target.value)}
   />
</div>

<div className="form-control w-full max-w-xs py-4">
  <label className="label">
    <span className="label-text">Lastname</span>
  </label>
  <input type="text" value={lastname}
   placeholder="" className="input input-bordered w-full max-w-xs my-2" 
   onChange={(e)=>setlastname(e.target.value)}
   />
</div>

<div className="form-control w-full max-w-xs py-4">
  <label className="label">
    <span className="label-text">About</span>
  </label>
  <input type="text" value={about}
   placeholder="" className="input input-bordered w-full max-w-xs my-2" 
   onChange={(e)=>setabout(e.target.value)}
   />
</div>

<div className="form-control w-full max-w-xs py-4">
  <label className="label">
    <span className="label-text">PhotoUrl</span>
  </label>
  <input type="text" value={photoUrl}
   placeholder="" className="input input-bordered w-full max-w-xs my-2" 
   onChange={(e)=>setphotoUrl(e.target.value)}
   />
</div>

 <div className="form-control w-full max-w-xs py-4">
  <label className="label">
    <span className="label-text">Age</span>
  </label>
  <input type="text" value={age}
   placeholder="" className="input input-bordered w-full max-w-xs my-2" 
   onChange={(e)=>setage(e.target.value)}
   />
</div>

   <div className="form-control w-full max-w-xs py-4">
  <label className="label">
    <span className="label-text">Gender</span>
  </label>
  <input type="text" value={gender}
   placeholder="" className="input input-bordered w-full max-w-xs my-2" 
   onChange={(e)=>setgender(e.target.value)}
   />
</div>

   <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn bg-gray-900 px-8 text-white" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>

<div>
<Usercard user={{firstname,lastname,photoUrl,about,age,gender}}/>
</div>
</div>

{showToast && (
   <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile save successfully.</span>
  </div>
</div>
)}
</> 
  );
}

export default EditProfile