import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { Input } from "../common/Input";
import TextArea from "../common/Textarea";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MAX_SIZE = 5 * 1024 * 1024;

const CategoryForm = () => {
  const notify = (arg) => toast(`${arg}`);
  const history = useHistory();

  const [Title, setTitle] = useState("");
  const [Meta_Title, setMeta_Title] = useState("");
  const [Meta_Description, setMeta_Description] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageNameArray = file.name.split(".");
    const extension = imageNameArray.pop();
    const name = imageNameArray.join("");
    const date = Date.now().toString();
    const imageName = name.concat(date).concat(".").concat(extension);

    if (file.size > MAX_SIZE) {
      console.log(file.size);
      alert("file size exceeded");
      return;
      // NOTE: state set ker joh prevent karega user ko upload karne se
    }

    // Check if file type is other than png or jpg
    if (extension !== "png" && extension !== "jpg" && extension !== "jpeg") {
      alert(
        "Invalid file type. Please upload a file of type png or jpg or jpeg."
      );
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      console.log(base64Image.length);
      setBase64Image(base64String);
      setImageName(imageName);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const deleteFile = () => {
    setImageName("");
    setBase64Image("");
  };

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    if (
      Title.trim() !== "" &&
      Meta_Description.trim() !== "" &&
      Meta_Title.trim() !== "" &&
      imageName.trim() !== "" &&
      base64Image.trim() !== ""
    ) {
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/addCategory`;
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(
          url,
          {
            Title,
            Meta_Title,
            Meta_Description,
            Image: base64Image,
            imageName,
          },
          {
            headers,
            withCredentials: true,
          }
        )
        .then((res) => {
          setLoading(false);
          notify(res.data.message);
          setTitle("");
          setMeta_Title("");
          setMeta_Description("");
          setBase64Image("");
          setImageName("");
          history.push("/categories");
        })
        .catch((err) => {
          setLoading(false);
          notify(err.response.data.message);
        });
    } else {
      notify("Please fill all the fields");
    }
  };

  return (
    <div className="w-full max-h-[89vh] min-h-[89vh] h-full overflow-y-auto p-5">
      <main className="p-5 bg-white max-w-4xl rounded-md flex flex-col gap-6">
        <h2 className="text-xl font-semibold w-full border-b-2 border-gray-300 pb-3">
          Create New Category
        </h2>
        <form
          onSubmit={createCategorySubmitHandler}
          className="flex gap-9 max-md:flex-col"
        >
          {base64Image && imageName ? (
            <div className="md:aspect-[2/3] aspect-[3/2] md:max-w-xs w-full h-full flex flex-col gap-2">
              <img
                src={base64Image}
                className="w-full object-contain rounded-md"
                alt="upload_image"
              />
              <button
                type="button"
                onClick={deleteFile}
                className="max-w-md mx-auto w-full gap-3 hover:bg-red-200 h-10 flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 "
              >
                <span>Delete Category Image</span>
                <AiOutlineDelete className="text-[red] h-6 w-6" />
              </button>
            </div>
          ) : (
            <ReactDropZone handleFileChange={handleFileChange} />
          )}

          <div className="flex flex-col w-full gap-4">
            <Input
              input_type={"text"}
              placeholder={"Category Title"}
              value={Title}
              setValue={setTitle}
            />
            <Input
              input_type={"text"}
              placeholder={"Meta Title"}
              value={Meta_Title}
              setValue={setMeta_Title}
            />
            <TextArea
              placeholder={"Meta Description"}
              value={Meta_Description}
              setValue={setMeta_Description}
            />

            <button
              type="submit"
              className={`rounded-md mt-auto ml-auto border-[1px] border-sky-500 px-6 py-2 text-lg font-semibold hover:bg-sky-500 hover:text-white ${
                loading ? "grayscale" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export const ReactDropZone = ({ handleFileChange }) => {
  return (
    <div className="flex items-center md:max-w-xs h-full aspect-[3/2] md:aspect-[2/3] justify-center w-full cursor-pointer ">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 "
      >
        <div className="flex h-full flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX SIZE 1MB)
          </p>
        </div>
        <input
          id={"dropzone-file"}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default CategoryForm;
