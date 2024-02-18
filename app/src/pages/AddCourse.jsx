import { useEffect, useRef, useState } from "react";
import CourseList from "../components/CourseList";
import { useAuth } from "../contexts/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
export default function AddCourse() {
  const [isLoading, setIsLoading] = useState("true");
  const [courses, setCourses] = useState([]);
  const originalDataCourses = useRef([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const originalDataEnrolledCourses = useRef([]);

  const { userData, fetchDataFromAPI, postDataToAPI } = useAuth();

  const enrollCourse = async (courseID) => {
    try {
      const res = await toast.promise(
        postDataToAPI(`/api/courses/enroll`, {
          cmsID: userData.cmsID,
          courseID,
        }),
        {
          pending: "Enrolling Course",
          error: "Try Again",
        }
      );
      toast.dismiss();
      toast.success("Enrolled Successfully", {hideProgressBar: true});

      const enrolled = courses.find((course) => course.courseID === courseID);
      setCourses(courses.filter((course) => course.courseID !== courseID));

      if (enrolledCourses) {
        setEnrolledCourses([...enrolledCourses, enrolled]);
      } else {
        setEnrolledCourses([enrolled]);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    let isReturn = false;

    const fetchCourses = async () => {
      try {
        const enrolledCourses = await fetchDataFromAPI(
          `/api/students/courses/${userData.cmsID}`
        );
        let courses = await fetchDataFromAPI(
          "/api/courses"
        );

        if (!isReturn) {
          originalDataEnrolledCourses.current = enrolledCourses;
          setEnrolledCourses(enrolledCourses);

          if (enrolledCourses && courses) {
            courses = courses.filter(
              (course) =>
                !enrolledCourses.find(
                  (enrolledCourse) =>
                    enrolledCourse.courseID === course.courseID
                )
            );
          }

          originalDataCourses.current = courses;
          setCourses(courses);
        }
      } catch (error) {
        // console.log(error);
      }
      setIsLoading(false);
    };

    fetchCourses();

    return () => (isReturn = true);
  }, [userData.cmsID]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 my-5 gx-5 gy-5 flex-wrap-reverse bg-secondary rounded">
        <CourseList
          courses={enrolledCourses}
          setCourses={setEnrolledCourses}
          originalData={originalDataEnrolledCourses.current}
          heading={"Enrolled courses"}
        />
        <CourseList
          courses={courses}
          setCourses={setCourses}
          originalData={originalDataCourses.current}
          heading={"You can add these courses"}
          action={"add"}
          handleAction={enrollCourse}
        />
      </div>
    </div>
  );
}
