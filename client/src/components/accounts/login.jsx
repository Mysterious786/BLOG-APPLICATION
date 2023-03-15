import {Box,TextField,Button,styled,Typography} from '@mui/material';
//now its like box with css stored in component
import { useState } from 'react';
import { API } from '../../service/api';
const Component =styled(Box)`
width:400px;
//margin:auto align to centre
margin:auto;
box-shadow:5px 2px 5px 2px rgb(0 0 0/ 0.6);

`;
//whener we styled some variable we have to pass it as string with an object use comma


const Image=styled('img')({
width:250,
//margin auto works with display flex to align image to centre


margin:'auto',
display:'flex',
padding:'50px'

});
const Wrapper=styled(Box)`
padding:25px 35px;
display: flex;
//the below align everything to one line
flex: 1;
flex-direction: column;
&>div,&>button,&>p{
    margin-top:20px ;

}

`
const LoginButton=styled(Button)`
text-transform: none;
background: #fB641B;
color: #fff;
height: 48px;
border-radius: 2px;
`

const SignUpButton=styled(Button)`
text-transform:none;
background:#fff;
color:#2874f0;
height: 48px;
border-radius: 2px;
box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`
const Text=styled(Typography)`

color:#878787;
font-size:16px;`

const Error=styled(Typography)`
font-size: 10px;
color:#ff6161;
line-height: 0;
margin-top: 10px;
font-weight: 600;


`

const signupInitialValues={
    name:"",
    username:"",
    password:""
}



const Login=()=>{
    
    // const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    // const imageURL='../../assests/Logo.png'
const [account,toggleAccount]=useState('login');
const [signup,setSignup]=useState(signupInitialValues);
const toggleSignUp=()=>toggleAccount('signup');
const alreadyAccount=()=>toggleAccount('login');
//to take out the value we have to use the event...
//to toggle between error and not error
const [error,showError]=useState('');

// const onInputChange=(e)=>{
//     //destructuring...
// const {name}=e.target;
// const {value}=e.target;
// //...signup is used to spread the old values as it is.
// //name will act as a key here thats why [],hence storing signup values
// //now we have to make the api for backend data storage call...

//     setSignup({...signup,[name]:value});

// }

const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
}

//asynchronous since api call it return a promise

const signupUser=async ()=>{
   let response=await API.userSignup(signup);
   if(response.isSuccess){
    showError('');
    //if success signup value=== default
    setSignup(signupInitialValues);
    toggleAccount('login')
   }else{
    showError('Something went wrong,Plese try again')
   }
}
    

return(
        //div replacement in mui is boxp type tage in material ui is Typograpghy
        <Component>
        <Box> <Image src={require('../../assests/Logo.png')} alt="Login"/>
        {
            account==='login'?
             <Wrapper>
                <TextField variant='standard' label='Enter UserName'/>
                <TextField variant='standard' label='Enter Password'/>
                <LoginButton variant='contained'>Login</LoginButton>

                <Text style={{textAlign:'center'}}>OR</Text>
                <SignUpButton onClick={()=>toggleSignUp()}>Create an Account</SignUpButton>
            </Wrapper> 
:
            <Wrapper>
                <TextField variant='standard' onChange={(e)=>onInputChange(e)} name="name" label='Enter Name'/>
                <TextField variant='standard' onChange={(e)=>onInputChange(e)} name="username" label='Enter Username'/>
                <TextField variant='standard' onChange={(e)=>onInputChange(e)} name="password" label='Enter Password'/>
{/*  if error show it inside typographyy */}
                {error && <Error>{error}</Error>}
                <SignUpButton onClick={()=>signupUser()}>SignUp</SignUpButton>
{/* p type tage in material ui is Typograpghy      */}
                <Text style={{textAlign:'center'}}>OR</Text>
                <LoginButton variant='contained' onClick={()=>alreadyAccount()}>Already have an Account</LoginButton>
            </Wrapper>
        }
        </Box>
           
        </Component>
        
    )
    
}
//CORSE:course origin resource sharing error browser fact,browser blocks our request when backened and frontend works on two different ports request on two different servers...
//To prevent this go to index.js and install npm i cors

export default Login;