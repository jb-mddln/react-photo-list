import React from "react";
import { Photo } from "../models/Photo";
import { NavLink } from "react-router-dom";
import { deletePhoto } from "../services/PhotoService";

interface PhotoListProps {
  searchText: string;
  photosArray: Photo[];
  setPhotosArray: React.Dispatch<React.SetStateAction<Photo[]>>;
}
const PhotoList: React.FC<PhotoListProps> = ({
  searchText,
  photosArray,
  setPhotosArray,
}) => {
  const filterPhotoList = photosArray.filter((photo) => {
    return photo.title.indexOf(searchText) !== -1;
  });

  const handleDeleteClick = async (photoId: number) => {
    try {
      await deletePhoto(photoId);
      setPhotosArray((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== photoId)
      );
      // setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la photo : ", error);
    }
  };

  return (
    <>
      <div className="card-container">
        {filterPhotoList.map((photo) => (
          <div key={photo.id} className="card">
            <div className="card-top-action">
              <div className="icon-container">
                <NavLink to={`/${photo.id}`}>
                  <svg
                    fill="#F2FBFD"
                    width="24px"
                    height="24px"
                    viewBox="0 0 32 32"
                  >
                    <title>Voir les détails de la photo</title>
                    <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM8 16q0 0.832 0.576 1.44t1.44 0.576h4v4q0 0.832 0.576 1.408t1.408 0.576 1.408-0.576 0.608-1.408v-4h4q0.8 0 1.408-0.576t0.576-1.44-0.576-1.408-1.408-0.576h-4v-4q0-0.832-0.608-1.408t-1.408-0.608-1.408 0.608-0.576 1.408v4h-4q-0.832 0-1.44 0.576t-0.576 1.408z"></path>
                  </svg>
                </NavLink>
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="red"
                  onClick={() => handleDeleteClick(photo.id)}
                >
                  <title>Supprimmer photo</title>
                  <path
                    d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <img
              className="card-image"
              src={photo.thumbnailUrl}
              alt={photo.title}
            />
            <div className="card-footer">
              <p>{photo.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PhotoList;
