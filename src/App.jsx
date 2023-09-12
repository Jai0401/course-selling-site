import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import EditCourse from './components/EditCourse';
import NoPage from './components/NoPage';
import GetCourses from './components/user/GetCourses';
import ShowCourse from './components/user/ShowCourse';
import EachCourse from './components/user/EachCourse';
// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <>
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/createCourse" element={<CreateCourse />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/courses/:id" element={<EditCourse />} />
                <Route path='/user/courses' element={<GetCourses/>} />
                <Route path='/user/purchasedcourses' element={<ShowCourse />} />
                <Route path="/user/courses/:id" element={<EachCourse />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
        </>
    );
}

export default App;