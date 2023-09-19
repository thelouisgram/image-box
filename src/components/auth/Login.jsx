import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { setAuthenticated } from "../../store/stateSlice";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    setLoading(true)
    setError(false)
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError(false)
        setLoading(false)
        navigate('/gallery')
        dispatch(setAuthenticated(true))
      })
      .catch((error) => {
        console.log(error)
        setError(true)
        setLoading(false)
        dispatch(setAuthenticated(false))
      });
  };

  return (
    <div className="h-[100vh] min-h-[600px] bg w-full font-Sans text-gray-400">
      <div className="h-full w-full flex justify-center items-center px-3 xs:px-5 ss:px-0">
        <form
          onSubmit={handleSubmit}
          className="h-[500px] w-full ss:w-[500px] rounded-[6px] px-4 ss:px-6 bg-white relative font-Poppins"
        >
          <div className="relative w-full flex justify-center">
            <h1 className="text-[24px] font-[700] absolute top-[50px] text-gray-900">
              Login
            </h1>
          </div>
          <div className=" w-full h-full flex flex-col justify-center items-start px-2">
            <label
              className="text-[12px] font-[500] text-gray-600"
              htmlFor="email"
            >
              Email
            </label>
            <div
              className="flex gap-2 border-b-[1px] border-gray-300 items-center text-gray-400 px-1 w-full mb-[20px]"
            >
              <i className="fa-solid fa-user"></i>
              <input
                id="email"
                className="w-full  rounded-[6px] outline-none py-2  text-[12px] ss:text-[14px]"
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
            <div

              className="flex gap-2 border-b-[1px] items-center text-gray-400 px-1 w-full mb-[30px]"
            >
              <i className="fa-solid fa-lock "></i>
              <input
                id="password"
                className="w-full  rounded-[6px] outline-none py-2  placeholder:text-[13px]"
                placeholder="Type your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {(error ) && <p className="text-red-600 mb-3">Incorrect Email or Password!</p>}
            <button
              type="submit"
              className="button outline-none rounded-full h-auto w-full py-2 flex justify-center font-[500] text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
