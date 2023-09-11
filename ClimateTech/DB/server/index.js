const express = require('express');
const app = express();
const cors=require('cors');
const pool=require("./db")

//Middleware
app.use(cors());
app.use(express.json());

//Display todo
app.get("/", async (req,res)=>{
    try{
        const qry = await pool.query("SELECT * FROM main_data;");
        res.json(qry.rows);
    }
    catch(err){
        console.log(err.message);
    }
})

app.get("/main", async (req,res)=>{
    try{
        const qry = await pool.query("SELECT * FROM main_data;");
        res.json(qry.rows);
    }
    catch(err){
        console.log(err.message);
    }
})

app.get("/resource", async (req,res)=>{
    try{
        const qry = await pool.query("SELECT * FROM resource_data;");
        res.json(qry.rows);
    }
    catch(err){
        console.log(err.message);
    }
})

app.get("/methods", async(req,res)=>{
    try {
        
        const qry = await pool.query(`SELECT main_data.rid,main_data.id,main_data.location,main_data.component,main_data.component_type,resource_data.res_id,resource_data.reuse,resource_data.reduce,resource_data.recycle,resource_data.link FROM main_data JOIN resource_data ON main_data.rid = resource_data.res_id or main_data.component_type=resource_data.component_type;`);
        res.json(qry.rows);
        console.log(qry.rows)
    } catch (err) {
        console.log(err.message);
    }
})
/* app.get("/methods/:id", async(req,res)=>{
    try {
        const { id }= req.params;
        
        const qry = await pool.query(`SELECT main_data.id,main_data.location,main_data.component,main_data.component_type,resource_data.method,resource_data.link FROM main_data JOIN resource_data ON main_data.component_type = resource_data.component_type WHERE main_data.component_type LIKE '${id}%';`);
        res.json(qry.rows);
 
    } catch (error) {
        console.log(err.message);
    }
})

// app.get("/methods/:id/:val", async(req,res)=>{
//     try {
//         const { id,val }= req.params;
        
//         const qry = await pool.query(`SELECT * FROM main WHERE ${id}='${val}'`);
//         res.json(qry.rows);
 
//     } catch (error) {
//         console.log(err.message);
//     }
// }) */

app.post("/methodsmain", async(req,res)=>{ //insert
    try {
        const { location,component,componentType } = req.body;
        // const location=req.body.location;
        // const component=req.body.component;
        // const componenttype=req.body.component_type;
        console.log(componentType+" "+component);
        const qry = await pool.query(`INSERT INTO main_data(location,component,component_type,rid) values($1,$2,$3,(select res_id from resource_data where component_type = '${componentType}'))`,
        [location,component,componentType]);
        res.json(qry);

    } catch (error) {
        console.log(error);
    }
})

app.put("/umain/:id", async(req,res)=>{
    try {
        
        const { id } = req.params;
        const { location,component,componentType} = req.body; 
        const qry = await pool.query("update main_data set location=$1,component=$2,component_type=$3 where id=$4",[location,component,componentType,id]);
        res.json(qry);

    } catch (error) {
        console.log(error);
    }
})

app.put("/ures/:id", async(req,res)=>{
    try {
        
        const { id } = req.params;
        const { componentType,reuse,reduce,recycle,link} = req.body;
        const qry = await pool.query("update resource_data set component_type=$1,reuse=$2,reduce=$3,recycle=$4,link=$5 where res_id =$6",[componentType,reuse,reduce,recycle,link,id]);
        // const qry1 = await pool.query("update main_data set component_type=$1 where rid=$2",[componentType,id]);
        res.json(qry);
    } catch (error) {
        console.log(error);
    }
})

app.post("/methodsresource", async(req,res)=>{ //insert
    try {
        const { componentType,tempReuse,tempReduce,tempRecycle,link } = req.body;//error faced in component_type because of name mismatch#rectified
        const qry = await pool.query(`INSERT INTO resource_data(component_type,reuse,reduce,recycle,link) values($1,$2,$3,$4,$5)`,[componentType,tempReuse,tempReduce,tempRecycle,link]);
        res.json(qry);

    } catch (error) {
        console.log(error);
    }
})

app.delete("/delete_main/:id", async(req,res)=>{
    try {
        
        const { id } = req.params;
        const qry = await pool.query("delete from main_data where id=$1",[id]);
        res.json("delete successful");

    } catch (error) {
        console.log(error);
    }
})
app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})