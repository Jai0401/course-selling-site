import React, { useEffect, useState } from 'react'
import Appbar from '../Appbar'
import { Card, CardContent, CardMedia, Typography,Accordion} from '@mui/material'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import axios from 'axios'
import '../style/style.css'
import { useParams } from 'react-router-dom'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const EachCourse = () => {
 const courseJson = [
  {
    "week": 1,
    "description": "Introduction to the Course, Overview, and Expectations\n\nIn the first week, we'll kick off the course with an introduction to the subject, the course structure, and the learning outcomes. You'll get to know the instructor and your fellow classmates. We'll discuss the syllabus, grading criteria, and the resources available for your learning journey. By the end of this week, you'll have a clear understanding of what to expect from the course and how to make the most of it."
  },
  {
    "week": 2,
    "description": "Fundamentals of the Subject\n\nIn this week, we'll dive into the core concepts and fundamentals of the subject. You'll learn about the key principles, theories, and historical context that form the foundation of this field. We'll explore the essential terminology and basic frameworks that will be crucial for your understanding of the subject throughout the course. By the end of this week, you'll have a solid grasp of the fundamental concepts and be ready to delve deeper into more complex topics."
  },
  {
    "week": 3,
    "description": "Hands-on Lab: Practical Application of Concepts\n\nThis week is all about putting theory into practice. You'll participate in hands-on lab sessions where you'll work with real-world datasets and apply the concepts you've learned. The practical exercises will help reinforce your understanding and build essential skills for the subject. You'll also get a chance to work collaboratively with your peers, enhancing your problem-solving and teamwork abilities."
  },
  {
    "week": 4,
    "description": "Guest Lecture: Industry Insights and Real-World Examples\n\nIn this exciting week, we'll have a guest speaker from the industry who will share their insights and experiences related to the subject. You'll gain valuable perspectives on how the concepts we've covered apply in real-world scenarios. The guest lecture will also provide you with an opportunity to ask questions and gain practical advice for your future endeavors in this field."
  },
  {
    "week": 5,
    "description": "Group Project Kickoff and Team Formation\n\nIt's time to embark on a group project that will span several weeks. In this week, we'll form project teams and assign the topics. You'll work closely with your team members to define the project scope, objectives, and deliverables. Effective communication and collaboration will be key during this phase as you start working on your project plans."
  },
  {
    "week": 6,
    "description": "Midterm Exam\n\nThis week will focus on evaluating your understanding of the course material so far. You'll take a comprehensive midterm exam that covers the topics discussed in the initial weeks. The exam will help you assess your progress and identify areas for improvement. Don't worry; we'll provide guidance and review sessions to ensure you're well-prepared for the assessment."
  },
  {
    "week": 7,
    "description": "In-depth Study: Advanced Topics and Case Studies\n\nAs we move into the second half of the course, we'll delve into more advanced topics and case studies. We'll explore cutting-edge research, industry trends, and real-life applications of the subject. This week will challenge you to think critically and analytically as we tackle complex issues and explore innovative solutions."
  },
  {
    "week": 8,
    "description": "Group Project Progress Presentation\n\nIn this week, each group will present their project's progress to the class. You'll have the opportunity to showcase your team's achievements, discuss challenges faced, and receive valuable feedback from both the instructor and your peers. This presentation will be a significant milestone in your project's development and will help you refine your approach for the final stages."
  },
  {
    "week": 9,
    "description": "Workshop: Developing Practical Skills\n\nThis week will be dedicated to a practical workshop where you'll learn essential skills relevant to the subject. The workshop may include hands-on exercises, simulations, or external speakers who can provide insights into the practical aspects of the subject. You'll come away with valuable skills that can be directly applied in your professional or academic pursuits."
  },
  {
    "week": 10,
    "description": "Final Project Implementation and Testing\n\nWith the group project nearing completion, this week will be focused on the implementation and testing phase. You'll work diligently with your team to finalize the project and ensure it meets the intended objectives. Rigorous testing and validation will be essential to deliver a successful and well-executed final project."
  },
  {
    "week": 11,
    "description": "Final Project Presentation and Evaluation\n\nThe culmination of your hard work throughout the course will be the final project presentation. Each group will present their completed project to the class, showcasing their achievements and demonstrating the outcomes. You'll receive constructive feedback from your peers and the instructor. This presentation will not only assess your project but also improve your presentation and communication skills."
  },
  {
    "week": 12,
    "description": "Course Review and Wrap-up\n\nIn the final week, we'll review the key concepts covered throughout the course. We'll also reflect on your learning journey, discussing the progress you've made and the knowledge you've gained. This week will be an opportunity to ask any remaining questions and engage in open discussions about the subject. We'll conclude the course with a wrap-up, celebrating your accomplishments and looking forward to your future pursuits in the field."
  }
]


  const [course,setCourse] = useState([]);
  const {id} = useParams();
  useEffect(()=>{
    window.scrollTo({top:0,left:0,behavior:"smooth"});
    const token = JSON.parse(localStorage.getItem('token'));
  axios.get(`https://coursify.onrender.com/users/courses/${id}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((res)=>{
    setCourse(res.data)
  }).catch((err)=>{
    console.log(err);
  })
  },[]);
  
  const descText = "This course is a crucial stepping stone towards achieving your goals. By delving deep into the subject matter, mastering essential skills, and gaining hands-on experience, you'll develop the expertise needed to excel in your chosen field. Additionally, the course offers valuable networking opportunities and access to industry professionals, enhancing your chances of securing relevant opportunities. Ultimately, completing this course will significantly bolster your knowledge, confidence, and overall competence, bringing you a significant step closer to realizing your aspirations."
  return (
    <>
      <Appbar isLoggedIn={true} username={JSON.parse(localStorage.getItem('user'))}></Appbar>
      <div>
      <Card style={{width:"80%",margin:"auto",marginTop:"3%"}}>
      <CardContent>
        <Typography color='primary' sx={{fontFamily:"Poppins,sans-serif",fontWeight:"600"}} align='center' variant='h3'>{course.title}</Typography>
        <div style={{marginTop:"6%",display:'flex',flexDirection:"column-reverse",alignItems:"center",justifyContent:"space-between",width:'80%',margin:"auto"}}>
          <Typography  sx={{fontFamily:"Poppins,sans-serif",marginTop:"2%"}} align='center' variant='h6'>{course.description}</Typography>
          <img className='imageEachCourse' style={{maxWidth:"50%",marginTop:"5%"}} src={course.imageLink} alt=""></img>
        </div>
        <Typography align='center' variant='h6' style={{margin:"2%",textAlign:"center",marginTop:"5%"}}>{descText}</Typography>
        <div style={{width:'80%',margin:"auto",marginTop:"4%"}}>
        <Typography style={{fontWeight:"600",fontFamily:"Poppins,sans-serif"}} align='left' variant='h6'>Course Overview</Typography>
        </div>
        <div style={{width:'80%',margin:'auto',marginTop:"2%"}} >
        {
            courseJson.map(e => {
              return(
          <Accordion>
        <AccordionSummary
          expandIcon={<FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{fontFamily:"Poppins,sans-serif",fontWeight:"400"}} variant='h6'>Week {e.week}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='standard' sx={{fontFamily:"Poppins,sans-serif"}}>
            {e.description}
          </Typography>
        </AccordionDetails>
      </Accordion>  
              )
            })
        }
      </div>
        </CardContent>
        </Card>
      </div>
    </>
  )
}

export default EachCourse