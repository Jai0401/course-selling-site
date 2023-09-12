import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Appbar from '../Appbar';
import { Typography,Button,Card,CardContent,CardMedia, Snackbar, Alert, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning,faCartShopping} from '@fortawesome/free-solid-svg-icons';
import Course from './Course';
import { useNavigate } from 'react-router-dom';
import '../style/style.css'

const GetCourses = () => {
  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState(true);
  const [purCourses,setPurCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    setLoading(true);
    const token = JSON.parse(localStorage.getItem('token'));
    axios.get("https://coursify.onrender.com/users/courses",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      setCourses(res.data.courses);
      setPurCourses(res.data.purchasedCourses);
      console.log(res.data);
      console.log(purCourses);
      setLoading(false);
    }).catch((err)=>{
      console.log(err);
    })
  },[])


  return (
    <>
    <Appbar isLoggedIn={true} username={JSON.parse(localStorage.getItem('user'))}></Appbar>
      {loading ? <CircularProgress style={{position:"absolute",top:"50%",left:"50%"}}></CircularProgress> : <><div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography color="primary" variant="h3" style={{textAlign:"center",marginTop:"3%",marginBottom:"3%",fontWeight:"600"}}>Courses</Typography>
        <Button variant='contained' onClick={()=>{navigate('/user/purchasedcourses')}}>Your Courses</Button>
        </div>
        <div className='userCoursesDiv' style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",width:"80%",margin:"auto",gridGap:"8%",marginTop:"3%"}}>
        {courses.map(c => <Course title={c.title} description={c.description} price={c.price} imgLink={c.imageLink} key={c._id} id={c._id} isPurchased={purCourses.includes(c._id) ? true : false} />)}
        </div></>}
        
    </>
  )
}

export default GetCourses