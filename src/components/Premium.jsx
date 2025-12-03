// import axios from 'axios'
// import React from 'react'
// import { BASE_URL } from '../utils/constant'

// const Premium = () => {

//     const handleBuyClick = async (type) => {
//         try {
//             const response = await axios.post(
//                 BASE_URL + "/payment/create",
//                 {
//                     membershipType: type,
//                 },
//                 { withCredentials: true }
//             );

//             const { amount, currency, notes, orderId, key } = response.data;

//             var options = {
//                 key: key,
//                 amount: amount,
//                 currency: currency,
//                 name: "Khan Masum", 
//                 description: "Membership Purchase",
//                 order_id: orderId, 
//                 prefill: {
//                     name: notes.firstname + " " + notes.lastname,
//                     email: notes.emailId,
//                     contact: "+919876543210" 
//                 },
//                 handler: function (response) {
//                     console.log('Payment successful:', response);
//                     alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
//                 },
//                 theme: {
//                     color: "#3399cc"
//                 }
//             };

           
//             var rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (error) {
//             console.error('Error creating order:', error);
//         }
//     };

//     return (
//         <div className='m-10'>
//             <div className="flex w-full">
//                 <div className="card bg-base-300 rounded-box grid h-70 grow place-items-center">
//                     <h1 className='font-bold text-3xl'>Silver Membership</h1>
//                     <ul>
//                         <li> - Chat with other people</li>
//                         <li> - 100 connections Requests per day</li>
//                         <li> - Blue tick</li>
//                         <button onClick={() => handleBuyClick("silver")} className='btn btn-secondary'>Buy Silver</button>
//                     </ul>
//                 </div>
//                 <div className="divider divider-horizontal">OR</div>
//                 <div className="card bg-base-300 rounded-box grid h-70 grow place-items-center">
//                     <h1 className='font-bold text-3xl'>Gold Membership</h1>
//                     <ul>
//                         <li> - Chat with other people</li>
//                         <li> - Infinite connections Requests per day</li>
//                         <li> - Blue tick</li>
//                         <button onClick={() => handleBuyClick("gold")} className='btn btn-primary'>Buy Gold</button>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Premium

import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constant'

const Premium = () => {

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
    }
};

 // It should open the Razorpay Dialog Box
 var rzp = new window.Razorpay(options);
 rzp.open();
    };
  return (
    <div className='m-10'>
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

  )
}

export default Premium