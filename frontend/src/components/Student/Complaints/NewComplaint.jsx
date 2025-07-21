import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaFileAlt, FaTag, FaEdit, FaImage, FaPaperPlane, FaArrowLeft, FaSpinner, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import axiosInstance from '../../../api/axiosInstance';

const NewComplaint = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [complaint, setComplaint] = useState({
    title: '',
    category: '',
    description: '',
    image: null,
  });

  // Redirect if not logged in
  useEffect(() => {
    if (user === null) {
      navigate('/loginform');
    } else {
      setIsCheckingAuth(false);
    }
  }, [user, navigate]);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if user is not logged in
  if (!user) {
    return null;
  }

  // Minimum word count for description
  const MIN_WORDS = 10;

  const validateForm = () => {
    const newErrors = {};
    
    // Title validation
    if (!complaint.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (complaint.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    // Category validation
    if (!complaint.category) {
      newErrors.category = 'Please select a category';
    }

    // Description validation
    if (!complaint.description.trim()) {
      newErrors.description = 'Description is required';
    } else {
      const wordCount = complaint.description.trim().split(/\s+/).filter(word => word.length > 0).length;
      if (wordCount < MIN_WORDS) {
        newErrors.description = `Description must have at least ${MIN_WORDS} words (currently ${wordCount})`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size must be less than 10MB');
        return;
      }
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      setComplaint(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      // Send JSON data (backend doesn't support file uploads yet)
      const complaintData = {
        title: complaint.title,
        category: complaint.category,
        description: complaint.description
      };

      const res = await axiosInstance.post("/complaints", complaintData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Complaint submitted:", res.data);
      setSuccess(true);
      
      // Show success message and redirect after 2 seconds
      setTimeout(() => {
        navigate("/studentdashboard");
      }, 2000);
      
    } catch (err) {
      console.error("Error submitting complaint:", err);
      console.error("Error response:", err?.response);
      console.error("Error data:", err?.response?.data);
      
      let errorMessage = "Failed to submit complaint. Please try again.";
      
      if (err?.response?.status === 401) {
        errorMessage = "Please login again to submit a complaint.";
      } else if (err?.response?.status === 500) {
        errorMessage = "Server error. Please try again later or contact support.";
      } else if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.response?.data) {
        errorMessage = err.response.data;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Calculate word count for description
  const getWordCount = () => {
    return complaint.description.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const wordCount = getWordCount();
  const isWordCountValid = wordCount >= MIN_WORDS;
  const isFormValid = complaint.title.trim() && complaint.category && isWordCountValid && !loading;

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

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <div>
                <h3 className="text-green-800 font-semibold">Complaint Submitted Successfully!</h3>
                <p className="text-green-600 text-sm">Redirecting to dashboard...</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaFileAlt className="text-indigo-600" />
                Complaint Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={complaint.title}
                onChange={handleChange}
                required
                placeholder="Enter a clear and concise title for your complaint"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
                  errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                  <FaExclamationTriangle className="text-red-500" />
                  <span>{errors.title}</span>
                </div>
              )}
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaTag className="text-indigo-600" />
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={complaint.category}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white ${
                  errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Select Category --</option>
                <option value="Hostel">🏠 Hostel</option>
                <option value="Academic">📚 Academic</option>
                <option value="Administration">🏢 Administration</option>
                <option value="Other">📋 Other</option>
              </select>
              {errors.category && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                  <FaExclamationTriangle className="text-red-500" />
                  <span>{errors.category}</span>
                </div>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaEdit className="text-indigo-600" />
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={complaint.description}
                onChange={handleChange}
                required
                placeholder="Provide detailed information about your complaint. Include relevant dates, locations, and any supporting details."
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none ${
                  errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                rows="6"
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {errors.description && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <FaExclamationTriangle className="text-red-500" />
                      <span>{errors.description}</span>
                    </div>
                  )}
                </div>
                <div className={`text-sm ${isWordCountValid ? 'text-green-600' : 'text-red-600'}`}>
                  {wordCount}/{MIN_WORDS} words
                </div>
              </div>
            </div>

            {/* Image Upload Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaImage className="text-indigo-600" />
                Attach Image (Coming Soon)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 opacity-60">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  disabled
                />
                <label htmlFor="image-upload" className="cursor-not-allowed">
                  <FaImage className="text-3xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-1">Image upload coming soon!</p>
                  <p className="text-sm text-gray-400">This feature will be available in the next update</p>
                </label>
              </div>
              {complaint.image && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-blue-700">
                      ✓ {complaint.image.name} selected (will be available soon)
                    </p>
                    <button
                      type="button"
                      onClick={() => setComplaint(prev => ({ ...prev, image: null }))}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
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
                disabled={loading || !isFormValid}
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

