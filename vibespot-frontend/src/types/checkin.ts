export interface UserLocation {
  latitude: number;
  longitude: number;
  placeName: string;
}

export interface CheckInRequest {
  placeName: string;
  lat: number;
  lng: number;
}

export interface CheckInResponse {
  success: boolean;
  message: string;
}