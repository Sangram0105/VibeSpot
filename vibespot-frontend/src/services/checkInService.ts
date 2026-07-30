import api from "../api/axios";
import type {
  CheckInRequest,
  CheckInResponse,
} from "../types/checkin";

export const checkIn = async (
  data: CheckInRequest
): Promise<CheckInResponse> => {
  const response = await api.post(
    "/checkins/checkin",
    data
  );

  return response.data;
};

const checkOut = async (): Promise<CheckInResponse> => {
  const response = await api.post(
    "/checkins/checkout"
  );

  return response.data;
};

export const checkInService = {
  checkIn,
  checkOut,
};