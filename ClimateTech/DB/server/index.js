const dotenv = require('dotenv');
dotenv.config()
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const jwt = require('jsonwebtoken');

//Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const secretKey = process.env.JWT_SECRET; 
const uname=process.env.U_NAME;
const upass=process.env.U_PASS;
const id=process.env.ID;

const authMiddleware = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(401).send({ message: 'Unauthorized access' })
  }
  const authHeader=req.headers['authorization'];
  const token=authHeader.split(" ")[1];
  try{
    const tokenPayload=jwt.verify(token,secretKey);
    if(tokenPayload){
      next();
    }
    else{
      return res.status(401).send({ message: 'Unauthorized access' })
    }
  }
  catch(error){
    return res.status(401).send({ message: 'Unauthorized access' })
  }
}

//Display todo

app.get("/main",authMiddleware, async (req, res) => {
  try {
    const qry = await pool.query("SELECT * FROM main_data;");
    res.json(qry.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/resource",authMiddleware, async (req, res) => {
  try {
    const qry = await pool.query("SELECT * FROM resource_data;");
    res.json(qry.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/methods",authMiddleware, async (req, res) => {
  try {
    const qry = await pool.query(
      `SELECT main_data.rid,main_data.id,main_data.location,main_data.component,main_data.component_type,resource_data.res_id,resource_data.reuse,resource_data.reduce,resource_data.recycle,resource_data.link FROM main_data JOIN resource_data ON main_data.rid = resource_data.res_id or main_data.component_type=resource_data.component_type;`
    );
    res.json(qry.rows);
    console.log(qry.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/methodsmain", async (req, res) => {
  //insert
  try {
    const { location, component, componentType } = req.body;
    const qry = await pool.query(
      `INSERT INTO main_data(location,component,component_type,rid) values($1,$2,$3,(select res_id from resource_data where component_type = '${componentType}'))`,
      [location, component, componentType]
    );
    res.json(qry);
  } catch (error) {
    console.log(error);
  }
});

app.put("/umain/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { location, component, componentType } = req.body;
    const qry = await pool.query(
      "update main_data set location=$1,component=$2,component_type=$3 where id=$4",
      [location, component, componentType, id]
    );
    res.json(qry);
  } catch (error) {
    console.log(error);
  }
});

app.put("/ures/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { componentType, reuse, reduce, recycle, link } = req.body;
    const qry = await pool.query(
      "update resource_data set component_type=$1,reuse=$2,reduce=$3,recycle=$4,link=$5 where res_id =$6",
      [componentType, reuse, reduce, recycle, link, id]
    );
    res.json(qry);
  } catch (error) {
    console.log(error);
  }
});

app.post("/methodsresource", async (req, res) => {
  //insert
  try {
    const { componentType, tempReuse, tempReduce, tempRecycle, tempLink } =
      req.body; //error faced in component_type because of name mismatch#rectified
    const qry = await pool.query(
      `INSERT INTO resource_data(component_type,reuse,reduce,recycle,link) values($1,$2,$3,$4,$5)`,
      [componentType, tempReuse, tempReduce, tempRecycle, tempLink]
    );
    res.json(qry);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete_main/:component_type", async (req, res) => {
  try {
    const { component_type } = req.params;
    const qry = await pool.query(
      "delete from main_data where component_type=$1",
      [component_type]
    );
    const qry1 = await pool.query(
      "delete from resource_data where component_type=$1",
      [component_type]
    );
    res.json("delete successful");
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', async(req, res) => {         //for usage with client side
  const { username, password } = req.body;
  const user = ((username===uname) && (password===upass));
    if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  console.log(username,password)
  const token = jwt.sign({ userId: id }, secretKey, { expiresIn: '1h' });
  console.log(token);
  
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on port${port}`);
});
