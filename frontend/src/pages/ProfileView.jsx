import ProfileCard from "../components/ProfileCard";

import { useLocation } from "react-router-dom";

const ProfileView = () => {
  const location = useLocation();

  const user = location.state?.user;

  return (
    <main className="min-h-screen bg-[#0A0F1F] px-4 py-10 sm:px-6 sm:py-14  flex justify-center items-start w-full">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-[#F8FAFC] sm:text-3xl">
            Developer Profile
          </h1>
          <p className="mt-1.5 text-sm text-[#94A3B8]">
            Explore this developer's experience, skills, and professional
            background.
          </p>
        </header>

        <ProfileCard user={user} />
      </div>
    </main>
  );
};

export default ProfileView;
