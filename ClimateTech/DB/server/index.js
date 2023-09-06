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

// app.get("/methods/:id", async(req,res)=>{
//     try {
//         const { id }= req.params;
        
//         const qry = await pool.query(`SELECT main_data.id,main_data.location,main_data.component,main_data.component_type,resource_data.method,resource_data.link FROM main_data JOIN resource_data ON main_data.component_type = resource_data.component_type WHERE main_data.component_type LIKE '${id}%';`);
//         res.json(qry.rows);
 
//     } catch (error) {
//         console.log(err.message);
//     }
// })

// // app.get("/methods/:id/:val", async(req,res)=>{
// //     try {
// //         const { id,val }= req.params;
        
// //         const qry = await pool.query(`SELECT * FROM main WHERE ${id}='${val}'`);
// //         res.json(qry.rows);
 
// //     } catch (error) {
// //         console.log(err.message);
// //     }
// // })

app.post("/methodsmain", async(req,res)=>{ //insert
    try {
        const { location,component,componentType } = req.body;
        // const location=req.body.location;
        // const component=req.body.component;
        // const componenttype=req.body.component_type;
        console.log(componentType+" "+component);
        const qry = await pool.query(`INSERT INTO main_data(location,component,component_type) values($1,$2,$3)`,
        [location,component,componentType]);
        res.json(qry);

    } catch (error) {
        console.log(error);
    }
})
app.post("/methodsresource", async(req,res)=>{ //insert
    try {
        const { componentType,method,link } = req.body;//error faced in component_type because of name mismatch#rectified
        const qry = await pool.query(`INSERT INTO resource_data(component_type,method,link) values($1,$2,$3)`,[componentType,method,link]);
        res.json(qry);

    } catch (error) {
        console.log(error);
    }
})

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})