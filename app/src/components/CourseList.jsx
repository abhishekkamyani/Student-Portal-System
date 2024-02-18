import { FaBookOpen } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import Search from "./Search";

export default function CourseList({
  courses = [],
  originalData = [],
  setCourses,
  heading,
  action = "",
  handleAction,
}) { 
  return (
    <>
      <div className="">
        <h2>{heading}</h2>
        <Search data={originalData} setData={setCourses} />
        <div className="list-group pb-5">
          {courses.map((course) => {
            return (
              <CourseListItems
                courseID={course.courseID}
                name={course.name}
                action={action}
                handleAction={handleAction}
                key={course.courseID}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function CourseListItems({ courseID, name, action, handleAction }) {
  return (
    <div className="list-group-item list-group-item-action d-flex gap-3 py-3  bg-secondary text-light">
      <FaBookOpen className="fs-2" />

      <div className="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 className="mb-0 fw-bolder">{courseID}</h6>
          <p className="mb-0 opacity-75 float-start">{name}</p>
        </div>
        {action && (
          <button type="button" className="btn btn-secondary" onClick={() => handleAction(courseID)}>
            {action == "add" ? <IoMdAdd /> : <FaXmark />}
          </button>
        )}
      </div>
    </div>
  );
}
