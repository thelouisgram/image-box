// Import necessary dependencies and components
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../store/stateSlice";
import Loader from "../gallery/Loader";
import { Link } from "react-router-dom";

// Define the Login component
const Login = () => {
  // State variables to manage email, password, error, loading, and Redux dispatch
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    setEmail('')
    setPassword('')
  }, [])

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!password || !email ){
      return null
    }
    // Set loading state and reset error state
    setLoading(true);
    setError(false);

    // Attempt to sign in with Firebase authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sign-in successful: reset error state, stop loading, navigate to "/gallery", and set user as authenticated in Redux
        setError(false);
        setLoading(false);
        navigate("/gallery");
        dispatch(setAuthenticated(true));
      })
      .catch((error) => {
        // Sign-in failed: set error state, stop loading, and set user as not authenticated in Redux
        setError(true);
        setLoading(false);
        dispatch(setAuthenticated(false));
        setError(error.message)
      });
  };

  // Render the login form
  return (
    <div className="h-[100dvh] min-h-[600px] bg w-full font-Sans text-gray-400">
      <div className="h-full w-full flex justify-center items-center px-3 xs:px-5 ss:px-0">
        <form
          onSubmit={handleSubmit}
          className="h-[500px] w-full ss:w-[500px] rounded-[6px] px-4 ss:px-6 bg-white relative font-Poppins"
        >
          <div className="relative w-full flex justify-center">
            <p className="text-[16px] font-[500] absolute top-[40px] text-gray-700">Welcome to ImageBox</p>
            <h1 className="text-[24px] font-[700] absolute top-[60px] text-gray-900">
              Login
            </h1>
          </div>
          <div className=" w-full h-full flex flex-col justify-center items-start px-2 mt-[30px]">
            <label
              className="text-[12px] font-[500] text-gray-600"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex gap-2 border-b-[1px] border-gray-300 items-center text-gray-400 px-1 w-full mb-[20px]">
              <i className="fa-solid fa-user"></i>
              <input
                id="email"
                className="w-full  rounded-[6px] outline-none py-2 px-2 text-[12px] ss:text-[14px]"
                placeholder="Type your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label
              className="text-[12px] font-[500] text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex gap-2 border-b-[1px] items-center text-gray-400 px-1 w-full mb-[30px]">
              <i className="fa-solid fa-lock "></i>
              <input
                id="password"
                className="w-full  rounded-[6px] outline-none py-2 px-2  placeholder:text-[13px]"
                placeholder="Type your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-red-600 mb-3">{error}</p>
            )}
            <button
              type="submit"
              className="bg-gray-900 outline-none rounded-[4px] hover:bg-gray-600 h-[40px] w-full items-center mb-3 flex justify-center font-[500] text-white"
            >
              {loading ? <Loader /> : <p>Login</p>}
            </button>
            <Link
              className="bg-blue-500 hover:bg-blue-800 outline-none rounded-[4px] h-[40px] w-full items-center mb-3 flex justify-center font-[500] text-white"
              to="/gallery"
            >
              Continue without Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export the Login component as the default export of the module
export default Login;
