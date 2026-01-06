import "../../src/App.css";
import { LuClock } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { FaStar } from "react-icons/fa";


const MovieCard = ({ movie }) => {
  const formattedDate = new Date(movie.releaseDate).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
  function minutesToHours(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs === 0) return `${mins} min`;
    if (mins === 0) return `${hrs} hr`;

    return `${hrs} hr ${mins} min`;
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />

        {/* <button className="play-btn">
          <MdPlayArrow />
        </button> */}
      </div>

      <div className="movie-info">
        <h3 className="title">{movie.title}</h3>

        <p className="genres"> {movie.description}</p>

        <div className="movie-footer">
          <span className="rating">
            <MdOutlineDateRange /> {formattedDate}
          </span>
        </div>
        <div className="movie-footer">
          <span className="rating">
            <LuClock /> {minutesToHours(movie.duration)}
          </span>
        </div>
        <div className="movie-footer">
          <span className="rating">
            <FaStar /> {movie.rating}/10
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
