import axios from "axios";

const getAxiosConfig = {
  // base configs for axios requests
  baseURL: "http://127.0.0.1:8000/api",
};

export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const data = await axios.post(`${getAxiosConfig.baseURL}/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.response?.data?.message || "Upload failed" };
  }
};
