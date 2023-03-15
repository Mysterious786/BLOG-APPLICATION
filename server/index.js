import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './route/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();
const app=express();
//corse error prevention but but its a post api request and express latest version dont
//know how to handle post request to prevent install a package called npm i body-parser
//used to handle post api request,body request
//we parsing url as sometimes some spaces are miseed type in browser and browser add few charcterto that white spaces thus to remove that thing we use this...

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',Router);
const port=8000;

app.listen(port,()=>
    console.log(`server id  running succesfully`)

);

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
Connection(username,password);
