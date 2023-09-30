import './CourseList.css'

const CourseList = ({courses}) => (
    <div className="card-grid">
        { Object.entries(courses).map(([id, course]) => 
            <div className="card m-1 p-2" key={id}> 
                <div className="card-body">
                    <h5 className="card-title">{course.term} CS {course.number}</h5>
                    <p className="card-text">{course.title}</p>
                </div>
                <div class="card-footer bg-transparent">{course.meets}</div>
            </div>
        ) }
    </div>
    
);
  
export default CourseList;