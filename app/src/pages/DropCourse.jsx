import { useEffect, useRef, useState } from "react";
import CourseList from "../components/CourseList";
import { useAuth } from "../contexts/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

export default function DropCourse() {
  const [courses, setCourses] = useState([]);
  const originalData = useRef([]);
  const { userData, fetchDataFromAPI, postDataToAPI } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const dropCourse = async (courseID) => {
    toast.dismiss(); // if already in progress but user clicked twice or more times
    try {
      const res = await toast.promise(
        postDataToAPI(`/api/courses/drop`, {
          cmsID: userData.cmsID,
          courseID,
        }),
        {
          pending: "Course withdrawal in progress",
          error:
            "An error has occurred. Please try again after a brief interval",
        }
      );
      if (res.status === 200) {
        toast.success("Course withdrawn successfully", {
          hideProgressBar: true,
        });
        setCourses(courses.filter((course) => course.courseID !== courseID));
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    let isReturn = false;
    const fetchCourses = async () => {
      try {
        const courses = await fetchDataFromAPI(
          `/api/students/courses/${userData.cmsID}`
        );
        if (!isReturn) {
          originalData.current = courses;
          setCourses(courses);
        }
      } catch (error) {
        // console.log(error);
      }
      setIsLoading(false);
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
    <div className="container min-vh-100 bg-secondary my-5 py-4 rounded px-5">
      <CourseList
        heading={"Remove your courses"}
        courses={courses}
        setCourses={setCourses}
        originalData={originalData.current}
        action={"remove"}
        handleAction={dropCourse}
      />
    </div>
  );
}
