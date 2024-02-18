import { useRef, useState } from "react";
import StudentsTable from "../components/StudentsTable";
import { useAuth } from "../contexts/auth";
import { toast } from "react-toastify";
import { capitalizeFirstChar } from "../utilis";

export default function AdminSpecificCourse() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const courseName = useRef("");
  const { fetchDataFromAPI } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      toast.dismiss();
      setStudents([]);
      courseName.current = '';
      const course = await toast.promise(
        fetchDataFromAPI(`/api/courses/${search}`),
        { pending: "Searching please wait...", error: "Try again please" }
      );

      const students = course.students;

      if (students.length) {
        toast.success("Students found");
        courseName.current = course.name
          .split(" ")
          .map((char) => capitalizeFirstChar(char))
          .join(" ");
        return setStudents(students);
      }

      toast.dismiss();
      toast.error(`No students found with provided course id ${search}`);
    } catch (error) {
      toast.dismiss();
      toast.error(`No Course found with "${search}"`);
    }
  };

  return (
    <>
      <StudentsTable students={students}>
        <h2 className="fw-bolder text-dark text-center">
          Please provide the Course ID to view enrolled students
        </h2>
        <form
          className="d-flex w-50 w-auto mx-auto my-3 px-5"
          role="search"
          onSubmit={handleSearch}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="e.g CSE101"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value.toUpperCase())}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
        <h4 className="text-center mt-4 fw-bold">
          {courseName.current ? `Course: ${courseName.current}` : ""}
        </h4>
      </StudentsTable>
    </>
  );
}
