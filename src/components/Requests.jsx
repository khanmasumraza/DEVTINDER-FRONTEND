import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const requests = useSelector((store) => store.requests)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [processingId, setProcessingId] = useState(null)

  const reviewRequest = async (status, _id) => {
    setProcessingId(_id)
    setLoading(true)
    
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      )
      dispatch(removeRequest(_id))
    } catch (err) {
      console.error('Error reviewing request:', err)
      alert(`Failed to ${status === 'accepted' ? 'accept' : 'reject'} request. Please try again.`)
    } finally {
      setLoading(false)
      setProcessingId(null)
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      })
      dispatch(addRequests(res.data))
    } catch (err) {
      console.error('Error fetching requests:', err)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  if (!requests) return null

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <svg className="w-32 h-32 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Requests</h2>
        <p className="text-gray-500">You don't have any connection requests yet</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Requests</h1>
        <p className="text-gray-500">
          You have {requests.length} pending {requests.length === 1 ? 'request' : 'requests'}
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((request) => {
          const { _id, firstname, lastname, photoUrl, about, gender } = request.fromUserId
          const isProcessing = processingId === request._id

          return (
            <div
              key={_id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between p-6">
            
                <div className="flex items-center flex-1">
                  <div className="relative flex-shrink-0">
                    <img
                      alt={`${firstname} ${lastname}`}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      src={photoUrl}
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#FF6B6B] rounded-full border-2 border-white flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <div className="ml-5 flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                      {firstname} {lastname}
                    </h2>
                    {gender && (
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E8E]/10 text-[#FF6B6B] text-xs font-semibold rounded-full mb-2">
                        {gender}
                      </span>
                    )}
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {about || 'This is a default about of the user!'}
                    </p>
                  </div>
                </div>

                
                <div className="flex gap-3 ml-6">
                  <button
                    className="px-8 py-3 rounded-full bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    onClick={() => reviewRequest('rejected', request._id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Reject'}
                  </button>

                  <button
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-semibold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    onClick={() => reviewRequest('accepted', request._id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Accept'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Requests