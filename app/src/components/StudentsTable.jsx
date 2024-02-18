import { capitalizeFirstChar } from "../utilis";

export default function StudentsTable({ children, students = [] }) {
  return (
    <div className="container my-5 table-responsive">
      {children}
      {students.length > 0 && (
        <table className="table table-dark table-hover table-bordered caption-top">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">CMS ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">Email</th>
              <th scope="col">Program</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {students.map((student, index) => {
              return (
                <tr key={student.cmsID}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.cmsID}</td>
                  <td>{capitalizeFirstChar(student.firstName)}</td>
                  <td>{capitalizeFirstChar(student.lastName)}</td>
                  <td>{capitalizeFirstChar(student.gender)}</td>
                  <td>{capitalizeFirstChar(student.address)}</td>
                  <td>{capitalizeFirstChar(student.city)}</td>
                  <td>{student.email}</td>
                  <td>{capitalizeFirstChar(student.program)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
