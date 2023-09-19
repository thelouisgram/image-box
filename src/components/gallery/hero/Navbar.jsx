import { auth } from "../../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticated } from "../../../store/stateSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.app);
  const handleLogoutClick = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setAuthenticated());
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <div className="flex justify-between items-center w-full pt-4 md:w-[1100px] mx-auto">
      <h1 className="text-[18px] md:text-[30px] font-[700] text-white">
        ImageBox
      </h1>
      {!isAuthenticated ? (
        <Link
          to="/"
          className="text-[12px] sm:text-[16px] w-auto h-auto px-4 sm:px-6 py-1 md:py-2 bg-white text-gray-700 rounded-[4px]  font-[500]"
        >
          Login
        </Link>
      ) : (
        <button
          onClick={handleLogoutClick}
          className="text-[12px] sm:text-[16px] w-auto h-auto px-4 sm:px-6 py-1 md:py-2 bg-white text-gray-700 rounded-[4px]  font-[500]"
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default Navbar;
