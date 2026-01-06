import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";
import { useAuth } from "../context/Authcontext";
import { movieAuth } from "../context/movieContext";
import { LuLogOut } from "react-icons/lu";

function Header() {
  const { loginUser, loading } = useAuth();
  const { search, setSearch, setSortField, setPage } =movieAuth();
  const navigate = useNavigate();
  const {setLoginUser} = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoginUser(undefined);
    navigate("/"); // or home page
  };

  return (
    <header className="flex justify-between items-center py-3 border-b border-gray-200 px-6 md:px-10 lg:px-20">
      {/* Logo */}
      <Link to="/">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          <span className="text-[#EA580C]">Movies</span>
        </h1>
      </Link>

      <div className="flex gap-5">
        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 w-105">
          <CiSearch size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none text-white w-full text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-sm font-medium">Sort by:</span>

          <div className="relative">
            <select
              onChange={(e) => {
                setSortField(e.target.value);
                setPage(1);
              }}
              className="
        appearance-none
        bg-[#14141a]
        text-gray-200
        border border-white/10
        rounded-full
        px-4 py-2 pr-9
        text-sm
        cursor-pointer
        backdrop-blur-md
        focus:outline-none
        focus:ring-2
        focus:ring-orange-500/60
        hover:border-orange-500/40
        transition
      "
            >
              <option className="bg-[#14141a] cursor-pointer" value="title">
                Title
              </option>
              <option className="bg-[#14141a] cursor-pointer" value="rating">
                Rating
              </option>
              <option
                className="bg-[#14141a] cursor-pointer"
                value="releaseDate"
              >
                Release Date
              </option>
              <option className="bg-[#14141a] cursor-pointer" value="duration">
                Duration
              </option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex text-white items-center gap-6 text-sm md:text-base">
        <Link to="/" className="hover:text-[#EA580C]">
          Home
        </Link>
        {loading ? (
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <>
            {loginUser ? (
              <button
                onClick={handleLogout}
                className="hover:text-[#EA580C] flex items-center gap-1"
              >
                Logout <LuLogOut />
              </button>
            ) : (
              <Link to="/login" className="hover:text-[#EA580C]">
                Login
              </Link>
            )}

            {/* Admin link */}
            {loginUser?.role === "admin" && (
              <Link
                to="/admin"
                className="hidden md:flex items-center gap-1 text-[#EA580C]"
              >
                <MdAdminPanelSettings size={20} />
                Admin
              </Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
