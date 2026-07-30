import type { UserLocation } from "../types/checkin";

const getCoordinates = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  });
};

const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch location.");
  }

  const data = await response.json();

  return (
    data.address?.suburb ||
    data.address?.city ||
    data.address?.town ||
    data.address?.village ||
    data.display_name ||
    "Unknown Location"
  );
};

export const getCurrentLocation =
  async (): Promise<UserLocation> => {
    const position = await getCoordinates();

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const placeName = await reverseGeocode(
      latitude,
      longitude
    );

    return {
      latitude,
      longitude,
      placeName,
    };
  };