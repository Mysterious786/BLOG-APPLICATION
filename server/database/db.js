import mongoose from "mongoose"





 const Connection=async (username,password)=>{
    const URL=`mongodb://${username}:${password}@ac-0jbmzov-shard-00-00.glkzp9t.mongodb.net:27017,ac-0jbmzov-shard-00-01.glkzp9t.mongodb.net:27017,ac-0jbmzov-shard-00-02.glkzp9t.mongodb.net:27017/?ssl=true&replicaSet=atlas-j0tuvy-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
await mongoose.connect(URL,   {useNewUrlParser:true});
console.log('Database connected successfully')
    }catch (error){
console.log('error while connecting',error);
    }
}

export default  Connection;