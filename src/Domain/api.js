import axios from "axios";

const baseURL = "http://localhost:3030";

export const callAPI = async (endpoint, method, data) => {
  try {
    const response = await axios({
      method,
      url: `${baseURL}${endpoint}`,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
