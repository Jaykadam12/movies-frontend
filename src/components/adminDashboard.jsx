import { useState } from "react";
import AddEditMovieForm from "./AddEditMovieForm";
import ManageMovies from "./ManageMovies";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("add");
  const [editingMovie, setEditingMovie] = useState(null);

  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <h1 className="text-3xl text-center font-bold text-orange-500 mb-8">
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => {
            setEditingMovie(null);
            setActiveTab("add");
          }}
          className={`px-6 py-2 rounded-full border transition
            ${
              activeTab === "add"
                ? "bg-orange-500 text-black border-orange-500"
                : "border-orange-500 cursor-pointer text-orange-400 hover:bg-orange-500 hover:text-black"
            }`}
        >
          Add Movie
        </button>

        <button
          onClick={() => setActiveTab("manage")}
          className={`px-6 py-2 rounded-full border cursor-pointer transition
            ${
              activeTab === "manage"
                ? "bg-orange-500 text-black border-orange-500"
                : "border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black"
            }`}
        >
          Manage Movies
        </button>
      </div>

      {/* Content */}
      {activeTab === "add" && (
        <AddEditMovieForm
          editingMovie={editingMovie}
          clearEdit={() => setEditingMovie(null)}
          goToManage={() => setActiveTab("manage")}
        />
      )}

      {activeTab === "manage" && (
        <ManageMovies
          onEdit={(movie) => {
            setEditingMovie(movie);
            setActiveTab("add");
          }}
        />
      )}
    </div>
  );
}
