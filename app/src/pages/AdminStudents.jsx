import { useEffect, useState } from "react";
import StudentsTable from "../components/StudentsTable";
import { useAuth } from "../contexts/auth";
import Loader from "../components/Loader";
export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchDataFromAPI } = useAuth();

  useEffect(() => {
    let ignore = false;
    const fetchStudents = async () => {
      try {
        const students = await fetchDataFromAPI(
          "/api/students"
        );
        if (!ignore) {
          setStudents(students);
        }
      } catch (error) {
        // console.log(error);
      }
      finally{
        setIsLoading(false);
      }
    };
    fetchStudents();
    return () => (ignore = true);
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <StudentsTable students={students}>
        <h1 className="fs-1 fw-bolder text-dark text-center">
          List of Students
        </h1>
      </StudentsTable>
    </>
  );
}
