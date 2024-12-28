import { InventoryTracking } from "../../assets/index";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section on the extreme left */}
          <div className="flex items-center">
            <img
              src={InventoryTracking}
              alt="Logo"
              className="h-12 rounded-sm w-auto"
            />
            <h1 className="ml-2 text-2xl font-bold">Expiry Guard</h1>
          </div>

          {/* Navigation - Hidden on Mobile */}
          <nav className="hidden md:flex space-x-8 text-lg">
            <a href="/" className="hover:text-orange-400">
              Home
            </a>
            <a href="#about" className="hover:text-orange-400">
              How We works
            </a>
            <a href="#features" className="hover:text-orange-400">
            Features
            </a>
            <a href="#statistics" className="hover:text-orange-400">
              Our Statistics
            </a>
          </nav>

          {/* Login Button on the extreme right */}
          <div className="flex items-center">
            <Link
              to="/login"
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-lg font-semibold"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex flex-col space-y-4 text-lg mt-4">
          <a href="#home" className="text-white hover:text-indigo-400">
            Home
          </a>
          <a href="#about" className="text-white hover:text-indigo-400">
            About
          </a>
          <a href="#services" className="text-white hover:text-indigo-400">
            Services
          </a>
          <a href="#contact" className="text-white hover:text-indigo-400">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
