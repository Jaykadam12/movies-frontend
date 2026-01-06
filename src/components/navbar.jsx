import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";
import { useAuth } from "../context/Authcontext";
import { movieAuth } from "../context/movieContext";
import { LuLogOut, LuMenu, LuX } from "react-icons/lu";
import { useState } from "react";

function Header() {
  const { loginUser, loading } = useAuth();
  const { search, setSearch, setSortField, setPage } = movieAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { setLoginUser } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoginUser(undefined);
    navigate("/"); // or home page
  };

  return (
    <header className="border-b border-gray-200 px-4 md:px-10 lg:px-20">
      <div className="flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-[#EA580C]">Movies</span>
          </h1>
        </Link>

        {/* Desktop Search + Sort */}
        <div className="hidden md:flex gap-5">
          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 w-72">
            <CiSearch size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent text-white w-full text-sm"
            />
          </div>

          {/* Sort */}
          <select
            onChange={(e) => {
              setSortField(e.target.value);
              setPage(1);
            }}
            className="bg-[#14141a] text-gray-200 border border-white/10 rounded-full px-2 py-2 text-sm"
          >
            <option value="title">Title</option>
            <option value="rating">Rating</option>
            <option value="releaseDate">Release Date</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex text-white items-center gap-6">
          <Link to="/" className="hover:text-[#EA580C]">
            Home
          </Link>

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

          {loginUser?.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center gap-1 text-[#EA580C]"
            >
              <MdAdminPanelSettings size={20} />
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f0f14] text-white rounded-lg p-4 space-y-4">
          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2">
            <CiSearch size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent w-full text-sm"
            />
          </div>

          {/* Sort */}
          <select
            onChange={(e) => {
              setSortField(e.target.value);
              setPage(1);
              setMenuOpen(false);
            }}
            className="w-full bg-[#14141a] border border-white/10 rounded-full px-4 py-2 text-sm"
          >
            <option value="title">Title</option>
            <option value="rating">Rating</option>
            <option value="releaseDate">Release Date</option>
            <option value="duration">Duration</option>
          </select>

          {/* Links */}
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            Home
          </Link>

          {loginUser ? (
            <button onClick={handleLogout} className="flex items-center gap-2">
              Logout <LuLogOut />
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}

          {loginUser?.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-[#EA580C]"
            >
              <MdAdminPanelSettings size={18} />
              Admin
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
