"use client";

import { useRouter } from "next/navigation";

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
  activities: Activity[];
};

export default function ActivityTable({ activities }: Props) {
    const router =useRouter();
  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/delete-log/${id}`, {
        method: "DELETE",
        credentials : "include"
      });
      if (!response.ok) {
        throw new Error("Failed to delete activity");
      }
      router.refresh()
    } catch (error: any) {
      console.log(error)
    }
  };

  return (
    <div className="mt-3 px-4 py-2 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl text-slate-700 font-semibold mb-4 text-center">
        User Activity Logs
      </h1>

      {/* Activity Logs Table */}
      <table className="min-w-full table-auto border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-6 py-3 text-left font-medium">Activity Type</th>
            <th className="px-6 py-3 text-left font-medium">Details</th>
            <th className="px-6 py-3 text-left font-medium">Timestamp</th>
            <th className="px-6 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities?.map((activity) => (
            <tr
              key={activity._id.toString()}
              className="border-b hover:bg-gray-50 transition duration-200"
            >
              <td className="px-6 py-4 text-left">{activity.activityType}</td>
              <td className="px-6 py-4 text-left">{activity.activityDetails}</td>
              <td className="px-6 py-4 text-left">
                {new Date(activity.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-left">
                <button
                  onClick={() => handleDeleteActivity(activity._id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
