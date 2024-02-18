import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100">
      <ClipLoader color="#776BCC" size={200} />
    </div>
  );
}
