//making api for signupUser

//use of axios and intercepters npm i axios
//making of common api...
//if goes to pending state then timeout... always in milisecond so do precise calculation..
//request.use takes two function first for succesfu
import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from '../constants/config';
import axios from 'axios';
const API_URL='http://localhost:8000';

const axiosInstance=axios.create({
baseURL:API_URL,
timeout:10000,
headers:{
    "content-type":"application/json"
}


})
//incase of request....
// axiosInstance.interceptors.request.use(
//     function (config){
//         return config;
//     },


//     function(error){
//         return Promise.reject(error);
//     }
    
// )
axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);
//incase of response

axiosInstance.interceptors.response.use(
    function (response){
        //stop global loader here and to make function
        return processResponse(response);

    },
    function (error){
        //stop global loader and to make function
        return Promise.reject(processError(error));
    }
)
//common response
//if success return is success true ,data->>object
//if error retrn is Failure:true,status: string msg :string code:int 500 mainly
/////////// response object contains data send by api
const processResponse=(response)=>{
if(response?.status===200){
    return {
        isSuccess:true,
        data:response.data
    }}
    else{
        return{
            isFailure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code

        }
    }
}


const processError= (error)=>{
    //Request made and server responded with a status order
    //that falls out of the range 2.x.x
if (error.response){

   console.log('ERROR IN RESPONSE:',error.toJSON());
   return{
    isError:true,
    msg:API_NOTIFICATION_MESSAGES.responseFailure,
    code:error.response.status
   } 

}
//request made but no response was received,connectivity or netwrok
else if(error.request){
    console.log('ERROR IN REQUEST :',error.toJSON());
    return{
     isError:true,
     msg:API_NOTIFICATION_MESSAGES.requestFailure,
     code:""
    } 
}
//something happened at frontend
else{
    console.log('ERROR IN NETWORK',error.toJSON());
    return{
     isError:true,
     msg:API_NOTIFICATION_MESSAGES.networkError,
     code:""
    } 
}
}
//service url is an object through which we have to loop...
 //show up and down are used to show a bar
 //AXIOSINSTANC a function that takes a 
const API={};
for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body,showUploadProgress,showDownloadProgress)=>
axiosInstance({
    method:value.method,
    url:value.url,
    data:body,
    responseType:value.responseType,
    onUploadProgress:function (progressEvent){
        if(showUploadProgress){
            let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total);
showUploadProgress(percentageCompleted);
        }

    },
    onDownloadProgress:function (progressEvent){
        if(showDownloadProgress){
            let percentCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total);
showDownloadProgress(percentCompleted);
        }
        
    }
});
    }
export {API}//second vid...