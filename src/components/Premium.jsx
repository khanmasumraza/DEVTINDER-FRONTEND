import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'

const Premium = () => {
  const navigate = useNavigate()
  const [isUserPremium, setIsUserPremium] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

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

          setTimeout(async () => {
            await verifyPremiumUser()
            setLoading(false)
            setPaymentSuccess(true)
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

  if (paymentSuccess) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center px-6 max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Your premium membership is now active</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium px-6 py-3 rounded-full hover:from-pink-600 hover:to-rose-600 transition-colors"
          >
            Start Exploring
          </button>
        </div>
      </div>
    )
  }

  if (isUserPremium) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center px-6">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-3xl font-bold mb-2">You're Premium!</h1>
          <p className="text-gray-600">Enjoy all the premium features</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen py-10 px-4'>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Upgrade to Premium</h1>
          <p className="text-gray-600">Choose the plan that's right for you</p>
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 border-3 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-700">Processing...</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border">
            <div className="flex items-center justify-between mb-5">
              <h2 className='text-2xl font-bold'>Silver</h2>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                Popular
              </span>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">₹300</span>
              <span className="text-gray-500 text-sm ml-1">/month</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm text-gray-700">Chat with other people</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm text-gray-700">100 connections per day</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm text-gray-700">Blue verification badge</span>
              </div>
            </div>
            
            <button 
              onClick={() => handleBuyClick("silver")} 
              className='w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 rounded-full hover:from-blue-600 hover:to-blue-700 transition-colors disabled:opacity-50'
              disabled={loading}
            >
              Get Silver
            </button>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-white">
            <div className="flex items-center justify-between mb-5">
              <h2 className='text-2xl font-bold'>Gold</h2>
              <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                Best Value
              </span>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">₹700</span>
              <span className="text-pink-100 text-sm ml-1">/month</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm">Chat with everyone</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm">Unlimited connection requests</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm">Gold verification badge</span>
              </div>
            </div>
            
            <button 
              onClick={() => handleBuyClick("gold")} 
              className='w-full bg-white text-pink-600 font-semibold py-3 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50'
              disabled={loading}
            >
              Get Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Premium