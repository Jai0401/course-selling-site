import React, { useState,useEffect } from "react";
import axios from "axios";
import "./style/style.css"
import {Link, Route, useNavigate} from "react-router-dom";
import Appbar from "./Appbar";
import { Card, CardActions, CardContent, CardMedia,Typography,Button, CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faPlus,faTrash } from "@fortawesome/free-solid-svg-icons";
function ShowCourses() {
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [courses, setCourses] = useState([]);
    const [isLoggedIn,setIsLoggedIn] = useState(true);
    useEffect(()=>{
        const access_token = JSON.parse(localStorage.getItem('access_token'));
        axios.get("https://coursify.onrender.com/admin/courses/",{
            headers:
            {
                Authorization: `Bearer ${access_token}`
            }
        }).then((res)=>{
            setIsLoggedIn(false);
            callback(res.data);
            
        }).catch((err)=>{
            console.log(err);
        })
    })

    function callback(data){
        setCourses(data.courses);
        const user = JSON.parse(localStorage.getItem('username'));
        const finaluser = user.split('@')[0];
        setUsername(finaluser);
        localStorage.setItem('username',JSON.stringify(finaluser));
    }
    // Add code to fetch courses from the server
    // and set it in the courses state variable.


    return (
        <div>
        <Appbar isLoggedIn={true} username={username}></Appbar>
        {isLoggedIn ? <div style={{position:"absolute",top:"50%",left:"50%"}}><CircularProgress></CircularProgress></div> : <div><div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography variant="h3" style={{textAlign:"center",marginTop:"3%",fontWeight:"600",color:"#0d47a1"}}>Courses</Typography>
        <Button sx={{marginTop:"1.5%"}} onClick={(e)=> {navigate('/createCourse')}} variant="contained" startIcon={<FontAwesomeIcon icon={faPlus} /> }>Add Course</Button>
        </div>
        <div className="showCoursesDiv" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",width:"80%",margin:"auto",gridGap:"8%",marginTop:"3%",marginBottom:"3%"}}>
        {courses.map(c => <Course title={c.title} description={c.description} price={c.price} imgLink={c.imageLink} key={c._id} id={c._id} />)}
        </div>
        </div>}
    </div>)
}


function handleDelete(id){
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    axios.delete(`https://coursify.onrender.com/admin/courses/${id}`,{
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    }).then((res)=>{
        console.log(res.data);
    }).catch((err)=>{
        alert(err);
    })
}

export function Course(props) {
    const navigate = useNavigate();
    return(
        <> 
    <Card className="showCourseDivCard" raised="true" style={{minHeight:"60vh"}}>
    <CardMedia  
    height={200}
    component="img"
        sx={{objectFit: "cover"}}
    image={props.imgLink} />
    <CardContent >
        <Typography sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}} variant="h5" align="center" style={{fontWeight:"600"}}>{props.title}</Typography>
        <Typography sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}}   variant="h6" align="center">{props.description}</Typography>
        <Typography  sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}} variant="h6" align="center" style={{fontWeight:"800"}}>₹ {props.price}</Typography>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>
        <Button variant="contained" onClick={(e)=>{navigate(`/courses/${props.id}`)}}  startIcon={<FontAwesomeIcon icon={faPenToSquare} />} sx={{width:"40%",marginBottom:"4%"}}>Edit</Button>
        <Button variant="contained" color="error" onClick={(e)=>{handleDelete(props.id)}}  startIcon={<FontAwesomeIcon icon={faTrash} />} sx={{width:"40%",marginBottom:"4%"}}>Remove</Button>
        </div>   
        
    </CardContent>
        </Card>
    </>
    )
}

export default ShowCourses;