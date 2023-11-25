import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { Input } from "../common/Input";
import { FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AttributeForm = () => {
  const notify = (arg) => toast(`${arg}`);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [varientName, setVarientName] = useState("");
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [arr]);

  const varientSubmitHandler = (e) => {
    e.preventDefault();

    if (varientName.trim() !== "") {
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
      } else {
        notify("Attribute value already exists");
        return;
      }
    }

    if (title.trim() !== "" && arr.length !== 0) {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/addVarient`;
      const headers = {
        "Content-Type": "application/json", // You may need to include other headers based on the API requirements
      };
      setLoading(true);
      axios
        .post(
          url,
          {
            varientName: title.trim(),
            value: arr,
          },
          {
            headers,
            withCredentials: true,
          }
        )
        .then((res) => {
          setArr([]);
          setTitle("");
          setLoading(false);
          notify("Attribute added successfully");
          history.push("/attributes");
        })
        .catch((err) => {
          setLoading(false);
          notify(err.response.data.message);
        });
    } else {
      notify("Please fill all the fields");
    }
  };

  function deleteAttribute(k) {
    setArr(
      arr.filter((item, key) => {
        return key !== k;
      })
    );
  }

  function addAttribute() {
    if (varientName.trim() !== "") {
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
      } else {
        notify("Attribute value already exists");
      }
    }
  }

  function updateAttributeValue(e, key) {
    let newArr = [...arr];
    newArr[key] = e.target.value;
    setArr(newArr);
  }

  return (
    <div className="w-full max-h-[89vh] h-full overflow-y-auto p-5">
      <main className="w-full h-full flex flex-col gap-9 p-5 pb-12 bg-white rounded-md max-w-4xl">
        <h2 className="text-xl font-semibold w-full border-b-2 border-gray-300 pb-3">
          Create New Attribute
        </h2>

        <form className="flex flex-col gap-6" onSubmit={varientSubmitHandler}>
          <div className="max-w-lg">
            <Input
              input_type={"text"}
              placeholder={"Attribute name"}
              value={title}
              setValue={setTitle}
            />
          </div>

          <h3>Attribute Values</h3>
          <div className="flex gap-3 flex-wrap">
            {arr.map((items, key) => {
              return (
                <div className="flex gap-3 border-[1px] border-gray-500 focus-within:border-black rounded-md overflow-hidden pl-3">
                  <input
                    key={key}
                    type="text"
                    value={items}
                    className="border-none w-32 outline-none"
                    onChange={(e) => updateAttributeValue(e, key)}
                    placeholder="value"
                  />
                  <button
                    type="button"
                    className="text-red-600 bg-red-100 hover:bg-red-200 p-2 aspect-square rounded-sm"
                    onClick={() => deleteAttribute(key)}
                  >
                    <AiOutlineDelete />
                  </button>
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

            <button
              onClick={() => addAttribute()}
              type="button"
              className="flex gap-3 font-semibold h-9 items-center justify-center border-[1px] border-sky-600 py-2 px-4 rounded-md bg-sky-50 hover:bg-sky-200 text-sky-600"
            >
              Add <FaPlus />
            </button>
          </div>

          <button
            type="submit"
            className={`rounded-md ml-auto border-[1px] border-sky-500 px-6 py-2 text-lg font-semibold hover:bg-sky-500 hover:text-white ${
              loading ? "grayscale" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AttributeForm;

// (
//   <div className="w-full ">
//     <div className="w-[97%] mx-auto mt-5  min-h-[50px] bg-white  rounded-md flex flex-col     shadow-md ">
//       <h1 className="text-xl h-[50px] flex  items-center pl-3 font-semibold ">
//         Attribute Form
//       </h1>
//     </div>
//     <div className="w-[97%] mx-auto mt-1  min-h-[300px] bg-white  rounded-md flex flex-col    shadow-md ">
//       <form onSubmit={varientSubmitHandler}>
//         <Input
//           input_type={"text"}
//           placeholder={"Attribute name"}
//           value={title}
//           setValue={setTitle}
//         />
//         <div className="w-[95%] flex flex-col mx-auto mt-6 ">
//           <label htmlFor="" className="mb-4 text-lg text-gray-400">
//             Attribute values
//           </label>
//           <div className="w-full h-[60px] flex flex-row items-center overflow-x-scroll ">
//             {arr.map((items, key) => {
//               return (
//                 <div className="flex mr-3 ">
//                   <input
//                     key={key}
//                     type="text"
//                     value={items}
//                     className=" min-w-[40px] h-[35px] rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 mr-1 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
//                     placeholder="value"
//                   />
//                   <span
//                     key={key}
//                     onClick={() => deleteAttribute(key)}
//                     className="flex items-center bg-slate-100 active:bg-slate-300  rounded-md w-[30px] h-[35px] "
//                   >
//                     {<AiOutlineDelete size={28} />}
//                   </span>
//                 </div>
//               );
//             })}
//             <input
//               value={varientName}
//               onChange={(e) => setVarientName(e.target.value)}
//               type="text"
//               className=" min-w-[60px] h-[35px] rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
//               placeholder="value"
//             />
//           </div>
//           <div
//             onClick={() => addAttribute()}
//             className="w-[180px] h-[50px] bg-[#bde0fe] text-[#023e8a] flex items-center justify-center  rounded-md my-3 font-semibold cursor-pointer"
//           >
//             Add attribute value
//           </div>
//           <div className="w-full h-[60px] flex items-center justify-end  ">
//             <button
//               type="submit"
//               className="w-[150px] h-[45px] bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer "
//             >
//               Save & edit
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   </div>
// )
