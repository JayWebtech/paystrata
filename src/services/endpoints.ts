import axiosInstance from "./config";
import { AxiosResponse } from "axios";
import { ApiResponse, DataPlan } from "@/types/api";

export const GetDataPlans = async (code: string): Promise<ApiResponse<DataPlan[]>> => {
  try {
    const response = await axiosInstance.get(`/billers/${code}/items`);
    return {
      status: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error sending request:", error);
    throw error;
  }
};