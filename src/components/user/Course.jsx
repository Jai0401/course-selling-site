import React from 'react'
import { Card,CardMedia,Typography,CardContent,Button,Snackbar,Alert } from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faGift } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Course = (props) => {

  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  const [on,setOn] = useState(false);
  const [bought,setBought] = useState(false);
  const [loading,setLoading] = useState(true);

  function handleClickBuy(id){
    setLoading(true);
    const token = JSON.parse(localStorage.getItem('token'));
    const res = axios.post(`https://coursify.onrender.com/users/courses/${id}`,{},{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      setLoading(false);
      setOpen(true);
      setBought(true);
    }).catch((err)=>{
      setLoading(false);
      setOn(true);
      setBought(true);
    })
  }
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  
  const handleCloseOn = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOn(false);
  };
  



  return (
    <> 
            <Card className='userCoursesDivCard' raised={true} style={{minHeight:"60vh"}}>
            <CardMedia  
            height={200}
            component="img"
                sx={{objectFit: "cover"}}
            image={props.imgLink} />
            <CardContent >
                <Typography sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}} variant="h5" align="center" style={{fontWeight:"600"}}>{props.title}</Typography>
                <Typography sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}}   variant="h6" align="center">{props.description}</Typography>
                <Typography  sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}} variant="h6" align="center" style={{fontWeight:"800"}}>₹{props.price}</Typography>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>
                </div>   
                { props.isPurchased || bought ? <><Button onClick={()=> navigate(`/user/courses/${props.id}`)} startIcon={<FontAwesomeIcon icon={faGift} />} variant='outlined' fullWidth>Go to Courses</Button></> : <Button variant='contained'  fullWidth startIcon={<FontAwesomeIcon icon={faCartShopping} />} 
  onClick={(e)=> {handleClickBuy(props.id);}}>Buy Now</Button> }
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Course Purchased successfully
                  </Alert>
                </Snackbar>
                <Snackbar open={on} autoHideDuration={3000} onClose={handleCloseOn}>
                  <Alert onClose={handleCloseOn} severity="error" sx={{ width: '100%' }}>
                    Course is already Purchased
                  </Alert>
                </Snackbar>
            </CardContent>
                </Card>
            </>
  )
}

export default Course;