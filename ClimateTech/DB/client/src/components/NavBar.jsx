import { Link } from "react-router-dom";
import { useState } from "react";
import { Offcanvas } from "bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavBar({data}) {
  const [offCanvas, showOffCanvas] = useState(false);
  const closeModal = () => {
    showOffCanvas(false);
  };
  const navigate = useNavigate();
  return (
    <>
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
            <Button onClick={()=>navigate('/kitchen')}>Show Details</Button>
            
            
          </div>
        </div>
      </div>
    </nav>
    {offCanvas && (
      <Offcanvas show={offCanvas} onHide={closeModal}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {data.map((item) => (
            <Button onClick={()=>navigate(`/${item.location}`)}>
              {item.location}
            </Button>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    )}
    </>
  );
}

export default NavBar;
