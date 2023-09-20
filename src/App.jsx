import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { fetchPhotos } from "./store/stateAction";
import Login from "./components/auth/Login";
import Gallery from "./components/gallery/Gallery";

const App = () => {
  const dispatch = useDispatch();

  // Use the useEffect hook to dispatch an action to fetch photos when the component mounts
  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Route for the login page */}
        <Route path="/gallery" element={<Gallery />} /> {/* Route for the gallery page */}
      </Routes>
    </Router>
  );
};

export default App;
