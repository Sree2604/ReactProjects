import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 border-b-4 border-indigo-700 shadow-lg p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between space-x-4">
                    <Link to="/resource" className="text-2xl font-bold text-black">
                        Admin Page
                    </Link>
                    <div className="hidden lg:flex space-x-6">
                        {/* <Link
                            to="/main"
                            className="text-indigo-300 hover:text-black transition duration-300"
                        >
                            Main Table
                        </Link> */}
                        <Link
                            to="/view"
                            className="text-indigo-300 hover:text-black transition duration-300"
                        >
                            View Data
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
