import { Photo } from "../models/Photo";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPhoto } from "../services/PhotoService";

function PhotoDetails() {
  const { photo_id } = useParams();
  const [photoDetails, setPhotoDetails] = useState<Photo | null>(null);

  useEffect(() => {
    fetchPhotoDetails();
  }, [photo_id]);

  async function fetchPhotoDetails() {
    try {
      const { data } = await getPhoto(photo_id);
      setPhotoDetails(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des photos : ", error);
    }
  }

  return (
    <div className="card-container">
      {photoDetails && (
        <>
          <img
            className="card-image-details"
            src={photoDetails.url}
            alt={photoDetails.title}
          />
          <div className="card-footer">
            <p>{photoDetails.title}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default PhotoDetails;
