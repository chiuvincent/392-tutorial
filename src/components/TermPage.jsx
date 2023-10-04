import { useState } from "react";
import CourseSelect from './CourseSelect';

const terms = {
  Fall: "Fall",
  Winter: "Winter",
  Spring: "Spring"
};

const MenuButton = ({term, selection, setSelection}) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
    { term }
    </label>
  </div>
);

const TermSelector = ({selection, setSelection}) => (
  <div className="btn-group">
    { 
      Object.keys(terms).map(term => <MenuButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const Courses = ({selection, courses}) => (
  <div>
    {/* 1. Filter JSON to term we want 2. Pass filtered term into CourseList to be displayed */}
    
    <CourseSelect courses={Object.values(courses).filter(course => course.term === terms[selection])} />
    {/* <CourseList courses={Object.values(courses).filter(course => course.term === terms[selection])} /> */}

  </div>
);

const TermPage = ({courses}) => {
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  return (
    <div>
      <TermSelector selection={selection} setSelection={setSelection} />
      <Courses selection={selection} courses={courses} />
    </div>
  );
}

export default TermPage;