import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { getCurrentLocation } from "../services/locationService";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import { checkIn } from "../services/checkInService";
import PageHeader from "../components/PageHeader";
import AppLayout from "../layouts/AppLayout";




const HomePage = () => {
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
  const { user } = useAuth();

const handleCheckIn = async () => {
  try {
    setLoading(true);

    // Step 1: Get location
    const location = await getCurrentLocation();

    // Step 2: Call API
    await checkIn({
      placeName: location.placeName,
      lat: location.latitude,
      lng: location.longitude,
    });

    // Step 3: Navigate
    navigate("/nearby");
  } catch (error: any) {
    console.error(error);

    alert(
      error.response?.data?.message ??
        "Unable to check in."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <AppLayout>
      {/* Header */}
     <PageHeader
  title="Welcome 👋"
  subtitle={user?.username}
  rightAction={
    <button
      onClick={() => navigate("/profile")}
      className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 hover:bg-slate-200"
    >
      <span className="text-2xl">
        {user?.avatarEmoji}
      </span>
    </button>
  }
/>

      {/* Main */}
      <main className="flex flex-col items-center justify-center px-6 py-16">
        <div className="mb-10 text-center">
          <div className="mb-6 text-7xl">📍</div>

          <h1 className="text-3xl font-bold">
            Ready to Check In?
          </h1>

          <p className="mt-3 text-gray-500">
            Discover people around your current location.
          </p>
        </div>

        <div className="w-full max-w-sm">
          <CustomButton
          className="py-4 text-lg"
  loading={loading}
  onClick={handleCheckIn}

>
  Check In
</CustomButton>
        </div>
      </main>
    </AppLayout>
  );
};

export default HomePage;