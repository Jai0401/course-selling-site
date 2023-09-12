import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card,TextField,Button,Link, Typography, Switch, CircularProgress } from "@mui/material";
import { Route, useNavigate} from "react-router-dom";
import "./style/style.css"
import Appbar from "./Appbar";

function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [password,setPass] = useState("");
    const [error,setError] = useState(false);
    const [errmessage,setErrmessage] = useState("");
    const [usertype,setUsertype] = useState(true);
    const [loading,setLoading] = useState(false);


    function handleBtn(){
        setLoading(true);
        if(email === "" || password === ""){
            setError(true);
            setErrmessage("You have entered an invalid username or password");
        }
        else{
            setError(false);
            setErrmessage("");
        }
        if(usertype === true){
            axios.post("https://coursify.onrender.com/users/login",{},{
                headers:{
                username: email,
                password:password
                }
            }).then((res)=>{
                console.log(res);
                setLoading(false);
                localStorage.setItem('token',JSON.stringify(res.data.token));
                localStorage.setItem('user',JSON.stringify(email));
                navigate('/user/courses');
            }).catch((err)=>{
                setError(true);
                setLoading(false);
                setErrmessage("You have entered an invalid username or password");
            })
        }
        else if(usertype === false){
        axios.post("https://coursify.onrender.com/admin/login",{},{
            headers:{
                username: email,
                password: password
            }
        }).then((res)=>{
            console.log(res);
            localStorage.setItem(`access_token`,JSON.stringify(res.data.token));
            localStorage.setItem(`username`,JSON.stringify(email));
            setLoading(false);
            navigate("/courses");
        }).catch((err)=>{
            setError(true);
            setLoading(false);
            setErrmessage("You have entered an invalid username or password");
        })
     }   
    }

    function handleUser(check){
        if(check){
            setUsertype(false);
        }
        else{
            setUsertype(true);
        }
    }
    return <>
    <Appbar></Appbar>
    <Card className="signupCard" raised="true" style={{width:"40vw",margin:"auto",marginTop:"5%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"3%"}} >
    <h1>Login</h1>
    {loading ? <div style={{height:"40vh",width:"inherit",position:"relative"}}><CircularProgress style={{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",margin:"auto",transform:"translate(50%,50%)"}} ></CircularProgress></div> : <>
    <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
{usertype ? <Typography variant="string" style={{color:"#1D5D9B",fontWeight:"600"}}>User</Typography> : <Typography variant="string">User</Typography>} 

<Switch defaultChecked={false} onChange={(e)=>{handleUser(e.target.checked)}}></Switch>
{usertype ? <Typography variant="string">Admin</Typography>: <Typography variant="string" style={{color:"#1D5D9B",fontWeight:"600"}}>Admin</Typography>} 
</div>
<TextField 
onKeyDown={(e)=>{
    if(e.key === 'Enter'){
        handleBtn();
    }
 }}
autoComplete="off"
required
variant="outlined" 
label="Username" 
type="email" 
onChange={(e)=>{setEmail(e.target.value); setError(false)}}
    margin="normal"
    placeholder="demo@123"
 />
<TextField 
 onKeyDown={(e)=>{
    if(e.key === 'Enter'){
        handleBtn();
    }
 }}
autoComplete="off"
required
variant="outlined" 
label="Password" 
type="password" 
placeholder="123"
onChange={(e)=>{setPass(e.target.value); setError(false)}}
 margin="normal" />
 {error && <Typography sx={{color:"red",fontStyle:"Poppins,sans-serif",fontWeight:"700"}}>{errmessage}</Typography>}
<Button size="large"  variant="contained" style={{margin:"3%"}} onClick={handleBtn}>Login</Button>
<div style={{margin:"3%"}}>Not a user? <Button variant="text" onClick={()=> {navigate('/register')}}>signup</Button></div>
</>
}
    
    </Card>
    </>
}

export default Login;