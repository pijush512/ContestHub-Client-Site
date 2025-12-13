import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const AddContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userEmail = user?.email;
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    prize: "",
    type: "",
    description: "",
    task: "",
  });

  const [deadline, setDeadline] = useState(new Date());

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, image, price, prize, type, description, task } = formData;
    if (!name || !image || !price || !prize || !type || !description || !task) {
      Swal.fire("Error", "Please fill all fields!", "error");
      return;
    }
    const contestData = { ...formData,
        creatorEmail: userEmail,
        status: "pending",
       deadline: deadline.toISOString()
       };

    try {
      const res = await axiosSecure.post("/contest", contestData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire("Success", "Contest added successfully!", "success");
        setFormData({ name: "", image: "", price: "", prize: "", type: "", description: "", task: "" });
        setDeadline(new Date());
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add contest", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Add New Contest
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Contest Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Contest Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter contest name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Image URL</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Contest banner image URL"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price & Prize */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Entry Fee</label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Prize Money</label>
            <input
              name="prize"
              value={formData.prize}
              onChange={handleChange}
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Contest Type */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Contest Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="image-design">Image Design</option>
            <option value="article-writing">Article Writing</option>
            <option value="business-idea">Business Idea</option>
            <option value="gaming-review">Gaming Review</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write contest description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-28"
          />
        </div>

        {/* Task Instructions */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Task Instructions</label>
          <textarea
            name="task"
            value={formData.task}
            onChange={handleChange}
            placeholder="What participants should do"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-28"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          Add Contest
        </button>
      </form>
    </div>
  );
};

export default AddContest;
