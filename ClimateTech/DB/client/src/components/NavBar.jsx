import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 border-b-4 border-indigo-700 shadow-lg p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between space-x-4">
                    <Link to="/main" className="text-2xl font-bold text-black">
                        Admin Page
                    </Link>
                    <button
                        className="lg:hidden text-black focus:outline-none"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <div className="hidden lg:flex space-x-6">
                        <Link
                            to="/main"
                            className="text-indigo-300 hover:text-black transition duration-300"
                        >
                            Main Table
                        </Link>
                        <Link
                            to="/resource"
                            className="text-indigo-300 hover:text-black transition duration-300"
                        >
                            Resource Table
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
