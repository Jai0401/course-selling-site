import React, { useEffect,useState} from "react";
import axios from "axios";
import "./style/style.css"
import Appbar from "./Appbar";
import { Route, useNavigate } from "react-router-dom";
import { Card,Button,TextField,Link,Typography, Switch, Snackbar, Alert,CircularProgress} from "@mui/material";
function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password,setPass] = useState("");
    const [error,setError] = useState(false);
    const [errmessage,setErrmessage] = useState("");
    const [userType,setUserType] = useState(true);
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    function Handleclick(e){
        setLoading(true);
        if(email === '' || password === ''){
            setErrmessage("Invalid username or password");
            setError(true);
        }
        else if(userType === true){
            setErrmessage(false);
            axios.post("https://coursify.onrender.com/users/signup",{
                username: email,
                password: password
            }).then((res)=>{
                setOpen(true);
                setLoading(false);
                setTimeout(()=>{
                    navigate('/login');
                },1000);
            })
            .catch((err)=>{
            setErrmessage("User already exists");
            setError(true);
            setLoading(false);
            })
        }
        else if(userType === false){
            setError(false);
        axios.post("https://coursify.onrender.com/admin/signup",{
            username: email,
            password:password
        }).then((res)=>{
            setOpen(true);
            setLoading(false);
            setTimeout(()=>{
                navigate('/login');
            },1000);
        }).catch((err)=>{
            setErrmessage("User already exists");
            setError(true);
            setLoading(false);
        })
    }
    }

    function handleUser(check){
        if(check){
            setUserType(false);
        }
        else{
            setUserType(true);
        }
    }

    return(
        <>
        <Appbar isLoggedIn={false} username={""}></Appbar>
        <Card className="signupCard" raised="true" style={{width:"40vw",margin:"auto",marginTop:"5%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"3%"}} >
        <h1 style={{textAlign:"center"}}>Welcome to Coursify</h1>
        {loading ? <div style={{height:"40vh",width:"inherit",position:"relative"}}><CircularProgress style={{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",margin:"auto",transform:"translate(50%,50%)"}} ></CircularProgress></div> : <><div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        {userType ? <Typography variant="string" style={{color:"#1D5D9B",fontWeight:"600"}}>User</Typography> : <Typography variant="string">User</Typography>} 
    <Switch defaultChecked={false} onChange={(e)=>{handleUser(e.target.checked)}}></Switch>
    {userType ? <Typography variant="string">Admin</Typography>: <Typography variant="string" style={{color:"#1D5D9B",fontWeight:"600"}}>Admin</Typography>}
        </div>
        <TextField 
        onKeyDown={(e)=>{
        if(e.key === 'Enter'){
            Handleclick();
        }
     }}
        required
        autoComplete="off"
        variant="outlined" 
        label="Username" 
        type="email" 
        onChange={(e)=>{setEmail(e.target.value); setError(false)}}
            margin="normal"
         />
        <TextField 
        onKeyDown={(e)=>{
        if(e.key === 'Enter'){
            Handleclick();
        }
     }}
        autoComplete="off"
        required
        variant="outlined" 
        label="Password" 
        type="text" 
        onChange={(e)=>{setPass(e.target.value); setError(false)}}
         margin="normal" />
         {error && <Typography sx={{color:"red",fontStyle:"Poppins,sans-serif",fontWeight:"700"}}>{errmessage}</Typography>}
        <Button size="large" variant="contained" style={{margin:"3%"}} onClick={Handleclick}>Signup</Button>
        <div style={{margin:"3%"}}>Already a user? <Button variant="text"  onClick={()=> {navigate('/login')}}>Login</Button></div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          { userType ? 'User created Successfully' : "Admin created successfully"}
        </Alert>
      </Snackbar>
      </>
        }
        
        </Card>
        </>
    )
}

export default Register;