import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addVarient, clearState } from "../../Redux/slices/VarientSlice";

const AttributeForm = () => {
  const [title, setTitle] = useState("");
  const { message, type } = useSelector((state) => state.varients);
  const [varientName, setVarientName] = useState("");
  const [arr, setArr] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {}, [arr]);

  const varientSubmitHandler = (e) => {
    e.preventDefault();

    if (title !== "" && arr.length !== 0) {
      dispatch(
        addVarient({
          varientName: title,
          value: arr,
        })
      );
      setArr([]);
      setTitle("");
    }
  };

  useEffect(() => {
    const notify = (arg) => toast(`${arg}`);
    if (message && type) {
      if (type === "success") {
        notify(message);
        dispatch(clearState());
      } else {
        notify(message);
        dispatch(clearState());
      }
    }
  }, [dispatch, type, message]);

  function deleteAttribute(k) {
    setArr(
      arr.filter((item, key) => {
        return key !== k;
      })
    );
  }

  function addAttribute() {
    if (varientName !== "") {
      var noDuplicate = false;
      arr.forEach((i) => {
        if (i === varientName.trim().toLowerCase()) {
          noDuplicate = true;
        }
      });
      if (noDuplicate === false) {
        arr.push(varientName.trim().toLowerCase());
        setArr(arr);
        setVarientName("");
      }
    }
  }
  return (
    <div>
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] ">
        <Sidebar />
        <div className="w-full ">
          <div className="w-[97%] mx-auto mt-5  min-h-[50px] bg-white  rounded-md flex flex-col     shadow-md ">
            <h1 className="text-xl h-[50px] flex  items-center pl-3 font-semibold ">
              Attribute Form
            </h1>
          </div>
          <div className="w-[97%] mx-auto mt-1  min-h-[300px] bg-white  rounded-md flex flex-col    shadow-md ">
            <form onSubmit={varientSubmitHandler}>
              <div className="flex flex-col w-[95%] h-full mx-auto mt-6 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
                  Title
                </label>
                <input
                  value={title}
                  type="text"
                  onChange={(e) =>
                    setTitle(e.target.value.trim().toLowerCase())
                  }
                  className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                  placeholder="Title"
                />
              </div>
              <div className="w-[95%] mx-auto h-[80px] sm:h-[40px] lg:h-[40px] px-5 mt-3 rounded-md flex items-center bg-[#bde0fe]  ">
                To delete an attribute value , press delete button
              </div>
              <div className="w-[95%] flex flex-col mx-auto mt-6 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400">
                  Attribute values
                </label>
                <div className="w-full h-[60px] flex flex-row items-center overflow-x-scroll ">
                  {arr.map((items, key) => {
                    return (
                      <div className="flex mr-3 ">
                        <input
                          key={key}
                          type="text"
                          value={items}
                          className=" min-w-[40px] h-[35px] rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 mr-1 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
                          placeholder="value"
                        />
                        <span
                          key={key}
                          onClick={() => deleteAttribute(key)}
                          className="flex items-center bg-slate-100 active:bg-slate-300  rounded-md w-[30px] h-[35px] "
                        >
                          {<AiOutlineDelete size={28} />}
                        </span>
                      </div>
                    );
                  })}
                  <input
                    value={varientName}
                    onChange={(e) => setVarientName(e.target.value)}
                    type="text"
                    className=" min-w-[60px] h-[35px] rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
                    placeholder="value"
                  />
                </div>
                <div
                  onClick={() => addAttribute()}
                  className="w-[180px] h-[50px] bg-[#bde0fe] text-[#023e8a] flex items-center justify-center  rounded-md my-3 font-semibold cursor-pointer"
                >
                  Add attribute value
                </div>
                <div className="w-full h-[60px] flex items-center justify-end  ">
                  <button
                    type="submit"
                    className="w-[150px] h-[45px] bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer "
                  >
                    Save & edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributeForm;
