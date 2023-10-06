import { useState } from "react";
import './CourseList.css';
import Course from './Course';

const CourseList = ({courses, selected, toggleSelected }) => (
// const CourseList = ({key, courses, selected, toggleSelected }) => (
    <div className="card-grid">
        {/* <div className="card-deck"> */}
        {
            courses.map(course => (
                <Course id={course.id} course={course} selected={selected} toggleSelected={toggleSelected} />
            ))
        }
        {/* </div> */}
        
        {/* { Object.entries(courses).map(([id, course]) => 
                <Course key={id} course={course} selected={selected} toggleSelected={toggleSelected} />
        ) } */}
    </div>
);
  
export default CourseList;