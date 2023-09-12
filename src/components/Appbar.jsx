import React from 'react';
import { AppBar, ButtonGroup, Typography, Button,Link} from '@mui/material';
import {  useNavigate } from 'react-router-dom';

function Appbar({isLoggedIn,username}){
  const navigate = useNavigate();
  function handleClick(e){
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    navigate('/login');
  }
  return (
  <AppBar  position='sticky' color='default' style={{height:"12vh",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
        <Link underline='none' style={{marginLeft:"10%",fontWeight:"600",fontSize:"2em"}} onClick={(e)=>{navigate('/')}} href='#'>
        Coursify
        </Link>
        <div style={{marginRight:"10%",display:"flex"}} >
        {isLoggedIn ? (
        <div style={{display:"flex",alignItems:"center",gap:"1%"}}>
        <Typography>Welcome, {username}!</Typography>
        <Button variant='contained' onClick={handleClick}>Logout</Button>
        </div>
      ) : (
        <>
        <Button variant='contained' style={{margin:"2%"}} onClick={() =>{navigate('/register')}}>Signup</Button>
        <Button variant='contained' style={{margin:"2%"}}  onClick={() =>{navigate('/login')}}>Login</Button>
        </>
      )}
        </div>
        </AppBar>
  )
}

export default Appbar;