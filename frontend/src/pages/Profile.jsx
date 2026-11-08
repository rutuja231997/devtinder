import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditProfile from "../components/EditProfile";
import ProfileCard from "../components/ProfileCard";
import ProfileAnalytics from "../components/Profile/ProfileAnalytics";
import RecentVisitors from "../components/Profile/RecentVisitors";

import { fetchProfileViews } from "../utils/profileviewSlice";

export default function ProfilePage() {
  const user = useSelector((store) => store.user);

  const { profileVisitors, profileTotalViews, profileStatus, profileError } =
    useSelector((store) => store.profileviews);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profileStatus === "idle" && user.data?._id) {
      dispatch(fetchProfileViews());
    }
  }, [dispatch, profileStatus, user.data?._id]);

  const handleSave = () => {
    setOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#0A0F1F] px-4 py-10 sm:px-6 sm:py-14  flex justify-center items-start w-full overflow-y-scroll">
      <div className="mx-auto w-full max-w-2xl mb-12 gap-12">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-[#F8FAFC] sm:text-3xl">
            Profile
          </h1>
          <p className="mt-1.5 text-sm text-[#94A3B8]">
            Manage your developer profile and how other developers see you.
          </p>
        </header>

        <ProfileCard user={user.data} onEdit={() => setOpen(true)} />

        {/* profile analytics */}
        <ProfileAnalytics
          totalViews={profileTotalViews}
          status={profileStatus}
        />

        {/* recent visitors */}
        <RecentVisitors
          visitors={profileVisitors}
          status={profileStatus}
          error={profileError}
        />
      </div>

      <EditProfile
        open={open}
        user={user.data}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </main>
  );
}
