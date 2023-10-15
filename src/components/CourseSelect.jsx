import { useState } from "react";
import { outputUnselectables } from "../utilities/conflict";
import CourseList from "./CourseList";
import Modal from "./Modal";
import Cart from "./Cart";

const CourseSelect = ({ courses, biglist }) => {
  const [selected, setSelected] = useState([]);

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const unselectables = outputUnselectables(selected, biglist);

  const toggleSelected = (item) => {
    if (unselectables.includes(item)) {
      return;
    }

    setSelected((selected) => {
      if (selected.includes(item)) {
        return selected.filter((x) => x !== item);
      } else {
        return [...selected, item];
      }
    });
  };

  // console.log(unselectables);

  return (
    <div>
      <button className="btn btn-outline-dark" onClick={openModal}>
        <i className="bi bi-cart4"></i>
      </button>
      <Modal open={open} close={closeModal}>
        <Cart selected={selected} biglist={biglist} />
      </Modal>

      <CourseList
        courses={courses}
        selected={selected}
        unselectables={unselectables}
        toggleSelected={toggleSelected}
      />
    </div>
  );
};

export default CourseSelect;
