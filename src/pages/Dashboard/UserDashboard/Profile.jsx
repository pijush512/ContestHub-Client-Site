// src/pages/Dashboard/User/Profile.jsx
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

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset, watch } = useForm();
  const photoURL = watch("photoURL"); // Real-time photo preview

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || user?.displayName || "",
        photoURL: profile.photoURL || user?.photoURL || "",
        bio: profile.bio || "",
      });
    }
  }, [profile, user, reset]);

  // const onSubmit = async (data) => {
  //   const updatedData = {
  //     name: data.name.trim(),
  //     photoURL: data.photoURL.trim() || null,
  //     bio: data.bio.trim(),
  //   };

  //   try {
  //     await axiosSecure.patch(`/users/${user?.email}`, updatedData);
  //     toast.success("Profile updated successfully!");
  //     queryClient.invalidateQueries(["profile", user?.email]);
  //   } catch (err) {
  //     toast.error("Failed to update profile");
  //     console.error(err);
  //   }
  // };



  const onSubmit = async (data) => {
    try {
      const updatedData = {
        name: data.name.trim() || user?.displayName,
        photoURL: data.photoURL.trim() || user?.photoURL || "",
        bio: data.bio.trim() || "",
      };

      const res = await axiosSecure.patch(`/users/${user?.email}`, updatedData);

      if (res.data.success) {
        toast.success("Profile updated successfully!");
        queryClient.invalidateQueries(["profile", user?.email]);
      } else {
        toast.error("Profile update failed or no changes made");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Failed to update profile. Try again!");
    }
  };


  // Mock stats - replace with real data from backend if available
  const totalParticipated = profile.participated || 24;
  const totalWon = profile.won || 18;
  const winPercentage = totalParticipated > 0 ? (totalWon / totalParticipated) * 100 : 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and stats</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Avatar + Stats */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              {/* Avatar */}
              <div className="avatar mb-6">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 mx-auto">
                  <img
                    src={photoURL || user?.photoURL || "https://i.ibb.co.com/0j9vL0M/user-avatar.png"}
                    alt="Profile"
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800">{profile.name || user?.displayName}</h2>
              <p className="text-gray-500">{user?.email}</p>

              {/* Win Percentage Chart */}
              <div className="mt-8">
                <div className="text-center">
                  <div className="radial-progress text-primary" style={{ "--value": winPercentage, "--size": "10rem", "--thickness": "12px" }} role="progressbar">
                    <span className="text-2xl font-bold">{Math.round(winPercentage)}%</span>
                  </div>
                  <h3 className="text-lg font-semibold mt-4">Win Rate</h3>
                  <p className="text-sm text-gray-600">
                    {totalWon} Won / {totalParticipated} Participated
                  </p>
                </div>
              </div>

              {/* Extra Stats */}
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
                {/* Name */}
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

                {/* Photo URL */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Photo URL</span>
                  </label>
                  <input
                    {...register("photoURL")}
                    type="text"
                    className="input input-bordered input-primary w-full"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Paste a direct image link (Imgur, Postimages, etc.)</p>
                </div>

                {/* Bio */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Bio</span>
                  </label>
                  <textarea
                    {...register("bio")}
                    rows={5}
                    className="textarea textarea-bordered textarea-primary w-full"
                    placeholder="Tell us something about yourself... (e.g., your skills, interests, favorite contest type)"
                  />
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <button type="submit" className="btn btn-primary btn-lg w-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
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


