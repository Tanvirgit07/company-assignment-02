// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../AuthProvider/AuthProvider";

// const Home = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [friends, setFriends] = useState([]);
//   const { user: person } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/users`);
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }
//         const data = await response.json();
//         setUsers(data);
//         setFilteredUsers(data); // Initialize filteredUsers with all users
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const fetchFriends = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/friend-list`);
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }
//         const data = await response.json();
//         setFriends(data);
//       } catch (error) {
//         console.error("Error fetching friends:", error);
//         setError(error.message);
//       }
//     };

//     if (person.email) {
//       fetchFriends();
//     }
//   }, [person.email]);

//   useEffect(() => {
//     const handleSearch = () => {
//       if (searchTerm.trim() === "") {
//         setFilteredUsers(users); // Show all users if search term is empty
//       } else {
//         const lowercasedSearchTerm = searchTerm.toLowerCase();
//         const filtered = users.filter(
//           (user) =>
//             user.name.toLowerCase().includes(lowercasedSearchTerm) ||
//             user.email.toLowerCase().includes(lowercasedSearchTerm)
//         );
//         setFilteredUsers(filtered);
//       }
//     };

//     handleSearch();
//   }, [searchTerm, users]);

//   const sendFriendRequest = async (recipient) => {
//     try {
//       const senderName = person.displayName;
//       const senderEmail = person.email;
//       const senderImage = person.photoURL;
//       const recipientId = recipient._id; // Updated to use recipient's ID
//       const recipientName = recipient.name;
//       const recipientEmail = recipient.email;
//       const recipientImage = recipient.photo;
//       console.log(person.displayName,)

//       const response = await fetch("http://localhost:5000/friend-requests", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           senderName,
//           recipientId,
//           senderEmail,
//           senderImage,
//           recipientName,
//           recipientEmail,
//           recipientImage,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const result = await response.json();
//       console.log("Friend request sent:", result);
//       alert("Friend request sent!");
//     } catch (error) {
//       console.error("Error sending friend request:", error);
//       alert("Error sending friend request");
//     }
//   };

//   const handleUnfriend = async (friendId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/unfriend/${friendId}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const result = await response.json();
//       alert(result.message);
//       setFriends(friends.filter((friend) => friend._id !== friendId));
//     } catch (error) {
//       console.error("Error removing friend:", error);
//       alert("Error removing friend");
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen text-lg text-gray-500">
//         Loading...
//       </div>
//     );
//   if (error)
//     return (
//       <div className="flex justify-center items-center h-screen text-lg text-red-500">
//         Error: {error}
//       </div>
//     );

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-gray-100 mt-10 min-h-screen">
//       <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
//         User List
//       </h1>

//       <div className="mb-6">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search users by name or email..."
//           className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="mb-12">
//         <h2 className="text-3xl font-semibold mb-4 text-gray-900">Friends</h2>
//         {friends.length > 0 ? (
//           <ul className="space-y-4">
//             {friends.map((friend) => (
//               <li
//                 key={friend._id}
//                 className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
//               >
//                 <div className="flex gap-4 items-center">
//                   <div>
//                     <img
//                       src={friend.image}
//                       alt={`${friend.name}'s photo`}
//                       className="w-16 h-16 rounded-full border-2 border-gray-300"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-xl font-semibold text-gray-800">
//                       {friend.nameUser}
//                       <p className="text-gray-600">{friend.mailUser}</p>
//                     </p>
//                     <button
//                       onClick={() => handleUnfriend(friend._id)}
//                       className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                       Unfriend
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-center text-gray-500">No friends found.</p>
//         )}
//       </div>

//       <h2 className="text-3xl font-semibold mb-4 text-gray-900">Suggestions</h2>
//       {filteredUsers.length > 0 ? (
//         <ul className="space-y-4">
//           {filteredUsers.map((user) => (
//             <li
//               key={user._id}
//               className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <div className="flex gap-4 items-center">
//                 <div>
//                   <img
//                     src={user.photo}
//                     alt={`${user.name}'s photo`}
//                     className="w-16 h-16 rounded-full border-2 border-gray-300"
//                   />
//                 </div>
//                 <div>
//                   <p className="text-xl font-semibold text-gray-800">
//                     {user.name}
//                   </p>
//                   <p className="text-gray-600">{user.email}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => sendFriendRequest(user)} // Updated to pass the user object
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Send Friend Request
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-center text-gray-500">No users found.</p>
//       )}
//     </div>
//   );
// };

// export default Home;


import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const { user: person } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`http://localhost:5000/friend-list`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setError(error.message);
      }
    };

    if (person.email) {
      fetchFriends();
    }
  }, [person.email]);

  useEffect(() => {
    const handleSearch = () => {
      if (searchTerm.trim() === "") {
        setFilteredUsers(users);
      } else {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = users.filter(
          (user) =>
            user.name.toLowerCase().includes(lowercasedSearchTerm) ||
            user.email.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredUsers(filtered);
      }
    };

    handleSearch();
  }, [searchTerm, users]);

  const sendFriendRequest = async (recipient) => {
    try {
      const senderName = person.displayName;
      const senderEmail = person.email;
      const senderImage = person.photoURL;
      const recipientId = recipient._id;
      const recipientName = recipient.name;
      const recipientEmail = recipient.email;
      const recipientImage = recipient.photo;
      console.log(person.displayName);

      const response = await fetch("http://localhost:5000/friend-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName,
          recipientId,
          senderEmail,
          senderImage,
          recipientName,
          recipientEmail,
          recipientImage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Friend request sent:", result);
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("Error sending friend request");
    }
  };

  const handleUnfriend = async (friendId) => {
    try {
      const response = await fetch(`http://localhost:5000/unfriend/${friendId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      alert(result.message);
      setFriends(friends.filter((friend) => friend._id !== friendId));
    } catch (error) {
      console.error("Error removing friend:", error);
      alert("Error removing friend");
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
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 mt-10 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
        User List
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name or email..."
          className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">Friends</h2>
        {friends.length > 0 ? (
          <ul className="space-y-4">
            {friends.map((friend) => (
              <li
                key={friend._id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-between"
              >
                <div className="flex gap-4 items-center">
                  <div>
                    <img
                      src={friend.image}
                      alt={`${friend.name}'s photo`}
                      className="w-16 h-16 rounded-full border-2 border-gray-300"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      {friend.nameUser}
                      <p className="text-gray-600">{friend.mailUser}</p>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleUnfriend(friend._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Unfriend
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No friends found.</p>
        )}
      </div>

      <h2 className="text-3xl font-semibold mb-4 text-gray-900">Suggestions</h2>
      {filteredUsers.length > 0 ? (
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-between"
            >
              <div className="flex gap-4 items-center">
                <div>
                  <img
                    src={user.photo}
                    alt={`${user.name}'s photo`}
                    className="w-16 h-16 rounded-full border-2 border-gray-300"
                  />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => sendFriendRequest(user)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Friend Request
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default Home;

