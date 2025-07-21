// Text truncation utilities for complaint display
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const truncateTitle = (title, maxLength = 50) => {
  if (!title) return "";
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength) + "...";
};

export const truncateDescription = (description, maxLength = 120) => {
  if (!description) return "";
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + "...";
};

// Get word count for description
export const getWordCount = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get status color classes
export const getStatusColor = (status) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "in progress": "bg-blue-100 text-blue-800 border-blue-200",
    resolved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    success: "bg-emerald-100 text-emerald-800 border-emerald-200"
  };
  
  return statusColors[status?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
}; 