import { AiOutlineLoading } from "react-icons/ai";
import "./loading.css";

const LoadingPage = ({ className = "" }) => {
  return (
    <div
      className={`w-full min-h-[50vh] max-h-[80vh] bg-transparent h-full flex justify-center items-center ${className}`}
    >
      <AiOutlineLoading className="spinner w-14 h-14 text-gray-600" />
    </div>
  );
};

export default LoadingPage;
