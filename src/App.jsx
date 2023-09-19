import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { fetchPhotos } from "./store/stateAction";
import ProtectedRoute from "./components/auth/ProtectedRoute";
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
        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;