import api from "../api/axios";
import type { NearbyUsersResponse } from "../types/nearby";

const getNearbyUsers = async (): Promise<NearbyUsersResponse> => {
  const response = await api.get("/checkins/nearby");

  return response.data;
};

export const nearbyService = {
  getNearbyUsers,
};