import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'

const Premium = () => {

  const[isUserPremium,setIsUserPremium]=useState(false)

useEffect(()=>{
  verifyPremiumUser();
},[])

  const verifyPremiumUser =async ()=>{
    const res= await axios.get(BASE_URL+"/premium/verify",{withCredentials:true})
  }

if(res.data.isPremium){
  setIsUserPremium(true);
}


    const handleBuyClick=async (type)=>{
const order= await axios.post(
  BASE_URL + "/payment/create",
  {
    membershipType:type,
  },
  {withCredentials:true}
);

const {amount,currency,notes,orderId,key}=order.data;
var options = {
    key: key, 
    amount,
   currency,
    name: "Khan Masum", 
    description: "Test Transaction",
  order_id: orderId, 
    prefill: {
        name: notes.firstname + " " +notes. lastname , 
        email: notes.emailId,
        contact: "+919876543210" 
    },
    theme: {
        color: "#3399cc"
    },
handler:verifyPremiumUser
};

 // It should open the Razorpay Dialog Box
 var rzp = new window.Razorpay(options);
 rzp.open();
    };
  return isUserPremium ?(
      "You already a premium user"
    ) :(<div className='m-10'>
   <div className="flex w-full">
  <div className="card bg-base-300 rounded-box grid h-70 grow place-items-center">
    <h1 className='font-bold text-3xl'>Silver Membership</h1>
    <ul>
      <li> - Chat with other people</li>
      <li> -100 connections Requests per day</li>
      <li> -Blue tick</li>
      <button onClick={()=>handleBuyClick("silver")}  className='btn btn-secondary'>Buy Silver</button>
    </ul>
  </div>
  <div className="divider divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-70 grow place-items-center">

   <h1 className='font-bold text-3xl'>Silver Membership</h1>
    <ul>
      <li> - Chat with other people</li>
      <li> -Infinite connections Requests per day</li>
      <li> -Blue tick</li>
      <button  onClick={()=>handleBuyClick("gold")} className='btn btn-primary'>Buy Gold</button>
    </ul>
  </div>
</div>
  </div>
  );
}

export default Premium