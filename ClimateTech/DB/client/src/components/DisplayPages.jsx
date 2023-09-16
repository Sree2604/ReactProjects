import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Displaypages = ({pagedetails}) => {
    console.log(pagedetails)
    return (
    
    <>
      <main className="flex items-center justify-center h-54  ml-1 flex-col space-y-48  ">
        <div className="text-center ">
          <Link to="/">
            <img
              src="./src/components/logo.png"
              className="flex items-center justify-center h-178 px-4 py-3.5"
              alt="Zemlia Logo"
            />
          </Link>
        </div>
      </main>
      <div className="flex flex-col items-center">
            <div className="flex flex-row pl-5 pb-5 pt-5 space-x-5">
              <Card className="w-96">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{pagedetails.component_type}</Card.Title>
                  <Card.Text>
                    {pagedetails.component}
                  </Card.Text>
                  <Card.Text>
                    {pagedetails.reuse.map((val)=><li>{val}</li>)}
                  </Card.Text>
                  <Card.Text>
                    {pagedetails.reduce.map((val)=><li>{val}</li>)}
                  </Card.Text>
                  <Card.Text>
                    {pagedetails.recycle.map((val)=><li>{val}</li>)}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              
            </div>
           
          </div>
      
    </>
  );
};

export default Displaypages;
