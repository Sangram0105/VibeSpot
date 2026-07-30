import { useNavigate } from "react-router-dom";

import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/PageHeader";
import AppLayout from "../layouts/AppLayout";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    logout();

    navigate("/login", { replace: true });
  };

  return (
     <AppLayout>
      {/* Header */}
      <PageHeader
       title="Profile"
       showBackButton
      />

      <main className="mx-auto max-w-xl p-6">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          {/* Avatar */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-100 text-6xl">
              {user?.avatarEmoji}
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-5">
            <div>
              <p className="mb-1 text-sm text-gray-500">
                Username
              </p>

              <div className="rounded-xl border bg-slate-50 px-4 py-3">
                {user?.username}
              </div>
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500">
                Email
              </p>

              <div className="rounded-xl border bg-slate-50 px-4 py-3">
                {user?.email}
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-10">
            <CustomButton
  variant="danger"
  className="py-4"
  onClick={handleLogout}
>
  Logout
</CustomButton>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default ProfilePage;