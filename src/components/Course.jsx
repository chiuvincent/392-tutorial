import "./Course.css";
import { Link } from "react-router-dom";
import { useAuthState } from "../utilities/firebase";

const Course = ({ id, course, selected, unselectables, toggleSelected }) => {
  const isSelected = selected.includes(id);
  const isUnselectable = unselectables.includes(id);

  const selectableOrNot = `card-body ${
    isSelected ? "selected" : isUnselectable ? "unselectable" : ""
  }`;

  const [user] = useAuthState();

  return (
    <div className="course card m-1 p-2" onClick={() => toggleSelected(id)}>
      {user !== null ? (
        <Link to={`/courses/${id}/edit`}>
          <i className="bi bi-asterisk"></i>
        </Link>
      ) : null}
      <div className={selectableOrNot}>
        <h5 className="card-title">
          {course.term} CS {course.number}
        </h5>
        <p className="card-text">{course.title}</p>
      </div>
      <div className="card-footer bg-transparent">{course.meets}</div>
    </div>
  );
};

export default Course;
