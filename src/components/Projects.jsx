import axios from "axios";
import React, { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allProject = async () => {
      try {
        const res = await axios.get(
          "https://taskbackend-5p3o.onrender.com/api/works"
        );
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    allProject();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-b from-orange-100 to-orange-300 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Project List</h2>
          <p className="text-gray-500 text-sm">
            All current work files with incharge details.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-7 w-7 border-t-4 border-blue-500 border-opacity-50"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                    Sr. No
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                    File Number
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                    Incharge
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {projects.length > 0 ? (
                  projects.map((file, index) => (
                    <tr
                      key={file._id}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="px-6 py-4  text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4  text-gray-800 font-medium">
                        {file.name}
                      </td>
                      <td className="px-6 py-4  font-bold text-gray-600">
                        {file.fileName}
                      </td>
                      <td className="px-6 py-4 font-bold  text-blue-700">
                        {file.incharge}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-6 text-center text-gray-500"
                    >
                      No files found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
