import { useState } from "react";
import './Course.css';

const Course = ({id, course, selected, toggleSelected}) => (
    <div className="course card m-1 p-2" onClick={() => toggleSelected(id)}>
        <div className={`card-body ${selected.includes(id) ? 'selected' : ''}`}>
            <h5 className="card-title"> {course.term} CS {course.number} </h5>
            <p className="card-text">{course.title}</p>
        </div>
        <div className="card-footer bg-transparent">{course.meets}</div>
        
    </div>
);

export default Course;