import { useState } from "react";
import CourseList from './CourseList';
import Modal from './Modal';
import Cart from "./Cart";

const CourseSelect = ({courses, biglist}) => {
    const [selected, setSelected] = useState([]);

    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
  
    const toggleSelected = (item) => setSelected(
        selected.includes(item)
        ? selected.filter(x => x !== item)
        : [...selected, item]
    );
    
    console.log(courses);
    console.log(selected);
    return (
        <div>
            <button className="btn btn-outline-dark" onClick={openModal}><i className="bi bi-cart4"></i></button>
            <Modal open={open} close={closeModal}>
                <Cart selected={selected} biglist={biglist}/>
            </Modal>
            <CourseList key={courses.id} courses={courses} selected={selected} toggleSelected={toggleSelected} />
            
        </div>
        
    );
};
  
export default CourseSelect;