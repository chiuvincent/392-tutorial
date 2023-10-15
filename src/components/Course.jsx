import "./Course.css";
import { Link } from "react-router-dom";
import { useAuthState } from "../utilities/firebase";
import { useProfile } from "../utilities/profile";

const Course = ({ id, course, selected, unselectables, toggleSelected }) => {
  const isSelected = selected.includes(id);
  const isUnselectable = unselectables.includes(id);

  const selectableOrNot = `card-body ${
    isSelected ? "selected" : isUnselectable ? "unselectable" : ""
  }`;

  // const [user] = useAuthState();
  const [profile, profileLoading, profileError] = useProfile();

  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;
  // console.log(profile.user.uid);

  return (
    <div className="course card m-1 p-2" onClick={() => toggleSelected(id)}>
      {profile.user && profile.user.uid === "4pQsZH6AcXNW1rhVMqiRqLnTQwT2" && (
        <Link to={`/courses/${id}/edit`}>
          <i className="bi bi-asterisk"></i>
        </Link>
      )}
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
