import './Course.css';
import { Link } from 'react-router-dom';

const Course = ({ id, course, selected, unselectables, toggleSelected }) => {
  const isSelected = selected.includes(id);
  const isUnselectable = unselectables.includes(id);

  const selectableOrNot = `card-body ${
    isSelected ? 'selected' : isUnselectable ? 'unselectable' : ''
  }`;

//   if (unselectables.includes(id)) {
//     console.log("YES YES YES!");
//   }
  return (
    <div className="course card m-1 p-2" onClick={() => toggleSelected(id)}>
      <Link to={`/courses/${id}/edit`}>
        <i className="bi bi-asterisk"></i>
      </Link>
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
