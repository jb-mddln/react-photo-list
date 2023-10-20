import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Photo } from "../models/Photo";
import { Navigate } from "react-router-dom";

const validationSchemaPost = Yup.object({
  title: Yup.string()
    .min(5, "Le titre de la photo doit comporter au moins 5 caractères.")
    .required("Le titre de la photo est obligatoire."),
});

interface AddPhotoProps {
  addNewPhoto: (newPhoto: Photo) => void;
}

const AddPhoto: React.FC<AddPhotoProps> = ({ addNewPhoto }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const initialValue: Photo = {
    id: Date.now(),
    albumId: 1,
    title: "",
    url: "https://via.placeholder.com/600/6dd9cb",
    thumbnailUrl: "https://via.placeholder.com/150/6dd9cb",
  };

  const formikPost = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchemaPost,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (newPhoto: Photo): void => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    addNewPhoto(newPhoto);
    setTimeout(() => {
        setRedirect(true);
      }, 1000);
    /*addPhoto(newPhoto)
      .then((response) => {
        setIsLoading(false);
        addNewPhoto(newPhoto);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête POST :", error);
        setIsLoading(false);
      });*/
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={formikPost.handleSubmit}>
      <div>
        <input
          type="text"
          id="title"
          name="title"
          onChange={formikPost.handleChange}
          value={formikPost.values.title}
          placeholder="Titre de la photo"
        />
        {formikPost.touched.title && formikPost.errors.title ? (
          <div style={{ color: "red" }}>{formikPost.errors.title}</div>
        ) : null}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : "Ajouter"}
        </button>
      </div>
    </form>
  );
};

export default AddPhoto;
