import "./CourseList.css";
import Course from "./Course";

const CourseList = ({ courses, selected, unselectables, toggleSelected }) => (
  <div className="card-grid">
    {courses.map((course) => (
      <Course
        id={course.id}
        course={course}
        selected={selected}
        unselectables={unselectables}
        toggleSelected={toggleSelected}
      />
    ))}
  </div>
);

export default CourseList;
