import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AddPhoto from "./components/AddPhoto";
import PhotoList from "./components/PhotoList";
import PhotoDetails from "./components/PhotoDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Photo } from "./models/Photo";
import { getPhotos } from "./services/PhotoService";

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const [photos, setPhotos] = useState<Photo[]>([]);

  const addNewPhoto = (newPhoto: Photo) => {
    setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    try {
      const { data } = await getPhotos();
      setPhotos(data.slice(0, 5));
    } catch (error) {
      console.error("Erreur lors de la récupération des photos : ", error);
    }
  }

  return (
    <Router>
      <Navbar setSearchText={setSearchText} />
      <Routes>
        <Route
          path="/"
          element={
            <PhotoList
              searchText={searchText}
              photosArray={photos}
              setPhotosArray={setPhotos}
            />
          }
        />
        <Route path="/:photo_id" element={<PhotoDetails />} />
        <Route
          path="/add-photo"
          element={<AddPhoto addNewPhoto={addNewPhoto} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
