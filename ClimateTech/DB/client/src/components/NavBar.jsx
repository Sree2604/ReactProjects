import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <nav className=" border-b-4 border-green-600 shadow-md p-4">
      <div className="container-fluid">
        <div className="flex items-center justify-between space-x-4">
          <Link
            to="/resource"
            className="text-2xl font-admin text-green-950 hover:text-green-400 transition duration-300"
          >
            Admin Page
          </Link>
          <div className="hidden lg:flex space-x-6">
            <Link
              to="/view"
              className="text-green-950 hover:text-green-400 transition duration-300 text-xl font-bold font-admin"
            >
              View Data
            </Link>
            <Link
              to="/resource"
              className="text-green-950 hover:text-green-400 transition duration-300 text-xl font-bold font-admin"
            >
              Insert Data
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;