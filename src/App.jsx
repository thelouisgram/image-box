import Login from "./components/auth/Login";
import Gallery from "./components/gallery/Gallery";
import { fetchPhotos } from "./store/stateAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux

const App = () => {
  const dispatch = useDispatch(); // Initialize useDispatch

  useEffect(() => {
    // Dispatch the action using dispatch
    dispatch(fetchPhotos());
  }, [dispatch]); // Include dispatch as a dependency in the useEffect dependency array

  return (
    <div>
      {/* <Login /> */}
      <Gallery />
    </div>
  );
};

export default App;
