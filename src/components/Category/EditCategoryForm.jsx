import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingPage from "../common/loading";
import { ReactDropZone } from "./CategoryForm";
import { Input } from "../common/Input";
import { useHistory } from "react-router-dom";
import TextArea from "../common/Textarea";
import { useSelector } from "react-redux";

const MAX_SIZE = 5 * 1024 * 1024;

const EditCategoryForm = (props) => {
  const notify = (arg) => toast(`${arg}`);
  const history = useHistory();

  const [id, setId] = useState("");
  const [Title, setTitle] = useState("");
  const [Meta_Title, setMeta_Title] = useState("");
  const [Meta_Description, setMeta_Description] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/user/categories/${props.match.params.id}`
      )
      .then((res) => {
        const responce = res.data.category;
        setId(responce._id);
        setTitle(responce.Title);
        setMeta_Title(responce.Meta_Title);
        setMeta_Description(responce.Meta_Description);
        setImage(responce.Image);
        setBase64Image(responce.Image);
        setLoading(false);
      })
      .catch((err) => {
        const response = err.response.data;
        notify(response.message);
        setLoading(false);
      });
  }, [props]);

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
      setBase64Image(base64String);
      setImageName(imageName);
    };
    console.log(base64Image);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const deleteFile = () => {
    if (image !== "") {
      const name = image.split(`${process.env.REACT_APP_ENDPOINT_CDN}/`)[1];
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/deleteCategoryImage?_id=${id}&name=${name}`;

      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };
      axios
        .delete(url, {
          headers,
          withCredentials: true,
        })
        .then((res) => {
          setImage("");
          setImageName("");
          setBase64Image("");
          notify(res.data.message || "Image deleted successfully");
        })
        .catch((err) => {
          notify(err.response.data.message || "something went wrong");
        });
    } else {
      notify("soemthing went wrong");
    }
  };

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    if (
      Title.trim() !== "" &&
      Meta_Description.trim() !== "" &&
      Meta_Title.trim() !== ""
    ) {
      setUploading(true);
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/updateCategory?id=${id}`;
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };
      axios
        .put(
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
          notify(res.data.message);
          setUploading(false);
          setTitle("");
          setMeta_Title("");
          setMeta_Description("");
          setBase64Image("");
          setImageName("");
          history.push("/categories");
        })
        .catch((err) => {
          setUploading(false);
          notify(err.response.data.message || "something went wrong");
        });
    } else {
      notify("Please fill all the fields");
    }
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="w-full max-h-[89vh] min-h-[89vh] h-full overflow-y-auto p-5">
      <main className="p-5 bg-white max-w-4xl rounded-md flex flex-col gap-6">
        <h2 className="text-xl font-semibold w-full border-b-2 border-gray-300 pb-3">
          Edit Category
        </h2>
        <form
          onSubmit={createCategorySubmitHandler}
          className="flex gap-9 max-md:flex-col"
        >
          {base64Image ? (
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
                uploading ? "grayscale" : ""
              }`}
              disabled={uploading}
            >
              {uploading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditCategoryForm;
