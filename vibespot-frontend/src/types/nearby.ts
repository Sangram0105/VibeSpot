export interface NearbyUser {
  id: string;
  place_name: string;

  users: {
    id: string;
    username: string;
    avatar_emoji: string;
  };
}

export interface NearbyUsersResponse {
  success: boolean;
  message: string;
  users: NearbyUser[];
}