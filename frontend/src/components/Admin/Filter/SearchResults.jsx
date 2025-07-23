import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { FaSearch } from "react-icons/fa";
import {
  truncateTitle,
  truncateDescription,
  formatDate,
  getStatusColor,
} from "../../../utils/textUtils";

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.get("/complaints");

      if (res.data.success) {
        const search = query.trim().toLowerCase();

        // 🔍 Dynamic Filtering by multiple fields
        const filtered = res.data.complaints.filter((complaint) => {
          const title = complaint.title?.toLowerCase() || "";
          const description = complaint.description?.toLowerCase() || "";
          const status = complaint.status?.toLowerCase() || "";
          const user =
            complaint.user?.toLowerCase() ||
            complaint.username?.toLowerCase() ||
            "";

          return (
            title.includes(search) ||
            description.includes(search) ||
            status.includes(search) ||
            user.includes(search)
          );
        });

        if (filtered.length === 0) {
          setError("No complaints found.");
          setResults([]);
        } else {
          setResults(filtered);
        }
      } else {
        setError("Failed to fetch complaints.");
        setResults([]);
      }
    } catch (err) {
      console.log(err);
      setError("Error searching complaints.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🔍 Search Complaints
      </h1>

      <div className="mb-6">
        <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search by title, description, status, or user..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
            <FaSearch />
          {loading ? "Searching..." : "Search"}
        </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {!error && results.length > 0 && (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">
            Found {results.length} complaint(s)
          </p>
        <ul className="space-y-4">
          {results.map((comp) => (
            <li
              key={comp._id}
                className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer border border-gray-100"
              title={`Complaint: ${comp.title}`}
            >
                <div className="flex justify-between items-start mb-3">
                  <h2
                    className="text-xl font-semibold text-gray-800 flex-1 mr-4"
                    title={comp.title}
                  >
                    {truncateTitle(comp.title, 60)}
                  </h2>
                <span
                    className={`capitalize inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      comp.status
                    )}`}
                >
                  {comp.status}
                </span>
              </div>
                <p
                  className="text-gray-600 mb-3 line-clamp-2"
                  title={comp.description}
                >
                  {truncateDescription(comp.description, 150)}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    By:{" "}
                    <span className="font-medium">
                      {comp.user || comp.username || "Unknown"}
                    </span>
                  </span>
                  <span>{formatDate(comp.createdAt)}</span>
                </div>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
