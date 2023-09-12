import React, { useEffect, useState } from 'react'
import Appbar from '../Appbar';
import axios from 'axios';
import '../style/style.css'
import { CircularProgress,Grid, Card, CardContent,Typography,CardMedia,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
const ShowCourse = () => {
  const [course,setCourse] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
    useEffect(()=>{
      setLoading(true);
      const token = JSON.parse(localStorage.getItem('token'));
      axios.get('https://coursify.onrender.com/users/purchasedCourses',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((res)=>{
        console.log(res);
        setLoading(false);
        setCourse(res.data.purchasedCourses);
      }).catch((err)=>{
        console.log(err);
      })
    },[])
  return (
    <>
    <Appbar isLoggedIn={true} username={JSON.parse(localStorage.getItem('user'))}></Appbar>
    {loading ? <CircularProgress style={{position:"absolute",top:'50%',left:"50%",transform:"translate(50%,50%)"}}></CircularProgress> :
    <div> 
      <Typography color='primary'  variant="h3" style={{fontFamily:"Poppins,sans-serif",textAlign:"center",margin:"3%",fontWeight:"800"}}>Your Courses</Typography>
      <div style={{width:"100%",textAlign:"center",marginTop:"2%",marginBottom:"2%"}}>
      <Button  startIcon={<FontAwesomeIcon icon={faShop}></FontAwesomeIcon>} variant="contained" onClick={()=>{
            navigate('/user/courses')
          }} >Go to store</Button>
          </div>
      <div className='getPurchasedDiv'  style={{display:"grid",gridTemplateColumns:"1fr 1fr",width:"70%",margin:"auto",gap:"9%",height:"fit-content"}}>
        {
          course.length == 0 ? <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,0)",display:"flex",flexDirection:"column",alignItems:"center"}} ><Typography color='primary' variant='h3'>No Courses Purchased</Typography></div> : course.map(data => 
          <CourseCard key={data._id} id={data._id} title={data.title} description={data.description} imgLink={data.imageLink} price={data.price}></CourseCard>)
        }
      </div>
      </div>
    }
    </>
  )

  function CourseCard(props){
    const navigate = useNavigate();
    return(
    <Grid>
         <Card className='getPurchasedCard' raised={true} style={{minHeight:"60vh"}}>
            <CardMedia  
            height={200}
            component="img"
                sx={{objectFit: "cover"}}
            image={props.imgLink} />
            <CardContent >
                <Typography gutterBottom1 sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}} variant="h5" align="center" style={{fontWeight:"600"}}>{props.title}</Typography>
                <Typography gutterBottom sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}}   variant="h6" align="center">{props.description}</Typography>
                <Button color='primary' variant='outlined' onClick={()=> {navigate(`/user/courses/${props.id}`)}} fullWidth>Learn</Button>
            </CardContent>
                </Card>
    
                </Grid>
    )
  }
}

export default ShowCourse;