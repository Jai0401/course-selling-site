
import * as React from "react";
import Appbar from "./Appbar";
import videoBg from '../assets/vid.mp4'
import { Button,ButtonGroup,Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Landing() {
    const navigate = useNavigate();
    return(
        <>
        <Appbar></Appbar> 
        <video src={videoBg} autoPlay muted loop  style={{width:"100%",height:"87.1vh",objectFit:"cover",background:"(0,0,0,6)"}}></video>
    <div style={{position:"absolute",top:"50%",left:"28%",color:"white",textAlign:"cetner"}}>
        <Typography variant="h4" sx={{fontWeight:"600"}}>Welcome to the best place to learn</Typography>
        <Button variant="contained" onClick={()=>{navigate('/register')}}>Enroll now</Button>
    </div>
    </>
    )
}

export default Landing;