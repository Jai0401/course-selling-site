import React, { useState,useEffect } from "react";
import axios from "axios";
import "./style/style.css";
import Appbar from "./Appbar";
import {Route, useNavigate} from "react-router-dom";
import { Card, CardContent, TextField, Typography, Button, FormControlLabel, Checkbox, FormGroup, Snackbar, Alert } from "@mui/material";
function CreateCourse() {
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [price,setPrice] = useState("");
    const [imageLink,setImg] = useState("");
    const [published,setpublished] = useState(false);
    const [error,setError] = useState(false);
    const [errmessage,setErrmessage] = useState("");
    function handleTrue(e){
        if(e.target.checked){
            setpublished(true);
        }
    }
    function handleFalse(e){
        if(e.target.checked){
            setpublished(false);
        }
    }
    function handleBtn(e){
        if(title === "" || desc === "" || price === 0 || imageLink === ""){
            setErrmessage("Enter valid inputs");
            setError(true);
        }
        else{
            setError(false);
        const access_token =  JSON.parse( localStorage.getItem("access_token"));
        axios.post("https://coursify.onrender.com/admin/courses",{
            title:title,
            description:desc,
            price:price,
            imageLink:imageLink,
            published:published
        },{
           headers:
            {
                "Content-Type":"application/json",
                Authorization: `Bearer ${access_token}`
            }
        }).then((res)=>{
            setOpen(true);
            callback();
        })
        .catch((err)=>{
            alert(err);
        })
    }
    }


    function callback(){
        setOpen(false);
        navigate('/courses');
    }
    return( 
    <>
    <Appbar isLoggedIn={true} username={JSON.parse(localStorage.getItem('username'))}></Appbar>
    <div className="courseForm"  style={{width:"60%",margin:"auto",marginTop:"2%",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography sx={{fontWeight:"600",fontStyle:"Poppins,sans-serif"}} gutterBottom variant="h3" align="center" color="primary">
            Create Course
        </Typography>
    <Card raised="true" style={{width:"120%"}} className="createCourseCard">
    <CardContent style={{display:"flex",flexDirection:"column",alignItems:"center",paddinh:"6%"}}>
            <TextField sx={{marginTop:"2%"}} fullWidth type="text" gutterBottom variant="standard" label="Title" placeholder="Enter Title" onChange={(e)=> {setTitle(e.target.value); setError(false)} }></TextField>
            <TextField  sx={{marginTop:"2%"}} type="text" fullWidth multiline gutterBottom variant="standard" label="Description" placeholder="Enter description" onChange={(e)=> {setDesc(e.target.value); setError(false)}}></TextField>
            <TextField  sx={{marginTop:"2%"}}  type="number" fullWidth
            gutterBottom variant="standard" placeholder="Enter Price" label="Price" onChange={(e)=> {setPrice(e.target.value); setError(false)}}></TextField>
            <TextField  sx={{marginTop:"2%"}} type="url" fullWidth
            gutterBottom variant="standard" placeholder="Enter image link" label="Image" onChange={(e)=> {setImg(e.target.value); setError(false)}}></TextField>
            <FormGroup style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"start",marginTop:"3%"}}>
            <Typography variant="h5" sx={{fontFamily:"Poppins,sans-serif",fontWeight:"500"}}>Published</Typography>
            <FormControlLabel fullWidth control={<Checkbox></Checkbox>} label="True" labelPlacement="start" onChange={handleTrue}>
            </FormControlLabel>
            <FormControlLabel  fullWidth control={<Checkbox></Checkbox>} label="False" labelPlacement="start"
            onChange={handleFalse}>
            </FormControlLabel>
            </FormGroup>
        {error && <Typography sx={{color:"red",fontStyle:"Poppins,sans-serif",fontWeight:"600"}}>{errmessage}</Typography>}
        <Button sx={{marginTop:"3%"}} variant="contained" onClick={handleBtn}>Create Course</Button>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Course created successfully"
      />
        </CardContent>
        </Card>
    </div>
    </>
    )
    }
export default CreateCourse;