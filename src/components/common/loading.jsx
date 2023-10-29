import { AiOutlineLoading } from "react-icons/ai";
import "./loading.css";

const LoadingPage = () => {
  return (
    <div className="w-full min-h-[50vh] h-full flex justify-center items-center">
      <AiOutlineLoading className="spinner w-14 h-14 text-gray-600" />
    </div>
  );
};

export default LoadingPage;
