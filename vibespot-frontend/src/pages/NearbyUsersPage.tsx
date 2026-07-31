import { useCallback, useEffect, useState } from "react";

import CustomButton from "../components/CustomButton";
import LoadingSpinner from "../components/LoadingSpinner";
import NearbyUserCard from "../components/NearbyUserCard";

import { nearbyService } from "../services/nearbyService";
import type { NearbyUser } from "../types/nearby";
import PageHeader from "../components/PageHeader";
import { checkInService } from "../services/checkInService";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const NearbyUsersPage = () => {
  const [users, setUsers] = useState<NearbyUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


    const handleCheckOut = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to check out?"
  );

  if (!confirmed) {
    return;
  }

  try {
    setCheckingOut(true);

    await checkInService.checkOut();

    navigate("/");
  } catch (error: any) {
    alert(
      error.response?.data?.message ??
      "Unable to check out."
    );
  } finally {
    setCheckingOut(false);
  }
};


const navigate = useNavigate();

const [checkingOut, setCheckingOut] =
  useState(false);



  const loadNearbyUsers = useCallback(async () => {
    try {
      const response = await nearbyService.getNearbyUsers();
      setUsers(response.users);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      await loadNearbyUsers();

      setLoading(false);
    };

    fetchUsers();
  }, [loadNearbyUsers]);

  const handleRefresh = async () => {
    setRefreshing(true);

    await loadNearbyUsers();

    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
     <AppLayout>
        <PageHeader
  title="Nearby Users"
  rightAction={
    <CustomButton
      fullWidth={false}
      loading={refreshing}
      onClick={handleRefresh}
    >
      Refresh
    </CustomButton>
  }
/>
      

      {users.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="text-6xl">📍</div>

          <h2 className="mt-4 text-xl font-semibold">
            Nobody is nearby
          </h2>

          <p className="mt-2 text-gray-500">
            Try refreshing after a few moments.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((item) => (
  <NearbyUserCard
    key={item.id}
    avatar={item.users.avatar_emoji}
    username={item.users.username}
    placeName={item.place_name}
    onHeart={() => console.log("❤️", item.users.id)}
    onFire={() => console.log("🔥", item.users.id)}
    onWave={() => console.log("👋", item.users.id)}
  />
))}
        </div>
      )}

        <div className="mx-auto max-w-2xl">
    <CustomButton
      variant="danger"
      loading={checkingOut}
      onClick={handleCheckOut}
    >
      Check Out
    </CustomButton>
  </div>
    </AppLayout>
  );
};

export default NearbyUsersPage;