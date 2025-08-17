import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newFile, setNewFile] = useState({
    name: "",
    fileName: "",
    incharge: "",
    userId: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://taskbackend-5p3o.onrender.com/api/users/${id}`
        );
        if (response.data) {
          setUser(response.data);
          setNewFile((prev) => ({
            ...prev,
            incharge: response.data.name,
            userId: response.data._id,
          }));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (id) fetchUser();
  }, [id]);
  const handleChange = (e) => {
    setNewFile({ ...newFile, [e.target.name]: e.target.value });
  };
  const handleAddFile = async (e) => {
    e.preventDefault();
    if (!newFile.name || !newFile.fileName || !newFile.incharge) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `https://taskbackend-5p3o.onrender.com/api/works`,
        newFile
      );
      const addedFile = response.data;
      setUser((prev) => ({
        ...prev,
        work: prev?.work ? [...prev.work, addedFile] : [addedFile],
      }));
      setNewFile((prev) => ({
        name: "",
        fileName: "",
        incharge: prev.incharge,
        userId: prev.userId,
      }));

      setShowForm(false);
    } catch (error) {
      console.error("Error adding file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-orange-100 to-orange-300 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          File Dashboard of {user?.name}
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Add File"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New File</h2>
          <form
            className="flex flex-col md:flex-row gap-4 items-center"
            onSubmit={handleAddFile}
          >
            <input
              type="text"
              name="name"
              placeholder="File Name"
              value={newFile.name}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full md:w-auto"
            />
            <input
              type="text"
              name="fileName"
              placeholder="File Number"
              value={newFile.fileName}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full md:w-auto"
            />
            <input
              type="text"
              name="incharge"
              placeholder="Incharge"
              value={newFile.incharge}
              className="border px-3 py-2 bg-gray-300 rounded w-full md:w-auto"
              disabled
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Adding..." : "Add File"}
            </button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sr. No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Incharge
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {user?.work?.length > 0 ? (
              user.work.map((file, index) => (
                <tr key={file._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{file.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {file.fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {file.incharge}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No files found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
