import { useState } from "react";

const Inserter = ({ adder }) => {
    const [location, setLocation] = useState("");
    const [component, setComponent] = useState("");
    const [componentType, setComponentType] = useState("");

    const HandleSubmission = (e) => {
        e.preventDefault();
        console.log("Submitted");
        adder({ location, component, componentType });

        setLocation("");
        setComponent("");
        setComponentType("");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-center">Insertion Table</h1>
                <form onSubmit={HandleSubmission}>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            placeholder="Enter Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="component" className="block text-sm font-medium text-gray-700">
                            Component
                        </label>
                        <input
                            type="text"
                            id="component"
                            placeholder="Enter Component"
                            value={component}
                            onChange={(e) => setComponent(e.target.value)}
                            className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="componentType" className="block text-sm font-medium text-gray-700">
                            Component Type
                        </label>
                        <input
                            type="text"
                            id="componentType"
                            placeholder="Enter Component Type"
                            value={componentType}
                            onChange={(e) => setComponentType(e.target.value)}
                            className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Insert
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Inserter;
