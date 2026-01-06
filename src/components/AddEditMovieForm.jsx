import { useEffect, useState } from "react";

export default function AddEditMovieForm({
  editingMovie,
  clearEdit,
  goToManage,
}) {
  const [form, setForm] = useState({
    title: "",
    genre: "",
    releaseDate: "",
    duration: "",
    rating: "",
    poster: "",
  });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const addMovies = async () => {
    try {
      const isEdit = Boolean(editingMovie?._id);
      const api = isEdit
        ? `${API_BASE_URL}/movies/${editingMovie._id}`
        : `${API_BASE_URL}/movies`;

      const mth = isEdit ? "PUT" : "POST";
      const response = await fetch(api, {
        method: mth,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Submit error:", error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (editingMovie) setForm(editingMovie);
  }, [editingMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovies();

    clearEdit();
    setForm({
      title: "",
      description: "",
      releaseDate: "",
      duration: "",
      rating: "",
      poster: "",
    });
    alert('Movie added')
    goToManage();
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl bg-zinc-900/70 backdrop-blur-xl
                 border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <h2 className="text-2xl font-semibold mb-6">
          {editingMovie ? "Update Movie" : "Add New Movie"}
        </h2>

        <div className="space-y-4">
          {[
            { key: "title", label: "Title" },
            { key: "description", label: "Genre (Drama, Action)" },
            { key: "duration", label: "Duration (2 hr 10 min)" },
            { key: "rating", label: "Rating (8.5)" },
            { key: "poster", label: "Poster URL" },
          ].map((field) => (
            <input
              key={field.key}
              placeholder={field.label}
              value={form[field.key]}
              onChange={(e) =>
                setForm({ ...form, [field.key]: e.target.value })
              }
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700
                       px-4 py-3 text-white placeholder-zinc-500
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       focus:border-orange-500 transition"
            />
          ))}

          <input
            type="date"
            value={form.releaseDate}
            onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700
                     px-4 py-3 text-white
                     focus:outline-none focus:ring-2 focus:ring-orange-500
                     focus:border-orange-500 transition"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-xl font-semibold text-black
                   bg-linear-to-r from-orange-500 to-orange-400
                   hover:from-orange-600 hover:to-orange-500
                   shadow-lg shadow-orange-500/30 transition"
        >
          {editingMovie ? "Update Movie" : "Add Movie"}
        </button>
      </form>
    </div>
  );
}
