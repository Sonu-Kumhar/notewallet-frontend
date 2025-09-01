import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";
import { Trash2, LogOut } from "lucide-react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [newNote, setNewNote] = useState("");

  // ✅ Pick email from localStorage or sessionStorage
  const userEmail =
    localStorage.getItem("userEmail") ||
    sessionStorage.getItem("userEmail") ||
    "User";

  // ✅ Pick token from localStorage or sessionStorage
  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")
        }`,
    },
  });

  // ✅ Fetch User Info
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/me`, getAuthHeader());
      setUser(res.data); // { name, email }
    } catch (err) {
      console.error("Error fetching user:", err);
      navigate("/login"); // if token invalid
    }
  };

  // ✅ Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notes`, getAuthHeader());
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchUser();
    fetchNotes();
  }, []);

  // ✅ Add Note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await axios.post(
        `${BASE_URL}/notes`,
        { content: newNote },
        getAuthHeader()
      );
      setNotes([...notes, res.data]);
      setNewNote("");
      toast.success("Note added successfully! 🎉");
    } catch (err) {
      console.error("Error adding note:", err);
      toast.error("Failed to add note. Try again.");
    }
  };

  // ✅ Delete Note
  const handleDeleteNote = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, getAuthHeader());
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (err) {
      console.error("Error deleting note:", err);
      toast.error("Failed to delete note. Try again.");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userEmail");
    toast.info("You have been logged out!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6">
      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <svg width="47" height="32" viewBox="0 0 47 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.6424 0.843087L24.4853 0L21.8248 9.89565L19.4228 0.961791L16.2656 1.80488L18.8608 11.4573L12.3967 5.01518L10.0855 7.31854L17.1758 14.3848L8.34596 12.0269L7.5 15.1733L17.1477 17.7496C17.0372 17.2748 16.9788 16.7801 16.9788 16.2717C16.9788 12.6737 19.9055 9.75685 23.5159 9.75685C27.1262 9.75685 30.0529 12.6737 30.0529 16.2717C30.0529 16.7768 29.9952 17.2685 29.8861 17.7405L38.6541 20.0818L39.5 16.9354L29.814 14.3489L38.6444 11.9908L37.7984 8.84437L28.1128 11.4308L34.5768 4.98873L32.2656 2.68538L25.2737 9.65357L27.6424 0.843087Z" fill="#367AFF" />
            <path d="M29.8776 17.7771C29.6069 18.9176 29.0354 19.9421 28.2513 20.763L34.6033 27.0935L36.9145 24.7901L29.8776 17.7771Z" fill="#367AFF" />
            <path d="M28.1872 20.8292C27.3936 21.637 26.3907 22.2398 25.2661 22.5504L27.5775 31.1472L30.7346 30.3041L28.1872 20.8292Z" fill="#367AFF" />
            <path d="M25.1482 22.5818C24.6264 22.7155 24.0795 22.7866 23.5159 22.7866C22.9121 22.7866 22.3274 22.705 21.7723 22.5522L19.4589 31.1569L22.616 31.9999L25.1482 22.5818Z" fill="#367AFF" />
            <path d="M21.6607 22.5206C20.5532 22.1945 19.5682 21.584 18.7908 20.7739L12.4232 27.1199L14.7344 29.4233L21.6607 22.5206Z" fill="#367AFF" />
            <path d="M18.7377 20.7178C17.9737 19.9026 17.4172 18.8917 17.1523 17.7688L8.35571 20.1178L9.20167 23.2642L18.7377 20.7178Z" fill="#367AFF" />
          </svg>

          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center text-sm text-indigo-600 hover:underline"
        >
          <LogOut size={16} className="mr-1" /> Sign Out
        </button>
      </div>

      {/* Welcome Card */}
      {user && (
        <div className="w-full max-w-2xl bg-white p-5 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome, <span className="text-indigo-600">{user.name}</span>!
          </h2>
          <p className="text-gray-500 text-sm mt-1">Email: {user.email}</p>
        </div>
      )}

      {/* Note Input */}
      <div className="w-full max-w-2xl mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Create Note Button */}
      <div className="w-full max-w-2xl mb-6 flex justify-center">
        <button
          onClick={handleAddNote}
          className="btn px-6 py-3 bg-indigo-500 text-white rounded-xl shadow hover:bg-indigo-600 transition"
        >
          Create Note
        </button>
      </div>

      {/* Notes List */}
      <div className="w-full max-w-2xl space-y-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
            >
              <p className="text-gray-700">{note.content}</p>
              <button
                onClick={() => handleDeleteNote(note._id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No notes yet. Add one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
