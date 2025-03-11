import axiosInstance from "./config";

export const GetDataPlans = async (code) => {
    try {
      const response = await axiosInstance.get(`/billers/${code}/items`);
      return response;
    } catch (error) {
      console.error("Error sending request:", error);
      throw error;
    }
  };