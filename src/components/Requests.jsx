import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const requests = useSelector((store) => store.requests)
  const dispatch = useDispatch()

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        { withCredentials: true }
      )
      dispatch(removeRequest(_id))
    } catch (err) {}
  }

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true,
      })

      dispatch(addRequests(res.data))
    } catch (err) {}
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  if (!requests) return

  if (requests.length === 0)
    return <h1 className="flex justify-center">No request found</h1>

  return (
    <div className=" text-center my-10">
      <h1 className="text-bold text-2xl">Request</h1>

      {requests.map((request) => {
        const { _id, firstname, lastname, photoUrl, about, gender } =
          request.fromUserId

        return (
          <div
            key={_id}
            className=" flex justify-between  items-center m-4 p-4  rounded-lg bg-base-200 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover "
                src={photoUrl}
              />
            </div>
            <div className="text-left my-4">
              <h2 className="font-bold text-xl">
                {firstname + ' ' + lastname}
              </h2>
              <p>{about || 'This is a default about of the user!'}</p>
            </div>
            <div className="flex gap-4">
              <button
                className="btn  btn-primary px-6 mx-2 h-18 w-37"
                onClick={() => reviewRequest('rejected', request._id)}
              >
                Reject
              </button>

              <button
                className="btn  btn-secondary px-6 mx-2"
                onClick={() => reviewRequest('accepted', request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Requests
