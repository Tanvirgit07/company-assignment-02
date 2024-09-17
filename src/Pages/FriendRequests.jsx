import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/friend-requests/${user.email}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user.email]);

  const handleAccept = async (requestId, userEmail, userName, userPhoto) => {
    try {
      const response = await fetch(
        "http://localhost:5000/friend-requests/accept",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId, userEmail, userName, userPhoto }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the request status to 'accepted' in the local state
      await response.json();
      alert("Friend request accepted!");

      setRequests(
        requests.map((request) =>
          request._id === requestId ? { ...request, status: "accepted" } : request
        )
      );
    } catch (error) {
      console.error("Error accepting friend request:", error);
      alert("Error accepting friend request");
    }
  };

  const handleReject = async (requestId) => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      try {
        const response = await fetch(
          "http://localhost:5000/friend-requests/reject",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ requestId }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        await response.json();
        alert("Friend request rejected!");
        setRequests(requests.filter((request) => request._id !== requestId));
      } catch (error) {
        console.error("Error rejecting friend request:", error);
        alert("Error rejecting friend request");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Friend Requests
      </h1>

      {requests.length > 0 ? (
        <ul className="space-y-6">
          {requests.map((request) => (
            <li
              key={request._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-4 items-center">
                <div>
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={request.senderImage}
                    alt=""
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-lg font-semibold text-gray-800">
                    {request.senderName} wants to be your friend.
                  </p>
                  <p className="text-sm text-gray-500">
                    {request.senderEmail || "No additional message."}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-4">
                {request.status !== "accepted" && (
                  <>
                    <button
                      onClick={() =>
                        handleAccept(
                          request._id,
                          user.email,
                          user.displayName,
                          user.photoURL
                        )
                      }
                      className="px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none transition-colors duration-300 ease-in-out"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none transition-colors duration-300 ease-in-out"
                    >
                      Reject
                    </button>
                  </>
                )}
                {request.status === "accepted" && (
                  <span className="text-green-500 font-semibold">
                    Request Accepted
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No friend requests at the moment.
        </p>
      )}
    </div>
  );
};

export default FriendRequests;


