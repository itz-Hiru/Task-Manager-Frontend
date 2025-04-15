import { API_PATHS } from "./apiPath.util";
import axiosInstance from "./axiosInstance.util";

const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error while uploading profile picture", e);
    throw e;
  }
};

export default uploadImage;
