import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  /* ------------------------------------
      1) USER PROFILE QUERY
  -------------------------------------*/
  const { data: profile = {}, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  /* ------------------------------------
      2) PARTICIPATED CONTESTS QUERY
  -------------------------------------*/
  const { data: participated = [], isLoading: isParticipatedLoading } = useQuery({
    queryKey: ["participated", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/participated/${user.email}`);
      return res.data;
    },
  });

  /* ------------------------------------
      3) WON CONTESTS QUERY
  -------------------------------------*/
  const { data: won = [], isLoading: isWonLoading } = useQuery({
    queryKey: ["won", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/won/${user.email}`);
      return res.data;
    },
  });

  // REAL-TIME STATS CALCULATION
  const totalParticipated = participated.length;
  const totalWon = won.length;
  const winPercentage = totalParticipated > 0 ? Math.round((totalWon / totalParticipated) * 100) : 0;

  const { register, handleSubmit, reset, watch } = useForm();
  const photoURL = watch("photoURL"); 

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || user?.displayName || "",
        photoURL: profile.photoURL || user?.photoURL || "",
        bio: profile.bio || "",
      });
    }
  }, [profile, user, reset]);

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        name: data.name.trim() || user?.displayName,
        photoURL: data.photoURL.trim() || user?.photoURL || "",
        bio: data.bio.trim() || "",
      };

      const res = await axiosSecure.patch(`/users/${user?.email}`, updatedData);

      // Backend response check (Object success or status 200)
      if (res.data.success || res.status === 200) {
        toast.success("Profile updated successfully!");
        queryClient.invalidateQueries(["profile", user?.email]);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Failed to update profile. Try again!");
    }
  };

  if (isProfileLoading || isParticipatedLoading || isWonLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and stats</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Avatar + Stats */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="avatar mb-6">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 mx-auto">
                  <img
                    src={photoURL || profile.photoURL || user?.photoURL || "https://i.ibb.co.com/0j9vL0M/user-avatar.png"}
                    alt="Profile"
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800">{profile.name || user?.displayName}</h2>
              <p className="text-gray-500 mb-4">{user?.email}</p>
              
              {profile.bio && <p className="text-sm italic text-gray-600 mb-6">"{profile.bio}"</p>}

              {/* Dynamic Win Rate Chart */}
              <div className="mt-8">
                <div className="text-center">
                  <div className="radial-progress text-primary" 
                       style={{ "--value": winPercentage, "--size": "10rem", "--thickness": "12px" }} 
                       role="progressbar">
                    <span className="text-2xl font-bold">{winPercentage}%</span>
                  </div>
                  <h3 className="text-lg font-semibold mt-4">Win Rate</h3>
                  <p className="text-sm text-gray-600">
                    {totalWon} Won / {totalParticipated} Participated
                  </p>
                </div>
              </div>

              {/* Dynamic Stats Cards */}
              <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-blue-600">{totalWon}</p>
                  <p className="text-xs text-gray-600">Contests Won</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-green-600">{totalParticipated}</p>
                  <p className="text-xs text-gray-600">Participated</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Edit Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile Information</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Full Name</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="input input-bordered input-primary w-full"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Photo URL</span>
                  </label>
                  <input
                    {...register("photoURL")}
                    type="text"
                    className="input input-bordered input-primary w-full"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Bio</span>
                  </label>
                  <textarea
                    {...register("bio")}
                    rows={4}
                    className="textarea textarea-bordered textarea-primary w-full"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" 
                  className="btn btn-lg w-full shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;