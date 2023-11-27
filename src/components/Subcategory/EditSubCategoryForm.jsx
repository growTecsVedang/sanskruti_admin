import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loadAllCategories } from "../../Redux/slices/CategorySlice";
import axios from "axios";
import LoadingPage from "../common/loading";
import { Input } from "../common/Input";
import TextArea from "../common/Textarea";
import { useHistory } from "react-router-dom";

const EditSubCategoryForm = (props) => {
  const notify = (arg) => toast(`${arg}`);
  const history = useHistory();
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    function getCookie() {
      var name = "connect.sid".concat("=");
      var decodedCookie = document.cookie;
      var cookieArray = decodedCookie.split(";");

      for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.startsWith(name)) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return null; // Cookie not found
    }
    const cookie = getCookie();
    dispatch(
      loadAllCategories({
        cookie,
      })
    );
  }, [dispatch]);

  const [Title, setTitle] = useState("");
  const [Meta_Title, setMeta_Title] = useState("");
  const [Meta_Description, setMeta_Description] = useState("");
  const [Category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/user/subcategories/${props.match.params.id}`
      )
      .then((res) => {
        const responce = res.data.subCategory;
        setId(responce._id);
        setTitle(responce.Title);
        setMeta_Title(responce.Meta_Title);
        setCategory(responce.Category);
        setMeta_Description(responce.Meta_Description);
        setLoading(false);
      })
      .catch((err) => {
        const response = err.response.data;
        notify(response.message);
        setLoading(false);
      });
  }, [props]);

  const createSubCategorySubmitHandler = (e) => {
    e.preventDefault();

    if (
      Title.trim() !== "" &&
      Meta_Description.trim() !== "" &&
      Meta_Title.trim() !== "" &&
      Category.trim() !== ""
    ) {
      setUploading(true);
      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/updateSubCategory?id=${id}`;
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };
      axios
        .put(
          url,
          {
            Title,
            Category,
            Meta_Title,
            Meta_Description,
          },
          {
            headers,
            withCredentials: true,
          }
        )
        .then((res) => {
          setUploading(false);
          notify(res.data.message);
          setTitle("");
          setMeta_Title("");
          setMeta_Description("");
          setCategory("");
          history.push("/subcategories");
        })
        .catch((err) => {
          setUploading(false);
          notify(err.response.data.message);
        });
    } else {
      notify("fill all details");
    }
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="w-full max-h-[89vh] min-h-[89vh] h-full overflow-y-auto p-5">
      <main className="p-5 bg-white max-w-4xl rounded-md flex flex-col gap-6">
        <h2 className="text-xl font-semibold w-full border-b-2 border-gray-300 pb-3">
          Create New Sub Category
        </h2>
        <form
          onSubmit={createSubCategorySubmitHandler}
          className="flex gap-4 flex-col"
        >
          <Input
            input_type={"text"}
            placeholder={"Title"}
            value={Title}
            setValue={setTitle}
          />
          <div className="group relative h-10 w-full rounded-md bg-white">
            <label
              htmlFor="Category"
              className={`absolute left-3 -translate-y-1/2 bg-gradient-to-b from-transparent via-transparent via-45% to-white to-50% px-2 text-gray-500 transition-all delay-300 ease-in-out group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-black ${
                !!Category ? "top-0 text-xs" : "top-1/2 text-sm"
              }`}
            >
              Category
            </label>
            <select
              name="Category"
              id="Category"
              onChange={(e) => setCategory(e.target.value)}
              className="peer h-full w-full rounded-md border-[1px] border-gray-400 bg-transparent px-3 outline-none outline-offset-0 hover:outline hover:outline-4 hover:outline-gray-200 focus:border-black"
              defaultValue={Category}
              value={Category}
            >
              <option value="" selected hidden></option>
              {categories.length ? (
                categories.map((category, index) => (
                  <option key={category.Title + index} value={category.Title}>
                    {category.Title}
                  </option>
                ))
              ) : (
                <option disabled>No items found</option>
              )}
              {categories.length &&
                !categories.find((item) => item.Title === Category) && (
                  <option value={Category} selected>
                    {Category}
                  </option>
                )}
            </select>
          </div>
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
        </form>
      </main>
    </div>
  );
};

export default EditSubCategoryForm;
