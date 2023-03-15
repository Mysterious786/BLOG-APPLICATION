//we dont know what is going to be come from frontend to get the desired things 
//as string only if required then we have to make a Schema
//dont forget to put .js extension....
import { response } from "express";
import User from "../model/user.js";
//request-->frontend->backend request
//response-->Backend->frontend status
//validating it with schema
export const signupUser=async (req,res)=>{
try{
const user=request.body;
const newUser=new User(user);
 await newUser.save();

return response.status(200).
json({msg:'signup succesful'});

}

catch(error){
return response.status(500).json({msg:"Error while signup the user"});

}
}