import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log("Connections response:", res.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <svg
          className="w-32 h-32 text-gray-300 mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Connections Yet
        </h2>
        <p className="text-gray-500">Start swiping to make connections!</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Connections</h1>
        <p className="text-gray-500">
          You have {connections.length}{" "}
          {connections.length === 1 ? "connection" : "connections"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connections.map((connection) => {
          const { _id, firstname, lastname, photoUrl, about, gender } = connection;

          return (
            <div
              key={_id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.02]"
            >
              <div className="flex items-center p-6">
              
                <div className="relative flex-shrink-0">
                  <img
                    alt={`${firstname} ${lastname}`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    src={photoUrl}
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-full border-2 border-white"></div>
                </div>

             
                <div className="flex-1 ml-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {firstname} {lastname}
                  </h2>
                  {gender && (
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E8E]/10 text-[#FF6B6B] text-xs font-semibold rounded-full mb-2">
                      {gender}
                    </span>
                  )}
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {about || "No bio available"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;