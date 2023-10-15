import { useDbUpdate } from "../utilities/firebase";
import { useFormData } from "../utilities/useFormData";
import { useNavigate } from "react-router-dom";
import { convertTimeToInt } from "../utilities/conflict";

const legalMeetingTime = (input) => {
  // check for empty string
  if (input.length === 0) {
    return true;
  }
  // check for valid days
  const days = input.split(" ")[0];

  const validDays = /^(M|Tu|W|Th|F)+$/;
  if (!validDays.test(days)) {
    return false;
  }
  // check for valid times
  const time1 = input.split(" ")[1].split("-")[0];
  const time2 = input.split("-")[1];

  const validTimes = /^[0-9]{2}:[0-9]{2}$/;
  if (!(validTimes.test(time1) && validTimes.test(time2))) {
    return false;
  }

  const time1_int = convertTimeToInt(time1);
  const time2_int = convertTimeToInt(time2);
  if (time1_int >= time2_int) {
    return false;
  }

  return true;
};

const validateCourseData = (key, val) => {
  switch (key) {
    case "title":
      return val.length >= 2
        ? ""
        : "Course title must be at least two characters.";
    case "meets":
      return legalMeetingTime(val)
        ? ""
        : "Meeting time must be a legal meeting time.";
    default:
      return "";
  }
};

const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {text}
    </label>
    <input
      className="form-control"
      id={name}
      name={name}
      defaultValue={state.values?.[name]}
      onChange={change}
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({ message, disabled }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button
        type="button"
        className="btn btn-outline-dark me-2"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn btn-primary me-auto"
        disabled={disabled}
      >
        Submit
      </button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const CourseEditor = ({ id, course }) => {
  console.log(id);
  console.log(course);
  const [update, result] = useDbUpdate(`/courses/${id}`);
  const [state, change] = useFormData(validateCourseData, course);
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
    }
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className={state.errors ? "was-validated" : null}
    >
      <InputField name="title" text="Title" state={state} change={change} />
      <InputField name="meets" text="Meets" state={state} change={change} />
      <ButtonBar message={result?.message} />
    </form>
  );
};

export default CourseEditor;
