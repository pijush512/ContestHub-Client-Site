// src/pages/Dashboard/CreatorDashboard/EditContest.jsx
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const EditContest = () => {
  const contest = useLoaderData();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [deadline, setDeadline] = useState(new Date());
  const [isDeadlineChanged, setIsDeadlineChanged] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      image: "",
      type: "Image Design",
      price: 0,
      prize: 0,
      taskInstruction: "",
      description: "",
    },
  });

  // Loading state
  if (!contest || !contest._id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-purple-600"></span>
          <p className="mt-4 text-xl">Loading contest details...</p>
        </div>
      </div>
    );
  }

  // Pre-fill form + track deadline changes
  useEffect(() => {
    if (contest) {
      const originalDate = new Date(contest.deadline);

      // Set form values
      setValue("title", contest.title || "");
      setValue("image", contest.image || "");
      setValue("type", contest.type || "Image Design");
      setValue("price", contest.price || 0);
      setValue("prize", contest.prize || 0);
      setValue("taskInstruction", contest.taskInstruction || "");
      setValue("description", contest.description || "");

      // Set deadline
      setDeadline(originalDate);
      setIsDeadlineChanged(false);

      // Mark form as pristine
      reset({
        title: contest.title || "",
        image: contest.image || "",
        type: contest.type || "Image Design",
        price: contest.price || 0,
        prize: contest.prize || 0,
        taskInstruction: contest.taskInstruction || "",
        description: contest.description || "",
      });
    }
  }, [contest, setValue, reset]);

  // Track if deadline is changed
  useEffect(() => {
    if (contest?.deadline) {
      const originalTime = new Date(contest.deadline).getTime();
      const currentTime = deadline.getTime();
      setIsDeadlineChanged(originalTime !== currentTime);
    }
  }, [deadline, contest?.deadline]);

  const onSubmit = async (data) => {
    const updatedContest = {
      title: data.title.trim(),
      image: data.image.trim(),
      type: data.type,
      price: Number(data.price),
      prize: Number(data.prize),
      taskInstruction: data.taskInstruction.trim(),
      description: data.description.trim(),
      deadline: deadline.toISOString(),
    };

    try {
      const res = await axiosSecure.patch(`/contest/${contest._id}`, updatedContest);

      if (res.data.modifiedCount > 0) {
        toast.success("Contest updated successfully!");

        // Reset form with new values
        reset({
          title: updatedContest.title,
          image: updatedContest.image,
          type: updatedContest.type,
          price: updatedContest.price,
          prize: updatedContest.prize,
          taskInstruction: updatedContest.taskInstruction,
          description: updatedContest.description,
        });

        setIsDeadlineChanged(false);
        setDeadline(new Date(updatedContest.deadline));

        navigate("/dashboard/creator/my-contests");
      } else {
        toast.error("No changes were made!");
      }
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update contest!");
    }
  };

  // Button enable condition
  const isFormChanged = isDirty || isDeadlineChanged;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-5xl font-bold text-center mb-10 text-purple-700">
          Edit Contest
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="text-xl font-bold mb-3 block">Contest Title</label>
              <input
                {...register("title", { required: true })}
                className="input input-bordered w-full text-lg h-14"
                placeholder="Enter contest title"
              />
            </div>
            <div>
              <label className="text-xl font-bold mb-3 block">Image URL</label>
              <input
                {...register("image", { required: true })}
                className="input input-bordered w-full text-lg h-14"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <label className="text-xl font-bold mb-3 block">Contest Type</label>
              <select {...register("type")} className="select select-bordered w-full text-lg h-14">
                <option>Image Design</option>
                <option>Article Writing</option>
                <option>Business Idea</option>
                <option>Gaming Review</option>
                <option>Video Editing</option>
              </select>
            </div>
            <div>
              <label className="text-xl font-bold mb-3 block">Entry Fee ($)</label>
              <input
                type="number"
                {...register("price", { min: 0 })}
                className="input input-bordered w-full text-lg h-14"
              />
            </div>
            <div>
              <label className="text-xl font-bold mb-3 block">Prize Money ($)</label>
              <input
                type="number"
                {...register("prize", { min: 1 })}
                className="input input-bordered w-full text-lg h-14"
              />
            </div>
          </div>

          <div>
            <label className="text-xl font-bold mb-3 block">Deadline</label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMM d, yyyy h:mm aa"
              className="input input-bordered w-full text-lg h-14 cursor-pointer"
              placeholderText="Select deadline"
            />
          </div>

          <div>
            <label className="text-xl font-bold mb-3 block">Task Instruction</label>
            <textarea
              {...register("taskInstruction")}
              rows={6}
              className="textarea textarea-bordered w-full text-lg"
              placeholder="Explain what participants need to do..."
            />
          </div>

          <div>
            <label className="text-xl font-bold mb-3 block">Description</label>
            <textarea
              {...register("description")}
              rows={8}
              className="textarea textarea-bordered w-full text-lg"
              placeholder="Give a detailed description of the contest..."
            />
          </div>

          {/* Premium Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-12">
            <button
              type="submit"
              disabled={!isFormChanged}
              className={`group relative overflow-hidden rounded-2xl px-16 py-6 text-2xl font-bold transition-all duration-300 transform 
                ${isFormChanged
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-purple-500/50 hover:scale-105 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Update Contest
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="group relative px-16 py-6 rounded-2xl border-2 border-gray-300 text-xl font-semibold text-gray-700 
                         hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 
                         transition-all duration-300 flex items-center gap-3"
            >
              <svg className="w-7 h-7 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContest;