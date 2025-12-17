import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AddContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [deadline, setDeadline] = useState(new Date());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!deadline) {
      Swal.fire("Error", "Please select a deadline", "error");
      return;
    }

    const contestData = {
      name: data.name,
      image: data.image,
      price: Number(data.price),
      prize: Number(data.prize),
      type: data.type,
      description: data.description,
      task: data.task,
      deadline: deadline.toISOString(),
      creatorEmail: user?.email,
      status: "pending",
      participantsCount: 0,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/contest", contestData);

      if (res.data.insertedId || res.status === 201) {
        Swal.fire("Success", "Contest added successfully!", "success");
        reset();
        setDeadline(new Date());
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add contest", "error");
      console(error)
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8">
        Add New Contest
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Contest Name */}
        <div>
          <label className="block mb-1 font-medium">Contest Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full p-3 border rounded"
            placeholder="Enter contest name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Contest name is required</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            {...register("image", { required: true })}
            className="w-full p-3 border rounded"
            placeholder="Contest image URL"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">Image URL is required</p>
          )}
        </div>

        {/* Price & Prize */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Entry Fee</label>
            <input
              type="number"
              {...register("price", { required: true, min: 1 })}
              className="w-full p-3 border rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">Valid entry fee required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Prize Money</label>
            <input
              type="number"
              {...register("prize", { required: true, min: 1 })}
              className="w-full p-3 border rounded"
            />
            {errors.prize && (
              <p className="text-red-500 text-sm">Valid prize amount required</p>
            )}
          </div>
        </div>

        {/* Contest Type */}
        <div>
          <label className="block mb-1 font-medium">Contest Type</label>
          <select
            {...register("type", { required: true })}
            className="w-full p-3 border rounded"
          >
            <option value="">Select Type</option>
            <option value="image-design">Image Design</option>
            <option value="article-writing">Article Writing</option>
            <option value="business-idea">Business Idea</option>
            <option value="gaming-review">Gaming Review</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">Contest type is required</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full p-3 border rounded h-28"
            placeholder="Contest description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Task Instructions */}
        <div>
          <label className="block mb-1 font-medium">Task Instructions</label>
          <textarea
            {...register("task", { required: true })}
            className="w-full p-3 border rounded h-28"
            placeholder="Task instructions"
          />
          {errors.task && (
            <p className="text-red-500 text-sm">Task instructions required</p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="block mb-1 font-medium">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            minDate={new Date()}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
        >
          Add Contest
        </button>
      </form>
    </div>
  );
};

export default AddContest;
