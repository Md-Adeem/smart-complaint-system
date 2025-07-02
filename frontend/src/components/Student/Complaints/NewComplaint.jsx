import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewComplaint = () => {
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState({
    title: '',
    category: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const handleImageChange = (e) => {
    setComplaint({ ...complaint, image: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:8000/complaints", {
      title: complaint.title,
      category: complaint.category,
      description: complaint.description
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("Complaint submitted:", res.data);
    navigate("/student/dashboard");
  } catch (err) {
    console.error("Error submitting complaint:", err?.response?.data || err.message);
    alert("Failed to submit complaint.");
  }
};




  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Submit a New Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={complaint.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={complaint.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Category --</option>
            <option value="Hostel">Hostel</option>
            <option value="Mess">Mess</option>
            <option value="Academic">Academic</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={complaint.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Attach Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Complaint
          </button>
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => navigate('/student/dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewComplaint;

