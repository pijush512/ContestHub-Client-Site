import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    axios
      .get(`https://contesthub-server-site.vercel.app/contest/${id}`)
      .then((res) => {
        const contest = res.data;
        setValue("name", contest.name);
        setValue("description", contest.description);
        setValue("entryFee", contest.entryFee);
        setValue("prize", contest.prize);
        setValue("taskInstruction", contest.taskInstruction);
        setValue("type", contest.type);
        setValue("image", contest.image);
      })
      .catch(() => setError("Failed to load contest data"))
      .finally(() => setLoading(false));
  }, [id, setValue]);

  const onSubmit = (data) => {
    axios
      .patch(`https://contesthub-server-site.vercel.app/contest/${id}`, data)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Contest updated successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/creator/my-contests");
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update contest",
        })
      );
  };

  if (loading) return <p className="text-center py-8 text-lg font-medium">Loading contest data...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Edit Contest</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">

        <div className="flex flex-col">
          <label className="font-medium mb-1">Contest Name</label>
          <input
            {...register("name", { required: "Contest name is required" })}
            placeholder="Enter contest name"
            className="input input-bordered"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Enter contest description"
            className="textarea textarea-bordered"
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Entry Fee (USD)</label>
            <input
              {...register("entryFee", { required: "Entry fee is required", min: 0 })}
              type="number"
              placeholder="Entry fee"
              className="input input-bordered"
            />
            {errors.entryFee && <span className="text-red-500 text-sm">{errors.entryFee.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Prize Money (USD)</label>
            <input
              {...register("prize", { required: "Prize money is required", min: 0 })}
              type="number"
              placeholder="Prize money"
              className="input input-bordered"
            />
            {errors.prize && <span className="text-red-500 text-sm">{errors.prize.message}</span>}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Task Instruction</label>
          <textarea
            {...register("taskInstruction", { required: "Task instruction is required" })}
            placeholder="Enter task instructions"
            className="textarea textarea-bordered"
          />
          {errors.taskInstruction && <span className="text-red-500 text-sm">{errors.taskInstruction.message}</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Contest Type</label>
            <select
              {...register("type", { required: "Contest type is required" })}
              className="select select-bordered"
            >
              <option value="">Select type</option>
              <option value="image-design">Image Design</option>
              <option value="article-writing">Article Writing</option>
              <option value="business-idea">Business Ideas</option>
              <option value="gaming-review">Gaming Reviews</option>
            </select>
            {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Image URL</label>
            <input
              {...register("image", { required: "Image URL is required" })}
              placeholder="Enter image URL"
              className="input input-bordered"
            />
            {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Update Contest
        </button>
      </form>
    </div>
  );
};

export default EditContest;
