import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function NoPage(){
  const navigate = useNavigate();
  return <div style={{width:"100vw",height:"100vh",position:"relative"}} >
    <h1 style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>Error 404 Page not found</h1>
    <Button style={{position:"absolute",top:"55%",left:"50%"}} variant='contained' onClick={()=>{navigate('/login')}} >Home</Button>
  </div>
}

export default NoPage;