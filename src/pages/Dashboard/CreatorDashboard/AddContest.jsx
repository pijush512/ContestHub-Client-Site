// src/pages/dashboard/creator/AddContest.jsx
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const AddContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [deadline, setDeadline] = useState(new Date());
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const contestData = {
      title: data.title,
      image: data.image,
      type: data.type,
      price: parseFloat(data.price),
      prize: parseFloat(data.prize),
      taskInstruction: data.taskInstruction,
      description: data.description,
      deadline: deadline.toISOString(),
      creatorName: user?.displayName || "Unknown",
      creatorEmail: user?.email,
      creatorPhoto: user?.photoURL,
      participants: 0,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/contest", contestData);
      toast.success("Contest submitted for approval!");
      reset();
      setDeadline(new Date());

      // invalidate queries
      queryClient.invalidateQueries(["my-contests", user?.email]);
      queryClient.invalidateQueries(["contests"]);
      queryClient.invalidateQueries(["popular"]);
    } catch (err) {
      toast.error("Failed to create contest");
      console.log(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-purple-700">Create New Contest</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input {...register("title", { required: true })} className="input input-bordered" placeholder="Contest Title" />
        <input {...register("image", { required: true })} className="input input-bordered" placeholder="Image URL" />
        <select {...register("type", { required: true })} className="select select-bordered">
          <option value="">Select Type</option>
          <option>Image Design</option>
          <option>Article Writing</option>
          <option>Business Idea</option>
          <option>Gaming Review</option>
          <option>Video Editing</option>
        </select>
        <input type="number" {...register("price", { required: true })} className="input input-bordered" placeholder="Entry Fee ($)" />
        <input type="number" {...register("prize", { required: true })} className="input input-bordered" placeholder="Prize Money ($)" />
        <DatePicker selected={deadline} onChange={setDeadline} showTimeSelect dateFormat="Pp" className="input input-bordered w-full" />
        <textarea {...register("taskInstruction", { required: true })} rows="4" className="textarea textarea-bordered md:col-span-2" placeholder="Task Instruction"></textarea>
        <textarea {...register("description", { required: true })} rows="6" className="textarea textarea-bordered md:col-span-2" placeholder="Full Description"></textarea>
        <button type="submit" className="btn btn-lg btn-primary md:col-span-2">
          Submit for Approval
        </button>
      </form>
    </div>
  );
};

export default AddContest;
