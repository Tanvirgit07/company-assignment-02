// import { useContext, useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { toast, Toaster } from "sonner";
// import { AuthContext } from "../AuthProvider/AuthProvider";

// const Register = () => {
//   const { createUser, setUser, updateUserProfile, setReload } =
//     useContext(AuthContext);
//   const [showPass, setShowPass] = useState(false);
//   const [registerError, setRegisterError] = useState("");
//   const navigate = useNavigate();
//   const handleRegister = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const name = form.name.value;
//     const email = form.email.value;
//     const password = form.password.value;
//     const photo = form.photo.value;
//     console.log(name, email, password, photo);
//     setRegisterError("");

//     createUser(email, password)
//       .then((result) => {
//         console.log(result.user);
//         updateUserProfile(name, photo).then(() => {
//           setUser(result.user);
//           setReload(true);
//           toast.success("Register Successfully!");
//           setTimeout(() => {
//             navigate("/");
//           }, 2000);
//         });
//       })
//       .catch((error) => {
//         console.log(error.message);
//         setRegisterError(error.message);
//       });
//   };
//   return (
//     <div className="mb-5">
//       <div>
//         <p className="text-center mb-3 text-3xl font-bold text-success">
//           Please Register
//         </p>
//       </div>
//       <form onSubmit={handleRegister}>
//         <div className="max-w-md mx-auto space-y-2  border-solid border-2 border-success px-8 py-10 rounded-xl shadow-2xl">
//           <div>
//             <p className="text-lg font-medium mb-1">Name</p>
//             <label className="input input-bordered flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 16 16"
//                 fill="currentColor"
//                 className="w-4 h-4 opacity-70"
//               >
//                 <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
//               </svg>
//               <input
//                 type="text"
//                 className="grow"
//                 name="name"
//                 placeholder="Username"
//               />
//             </label>
//           </div>
//           <div>
//             <p className="text-lg font-medium mb-1">Photo URL</p>
//             <input
//               type="text"
//               placeholder="Photo URL"
//               name="photo"
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <p className="text-lg font-medium mb-1">Email</p>
//             <label className="input input-bordered flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 16 16"
//                 fill="currentColor"
//                 className="w-4 h-4 opacity-70"
//               >
//                 <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//                 <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//               </svg>
//               <input
//                 type="email"
//                 className="grow"
//                 name="email"
//                 placeholder="Email"
//               />
//             </label>
//           </div>
//           <div className="relative">
//             <p className="text-lg font-medium mb-1">Password</p>
//             <label className="input input-bordered flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 16 16"
//                 fill="currentColor"
//                 className="w-4 h-4 opacity-70"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <input
//                 type={showPass ? "text" : "password"}
//                 className="grow"
//                 name="password"
//                 placeholder="Password"
//               />
//             </label>
//             <span
//               className="absolute top-[46px] right-3 text-xl"
//               onClick={() => setShowPass(!showPass)}
//             >
//               {showPass ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           {registerError && <p className="text-red-600">{registerError}</p>}
//           <div>
//             <p>
//               You have an account ?
//               <Link to="/login">
//                 <span className="text-lg font-semibold text-blue-800 btn btn-sm btn-link">
//                   Login
//                 </span>
//               </Link>
//             </p>
//           </div>
//           <div>
//             <button className="btn btn-active w-full btn-success">
//               Register
//             </button>
//           </div>
//         </div>
//       </form>
//       <Toaster position="top-right" richColors />
//     </div>
//   );
// };

// export default Register;

import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Register = () => {
  const { createUser, setUser, updateUserProfile, setReload } =
    useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    setRegisterError("");

    // Create user with Firebase authentication
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(name, photo).then(() => {
          setUser(user);

          // Prepare user data for saving in the database
          const userInfo = {
            name: name,
            email: email,
            photo: photo,
            uid: user.uid,
            role: "user", // Assign a default role for the user
          };

          // Send user info to the backend to save in MongoDB
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                toast.success("User registered and saved successfully!");
                setReload(true);
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              }
            })
            .catch(() => {
              setRegisterError("Error saving user data to database");
            });
        });
      })
      .catch((error) => {
        setRegisterError(error.message);
      });
  };

  return (
    <div className="mb-5">
      <div>
        <p className="text-center mb-3 text-3xl font-bold text-success">
          Please Register
        </p>
      </div>
      <form onSubmit={handleRegister}>
        <div className="max-w-md mx-auto space-y-2 border-solid border-2 border-success px-8 py-10 rounded-xl shadow-2xl">
          <div>
            <p className="text-lg font-medium mb-1">Name</p>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                name="name"
                placeholder="Username"
                required
              />
            </label>
          </div>
          <div>
            <p className="text-lg font-medium mb-1">Photo URL</p>
            <input
              type="text"
              placeholder="Photo URL"
              name="photo"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <p className="text-lg font-medium mb-1">Email</p>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                className="grow"
                name="email"
                placeholder="Email"
                required
              />
            </label>
          </div>
          <div className="relative">
            <p className="text-lg font-medium mb-1">Password</p>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type={showPass ? "text" : "password"}
                className="grow"
                name="password"
                placeholder="Password"
                required
              />
            </label>
            <span
              className="absolute top-[46px] right-3 text-xl cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {registerError && <p className="text-red-600">{registerError}</p>}
          <div>
            <p>
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-lg font-semibold text-blue-800 btn btn-sm btn-link">
                  Login
                </span>
              </Link>
            </p>
          </div>
          <div>
            <button className="btn btn-active w-full btn-success">
              Register
            </button>
          </div>
        </div>
      </form>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Register;
