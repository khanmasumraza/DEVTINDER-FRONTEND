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
    <div className="relative w-96 h-[500px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl shadow-2xl overflow-hidden mx-auto">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${photoUrl})`,
          filter: 'brightness(0.8) blur(0.5px)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <div className="absolute top-8 left-8 w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/20">
        <img
          src={photoUrl}
          alt={`${firstname} ${lastname} profile`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-24 left-8 right-8 text-white">
        <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">
          {firstname} {lastname}
        </h2>
        <p className="text-lg opacity-90 leading-relaxed drop-shadow-md max-h-20 overflow-hidden">
          {about}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/30 backdrop-blur-sm">
        <div className="flex justify-center space-x-4">
          <button
            className="px-8 py-3 rounded-full bg-purple-600/80 text-white font-semibold hover:bg-purple-700/90 transition-all duration-200 shadow-lg "
            onClick={() => handleSendRequest("ignored",_id)}
          >
            ignore
          </button>
          <button className="px-8 py-3 rounded-full bg-pink-500/80 text-white font-semibold hover:bg-pink-600/90 transition-all duration-200 shadow-lg"
            onClick={() => handleSendRequest("intrested",_id)}>
            interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default Usercard
