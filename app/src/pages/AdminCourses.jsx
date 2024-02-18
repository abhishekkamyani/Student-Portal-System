import { useEffect, useRef, useState } from "react";
import CourseList from "../components/CourseList";
import { useAuth } from "../contexts/auth";
import Loader from "../components/Loader";
// import { courses } from "../courses";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const originalDataCourses = useRef([]);
  const { fetchDataFromAPI } = useAuth();
  const [isLoading, setIsLoading] = useState([]);
  useEffect(() => {
    let ignore = false;
    const fetchCourses = async () => {
      try {
        const courses = await fetchDataFromAPI(
          "/api/courses"
        );
        if (!ignore) {
          originalDataCourses.current = courses;
          setCourses(courses);
        }
      } catch (error) {
        // console.log(error);
      }
      finally{
        setIsLoading(false);
      }
    };
    fetchCourses();
    return () => (ignore = true);
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="container bg-secondary my-5 py-4 ml-5 rounded px-5">
      <CourseList
        heading={"All courses"}
        courses={courses}
        setCourses={setCourses}
        originalData={originalDataCourses.current}
      />
    </div>
  );
}
