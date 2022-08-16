//import  express  from "express";
const express=require("express")
//import Pool from "pg";
/* import {pg} from "pg"; */
//import cors from "cors"
const cors=require("cors")
//import bodyParser from ""
const bodyParser=require("body-parser")
var convert = require('xml-js');
let {Pool}=require("pg")
//import kayanRouter from "./routes/kayans.js";
//let search=require("./controllers/searchController.js")
//import {search} from "./controllers/searchController.js"


/////

///connection with datbase and fill the table transaction with 5000 random record

////



const app = express();


app.use(cors())

 app.use(bodyParser.json())
const PORT = 5000 ;
let string = "postgres://postgres:12345@localhost:5432/project"
const Option = {
    connectionString : string
};
  const Pool1=  new Pool(Option);



/////////////////////////////
app.post("/search" ,(request , response) =>{

    //the data from react is stored inside the body of the request




var json= convert.xml2json(request.body.data, {compact: true, spaces: 4});
json=JSON.parse(json)


let requestJSON=json["request"]



let drug=requestJSON["drug"]["_text"]
let disease=requestJSON["disease"]["_text"]
let type=requestJSON["type"]["_text"]


console.log("drug",drug);
console.log("disease",disease);
console.log("type",type);

 Pool1.connect().then(async(client) => 
{
   let result = await client.query(`select * from transaction where drugcode='${drug}' and diseasecode='${disease}' and type=${type} ` );
       
        try{
            if (result)
            {
                result=result.rows;
  response.send({success:true,result})
        
            }
        }
        catch(error){
            
console.log(error.message);

 response.send({success:false})
        }
        finally{
            client.release();
        }
})  

app.post("/insert", (request , response) => {

    //response.send("Hello Ahmad");

    let insert= 
       `  insert into transaction
       (drugcode , diseasecode , type , description)
       
        select 
        md5(random()::text),
        md5(random()::text),
         (random()+1)::int,
             md5(random()::text)
                         
           from generate_series(1,5000)  ` 
           client.query(insert , (err, result) => {
            
            if(!err) {
                response.send('True')
            }
            else{
                console.log(err.message)
            }
            client.end;
           })
    });
//parsing


    /* let data=request.body.data
    console.log('xml');
    console.log(data);
    */
   
   
    
    } );

//app.use("/kayans", kayanRouter); //   حددت شو البدايه الي بدي استنخدمها كيانز لعنوان اليو ار ال 

app.listen(PORT , () => console.log(`the server is running on Port ${PORT}`));