import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { fetchPhotos } from "./store/stateAction";
import Login from "./components/auth/Login";
import Gallery from "./components/gallery/Gallery";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
};

export default App;
