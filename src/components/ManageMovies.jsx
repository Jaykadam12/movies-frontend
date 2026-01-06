import { useEffect, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";

export default function ManageMovies({ onEdit }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [manageMovies, setManageMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchMovies() {
    try {
      const res = await fetch(`${API_BASE_URL}/movies/manage`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch movies");
      }

      setManageMovies(data.movies || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [API_BASE_URL]);

  async function deleteMovie(movie) {
    try {
      const res = await fetch(`${API_BASE_URL}/movies/${movie._id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "failed to delete");
      }
      fetchMovies()
      alert("Movie Deleted");
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-10 text-zinc-400">Loading movies...</div>
    );
  }

  if (manageMovies.length === 0) {
    return (
      <div className="text-center mt-10 text-zinc-400">No movies found.</div>
    );
  }

  return (
    <div
      className="bg-zinc-900/70 backdrop-blur-xl border border-white/10
                 rounded-2xl p-8 shadow-2xl"
    >
      <h2 className="text-2xl font-semibold mb-6">Manage Movies</h2>

      {/* IMPORTANT: Fixed height for virtualization */}
      <div className="h-125">
        <TableVirtuoso
          data={manageMovies}
          itemKey={(index, movie) => movie._id || movie.id}
          components={{
            Table: (props) => (
              <table {...props} className="w-full text-left border-collapse" />
            ),
            TableHead: () => (
              <thead className="sticky top-0 bg-zinc-900 text-zinc-400 border-b border-zinc-700">
                <tr>
                  <th className="py-3 px-2">Title</th>
                  <th className="px-2">Description</th>
                  <th className="px-2">Rating</th>
                  <th className="px-2 text-right">Actions</th>
                </tr>
              </thead>
            ),
            TableRow: (props) => (
              <tr
                {...props}
                className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
              />
            ),
          }}
          itemContent={(index, movie) => (
            <>
              <td className="py-4 px-2 font-medium">{movie.title}</td>

              <td className="px-2 max-w-xs truncate text-zinc-400">
                {movie.description}
              </td>

              <td className="px-2">⭐ {movie.rating}</td>

              <td className="px-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(movie)}
                  className="px-4 py-1 rounded-lg bg-orange-500 text-black
                             hover:bg-orange-600 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMovie(movie)}
                  className="px-4 py-1 rounded-lg bg-red-600
                             hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </>
          )}
        />
      </div>
    </div>
  );
}
