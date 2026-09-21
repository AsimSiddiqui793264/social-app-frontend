import axios from "axios";

const API =
  "https://helpful-inspiration-production-1b39.up.railway.app/api/v1/users";

// Login
export const loginUser = async (credentials) => {
  const response = await axios.post(
    `${API}/login`,
    credentials,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// Register
export const registerUser = async (formData) => {
  const response = await axios.post(
    `${API}/register`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
