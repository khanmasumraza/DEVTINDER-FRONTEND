import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constant'
import { removeUserFromFeed } from '../utils/feedSlice'
import axios from 'axios'

const Usercard = ({ user }) => {
  const dispatch = useDispatch()

  if (!user) {
    return null
  }
  const {_id, firstname, lastname, photoUrl, about } = user

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/send/' + status + '/' + userId,
        {},
        { withCredentials: true }
      )
      dispatch(removeUserFromFeed(userId))
    } catch (err) {
      console.log("ERROR:",err)
    }
  }
  
  return (
    <div className="relative w-96 h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
    
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-orange-50 animate-pulse opacity-20"></div>
      
     
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${photoUrl})`,
        }}
      >
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

  
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-20 left-10 text-pink-300/20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          ❤️
        </div>
        <div className="absolute bottom-32 right-16 text-red-300/20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          💕
        </div>
        <div className="absolute bottom-40 left-20 text-pink-400/20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          💖
        </div>
      </div>

     
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-28">
        <h2 className="text-4xl font-bold mb-2 text-white drop-shadow-2xl">
          {firstname} {lastname}
        </h2>
        <p className="text-base text-white/95 leading-relaxed drop-shadow-lg line-clamp-3">
          {about}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/98 to-white/95 backdrop-blur-md">
        <div className="flex justify-center space-x-4">
          <button
            className="px-10 py-3.5 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-300"
            onClick={() => handleSendRequest("ignored",_id)}
          >
            ignore
          </button>
          <button 
            className="px-10 py-3.5 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-semibold hover:from-[#FF5252] hover:to-[#FF7575] transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
            onClick={() => handleSendRequest("intrested",_id)}
          >
            interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default Usercard