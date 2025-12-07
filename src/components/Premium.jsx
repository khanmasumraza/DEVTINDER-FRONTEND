import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false)
  const [loading, setLoading] = useState(false)

  // 1️⃣ Verify if user is premium already
  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true
      })

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

  // 2️⃣ When user buys premium
  const handleBuyClick = async (type) => {
    try {
      setLoading(true)

      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      )

      const { amount, currency, notes, orderId, key } = order.data

      var options = {
        key,
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
        handler: async function () {
          console.log("Payment completed")

          // 🔥 Wait for webhook to update DB then verify again
          setTimeout(async () => {
            await verifyPremiumUser()
            setLoading(false)
          }, 1500)
        },
        modal: {
          ondismiss: function () {
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

  // 3️⃣ UI

  if (isUserPremium) {
    return (
      <div className="m-10 text-center">
        <div className="alert alert-success shadow-lg">
          <div>
            <span className="text-2xl font-bold">🎉 You are now a premium user! 🎉</span>
          </div>
        </div>
      </div>
    )
  }

  return (
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
            <li>✓ 100 connections/day</li>
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
            <li>✓ Chat with everyone</li>
            <li>✓ Unlimited requests</li>
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
