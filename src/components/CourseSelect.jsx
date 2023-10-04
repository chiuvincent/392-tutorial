import { useState } from "react";
import CourseList from './CourseList';

const CourseSelect = ({courses}) => {
    const [selected, setSelected] = useState([]);
  
    const toggleSelected = (item) => setSelected(
        selected.includes(item)
        ? selected.filter(x => x !== item)
        : [...selected, item]
    );
  
    console.log(selected);
    return (
        // <CourseList courses={courses} />
        <CourseList courses={courses} selected={selected} toggleSelected={toggleSelected} />
    );
};
  
export default CourseSelect;