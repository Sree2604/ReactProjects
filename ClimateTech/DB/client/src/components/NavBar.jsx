import { Link } from 'react-router-dom';


function NavBar() {
    return (
        <nav className=" border-b-4 border-teal-700 shadow-lg p-4">
            <div className="container-fluid">
                <div className="flex items-center justify-between space-x-4">
                    <Link to="/resource" className="text-2xl font-navhead text-green-950 hover:text-green-400 transition duration-300">
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
                            className="text-green-950 hover:text-green-400 transition duration-300 text-xl font-bold font-body"
                        >
                            View Data
                        </Link>
                        <Link
                            to="/resource"
                            className="text-green-950 hover:text-green-400 transition duration-300 text-xl font-bold font-body"
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
