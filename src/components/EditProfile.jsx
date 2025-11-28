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
    <>
      <div className='flex justify-center gap-10 my-10 px-4'>
 
        <div className="bg-white w-full max-w-md shadow-2xl p-8 rounded-3xl border border-gray-100">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Edit Profile</h2>

        
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input 
              type="text" 
              value={firstname}
              placeholder="Enter first name" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all" 
              onChange={(e)=>setfirstname(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input 
              type="text" 
              value={lastname}
              placeholder="Enter last name" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all" 
              onChange={(e)=>setlastname(e.target.value)}
            />
          </div>

       <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About
            </label>
            <textarea 
              value={about}
              placeholder="Tell us about yourself..." 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all resize-none h-24" 
              onChange={(e)=>setabout(e.target.value)}
            />
          </div>

          
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo URL
            </label>
            <input 
              type="text" 
              value={photoUrl}
              placeholder="https://example.com/photo.jpg" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all" 
              onChange={(e)=>setphotoUrl(e.target.value)}
            />
          </div>

         
          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input 
                type="number" 
                value={age}
                placeholder="25" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all" 
                onChange={(e)=>setage(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select 
                value={gender}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all bg-white" 
                onChange={(e)=>setgender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

       
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

      
          <button 
            className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white py-3.5 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-[1.02] transition-all" 
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </div>

        
        <div className="hidden lg:block">
          <Usercard user={{firstname,lastname,photoUrl,about,age,gender}}/>
        </div>
      </div>

    
      {showToast && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-lg">Profile saved successfully!</span>
          </div>
        </div>
      )}
    </> 
  );
}

export default EditProfile
