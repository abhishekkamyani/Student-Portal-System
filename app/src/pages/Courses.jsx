import { useState, useEffect } from "react";
import Course from "../components/Course";
import axios from "axios";
import { useAuth } from "../contexts/auth";
import Loader from "../components/Loader";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData, fetchDataFromAPI } = useAuth();

  useEffect(() => {
    let isReturn = false;
    const fetchCourses = async () => {
      try {
        const courses = await fetchDataFromAPI(
          `/api/students/courses/${userData.cmsID}`
        );
        if (!isReturn && courses) {
          setCourses(courses);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    if (!isReturn) {
      fetchCourses();
    }
    return () => (isReturn = true);
  }, [userData.cmsID]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <main className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-5 gx-0 py-3 px-5">      
      {courses.map((course) => {
        return <Course {...course} key={course.courseID} />;
      })}
    </main>
  );
}
