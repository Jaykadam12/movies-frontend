import { Children, createContext, useContext, useEffect, useState } from "react";

export const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [movies, setMovies] = useState(undefined);
  const [totalPages, setTotalPages] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("duration");
  const [debouncedSearch, setDebouncedSearch] = useState("");


  // fetch movies
  async function fetchMovies(page) {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/movies?page=${page}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch movies");
      }

      setMovies(result.movies);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchMovies(page);
  }, [page]);


  // fetch search movies
  async function fetchSearchMovies() {
    try {
      setLoading(true);

     const params = new URLSearchParams({
       page,
       q: debouncedSearch,
       sortBy: sortField,
       order: 'asc',
     });

     const res = await fetch(`${API_BASE_URL}/movies/search?${params}`);

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch movies");
      }

      setMovies(result.movies);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSearchMovies();
  }, [page, debouncedSearch, sortField]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        totalPages,
        loading,
        fetchMovies,
        page,
        setPage,
        search,
        setSearch,
        sortField,
        setSortField,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const movieAuth = () => {
  return useContext(MovieContext);
};
