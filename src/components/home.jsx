import { useState } from "react";
import { movieAuth } from "../context/movieContext";
import MovieCard from "./movieCard";
import {  VirtuosoGrid } from "react-virtuoso";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";


function Home() {
  const { movies, loading, totalPages, page, setPage } =
    movieAuth();

if (loading) {
  return (
    <div className="px-4 md:px-10 lg:px-32 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="
            h-64
            rounded-xl
            bg-linear-to-br
            from-[#1a1a22]
            via-[#22222c]
            to-[#1a1a22]
            animate-pulse
            border border-white/5
          "
        />
      ))}
    </div>
  );
}

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-24 text-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 mb-4">
          🎬
        </div>
        <h2 className="text-xl font-semibold text-gray-800">No movies found</h2>
        <p className="text-gray-500 mt-1 max-w-sm">
          Try adjusting your search or explore trending movies.
        </p>
      </div>
    );
  }

 function handleNext() {
   setPage((prev) => Math.min(prev + 1, totalPages));
 }

 function handlePrev() {
   setPage((prev) => Math.max(prev - 1, 1));
 }

  return (
    <div className="my-10">
      <VirtuosoGrid
        useWindowScroll
        totalCount={movies.length}
        itemContent={(index) => <MovieCard movie={movies[index]} />}
        listClassName="md:px-10 lg:px-32 px-2 py-2 md:py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4"
        itemClassName="flex justify-center"
      />
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
          ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white border cursor-pointer border-gray-300 text-gray-700 hover:bg-[#EA580C] hover:text-white"
          }`}
        >
          <BsArrowLeft />
          Prev
        </button>

        <div className="px-4 py-2 rounded-full bg-gray-100 text-sm font-semibold text-gray-700 shadow-sm">
          Page <span className="text-[#EA580C]">{page}</span> of {totalPages}
        </div>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
          ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white border cursor-pointer border-gray-300 text-gray-700 hover:bg-[#EA580C] hover:text-white"
          }`}
        >
          Next
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
}
export default Home;
