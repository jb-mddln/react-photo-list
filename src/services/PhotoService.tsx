import axios from "axios";
import { Photo } from "../models/Photo";

export const getPhotos = () => {
  return axios.get<Photo[]>(`${import.meta.env.VITE_API_BASE_URL}/photos`);
};

export const getPhoto = (photoId: number) => {
  return axios.get<Photo>(
    `${import.meta.env.VITE_API_BASE_URL}/photos/${photoId}`
  );
};

export const deletePhoto = (photoId: number) => {
  return axios.delete(`${import.meta.env.VITE_API_BASE_URL}/photos/${photoId}`);
};

export const addPhoto = (photo: Photo) => {
  return axios.post(import.meta.env.VITE_API_BASE_URL, photo);
};
