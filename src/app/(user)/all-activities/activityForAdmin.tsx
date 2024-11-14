"use client";

import { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";

// Define the Activity type
type Activity = {
  _id: string;
  userId: string;
  activityType: string;
  activityDetails: string;
  role: string;
  isMarkDelete: boolean;
  timestamp: string;
};

type Props = {
  userId: string | null;  // User ID to fetch logs
};

const getActivities = async (user_id: string | null, currentPage: number, limit: number) => {
  try {
    const headers: any = {};
    if (user_id) {
      headers["x-user-id"] = user_id;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/get-all-logs?page=${currentPage}&limit=${limit}`, 
      {
        method: "GET",
        headers,
        credentials: "include", // Include credentials (cookies) with the request
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }

    const { data } = await response.json();
    return data;
  } catch (err: any) {
    console.log("Error while fetching user's activity", err);
    return null;
  }
};

export default function ActivityTableForAdmin({ userId }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);  // New state for total count
  const itemsPerPage = 10;
  const [currentActivities, setCurrentActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch activities on component mount or when userId, currentPage, or itemsPerPage changes
  useEffect(() => {
    const fetchActivities = async () => {
      if (userId) {
        setLoading(true);
        setError(null); // Reset error before fetching
        const fetchedActivities = await getActivities(userId, currentPage, itemsPerPage);
        if (fetchedActivities) {
          setCurrentActivities(fetchedActivities?.logs);
          setTotalItems(fetchedActivities?.totalCount); // Set total count from response
        } else {
          setError("Failed to load activities.");
        }
        setLoading(false);
      }
    };

    fetchActivities();
  }, [userId, currentPage]);  // Re-fetch when userId or currentPage changes

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-3 px-4 py-2 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl text-slate-700 font-semibold mb-4 text-center">User Activity Logs</h1>

      {/* Activity Logs Table */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-3 text-left font-medium">Activity Type</th>
              <th className="px-6 py-3 text-left font-medium">Details</th>
              <th className="px-6 py-3 text-left font-medium">Timestamp</th>
              <th className="px-6 py-3 text-left font-medium">User ID</th>
              <th className="px-6 py-3 text-left font-medium">Role</th>
              <th className="px-6 py-3 text-left font-medium">Is Marked for Deletion</th>
            </tr>
          </thead>
          <tbody>
            {currentActivities.map((activity) => (
              <tr key={activity._id.toString()} className="border-b hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4 text-left">{activity.activityType}</td>
                <td className="px-6 py-4 text-left">{activity.activityDetails}</td>
                <td className="px-6 py-4 text-left">{new Date(activity.timestamp).toLocaleString()}</td>
                <td className="px-6 py-4 text-left">{activity.userId}</td>
                <td className="px-6 py-4 text-left">{activity.role}</td>
                <td className="px-6 py-4 text-left">{activity.isMarkDelete ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        entryCount={totalItems}  // Pass the total count to Pagination
        onPageChange={handlePageChange}
      />
    </div>
  );
}
