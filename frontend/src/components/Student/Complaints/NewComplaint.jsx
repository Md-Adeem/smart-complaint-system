import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaTag, FaEdit, FaImage, FaPaperPlane, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import axiosInstance from '../../../api/axiosInstance';

const NewComplaint = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const res = await axiosInstance.post("/complaints", {
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
      navigate("/studentdashboard");
    } catch (err) {
      console.error("Error submitting complaint:", err?.response?.data || err.message);
      alert("Failed to submit complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/studentdashboard')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FaEdit className="text-indigo-600" />
                Submit New Complaint
              </h1>
              <p className="text-gray-600 mt-1">Report an issue or concern to the administration</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaFileAlt className="text-indigo-600" />
                Complaint Title
              </label>
              <input
                type="text"
                name="title"
                value={complaint.title}
                onChange={handleChange}
                required
                placeholder="Enter a clear and concise title for your complaint"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaTag className="text-indigo-600" />
                Category
              </label>
              <select
                name="category"
                value={complaint.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white"
              >
                <option value="">-- Select Category --</option>
                <option value="Hostel">🏠 Hostel</option>
                <option value="Mess">🍽️ Mess</option>
                <option value="Academic">📚 Academic</option>
                <option value="Other">📋 Other</option>
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaEdit className="text-indigo-600" />
                Description
              </label>
              <textarea
                name="description"
                value={complaint.description}
                onChange={handleChange}
                required
                placeholder="Provide detailed information about your complaint. Include relevant dates, locations, and any supporting details."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                rows="6"
              />
            </div>

            {/* Image Upload Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaImage className="text-indigo-600" />
                Attach Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors duration-200">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <FaImage className="text-3xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-1">Click to upload an image</p>
                  <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>
              {complaint.image && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    ✓ {complaint.image.name} selected
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/studentdashboard')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Submit Complaint
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewComplaint;

