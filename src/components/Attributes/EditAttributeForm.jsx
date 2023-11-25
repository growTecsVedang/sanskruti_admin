import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { clearState, updateVarient } from "../../Redux/slices/VarientSlice";
import axios from "axios";
import LoadingPage from "../common/loading";
import { Input } from "../common/Input";
import { FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const EditAttributeForm = (props) => {
  const notify = (arg) => toast(`${arg}`);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [varientName, setVarientName] = useState("");
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/user/getVarients/${props.match.params.id}`
      )
      .then((res) => {
        const responce = res.data.varient;
        setId(responce._id);
        setTitle(responce.varientName);
        setArr(responce.value);
        setLoading(false);
      })
      .catch((err) => {
        const response = err.response.data;
        notify(response.message);
        setLoading(false);
      });
  }, []);

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
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/updateVarient?id=${id}`;
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };
      axios
        .put(
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
          notify("Attribute updated successfully");
          history.push("/attributes");
        })
        .catch((err) => {
          setLoading(false);
          notify(err.response.data.message);
        });
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
        setArr([...arr, varientName.trim().toLowerCase()]);
        setVarientName("");
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
          Edit Attribute
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
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditAttributeForm;
