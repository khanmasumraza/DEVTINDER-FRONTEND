import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false)
  const [loading, setLoading] = useState(false)

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", { withCredentials: true })
      if (res.data.isPremium) {
        setIsUserPremium(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    verifyPremiumUser()
  }, [])

  const handleBuyClick = async (type) => {
    try {
      setLoading(true)
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      )

      const { amount, currency, notes, orderId, key} = order.data

      var options = {
        key: key,
        amount,
        currency,
        name: "DevTinder Premium",
        description: type === "silver" ? "Silver Membership" : "Gold Membership",
        order_id: orderId,
        prefill: {
          name: notes.firstname + " " + notes.lastname,
          email: notes.emailId,
          contact: "+919876543210"
        },
        theme: {
          color: "#3399cc"
        },
        handler: async function (response) {
          // Payment successful - immediately verify and update UI
          console.log("Payment successful", response)
          await verifyPremiumUser()
          setLoading(false)
        },
        modal: {
          ondismiss: function () {
            // User closed the payment modal
            setLoading(false)
          }
        }
      }

      var rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.log("Payment error:", err)
      setLoading(false)
    }
  }

  return isUserPremium ? (
    <div className="m-10 text-center">
      <div className="alert alert-success shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-2xl font-bold">🎉 You are already a premium user! 🎉</span>
        </div>
      </div>
    </div>
  ) : (
    <div className='m-10'>
      {loading && (
        <div className="text-center mb-4">
          <span className="loading loading-spinner loading-lg"></span>
          <p>Processing payment...</p>
        </div>
      )}
      <div className="flex w-full gap-4">
        <div className="card bg-base-300 rounded-box flex-1 p-6">
          <h1 className='font-bold text-3xl mb-4 text-center'>Silver Membership</h1>
          <ul className="space-y-2 mb-6">
            <li>✓ Chat with other people</li>
            <li>✓ 100 connections requests per day</li>
            <li>✓ Blue tick verification</li>
          </ul>
          <button 
            onClick={() => handleBuyClick("silver")} 
            className='btn btn-secondary w-full'
            disabled={loading}
          >
            Buy Silver - ₹300
          </button>
        </div>
        
        <div className="divider divider-horizontal">OR</div>
        
        <div className="card bg-base-300 rounded-box flex-1 p-6">
          <h1 className='font-bold text-3xl mb-4 text-center'>Gold Membership</h1>
          <ul className="space-y-2 mb-6">
            <li>✓ Chat with other people</li>
            <li>✓ Unlimited connections requests</li>
            <li>✓ Gold tick verification</li>
          </ul>
          <button 
            onClick={() => handleBuyClick("gold")} 
            className='btn btn-primary w-full'
            disabled={loading}
          >
            Buy Gold - ₹700
          </button>
        </div>
      </div>
    </div>
  )
}

export default Premium