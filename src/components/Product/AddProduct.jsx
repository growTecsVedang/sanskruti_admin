import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCategories } from "../../Redux/slices/CategorySlice";
import { loadAllSubCategories } from "../../Redux/slices/SubCategorySlice";
import { addProduct, clearState } from "../../Redux/slices/ProductSlice";
const MAX_SIZE = 400 * 1024;
const AddProduct = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    description: "",
    gst_price: 0,
    sale_price: 0,
    brand_name: "",
    is_featured: false,
    is_new_arrival: false,
    is_best_seller: false,
    slug: "",
    meta_tittle: "",
    meta_description: "",
    meta_keyword: "",
  };
  const [values, setValues] = useState(initialValues);
  const [MainCategory, setMainCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [duplicateCategory, setDuplicateCategory] = useState([]);
  const [duplicateSubCategory, setDuplicateSubCategory] = useState([]);

  const { subCategories } = useSelector((state) => state.subcategories);
  const { categories } = useSelector((state) => state.categories);
  const { message, type } = useSelector((state) => state.products);
  const [base64Image, setBase64Image] = useState([]);
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

  const handleInputChange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { name, value } = e.target;
    if (
      name === "is_featured" ||
      name === "is_best_seller" ||
      name === "is_new_arrival"
    ) {
      if (value === "false") {
        setValues({
          ...values,
          [name]: true,
        });
      } else {
        setValues({
          ...values,
          [name]: false,
        });
      }
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleCategoryChange = (event) => {
    setMainCategory(event.target.value);
    setSubCategory("");
  };
  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };
  const addProductHandler = (e) => {
    e.preventDefault();
    let body = {
      name: values.name,
      description: values.description,
      gst_price: values.gst_price,
      sale_price: values.sale_price,
      brand_name: values.brand_name,
      is_featured: values.is_featured,
      is_new_arrival: values.is_new_arrival,
      is_best_seller: values.is_best_seller,
      slug: values.slug,
      meta_tittle: values.meta_tittle,
      meta_keyword: values.meta_keyword,
      meta_description: values.meta_description,
      MainCategory,
      SubCategory,
      images: base64Image,
    };
    dispatch(
      addProduct({
        body,
      })
    );
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          resolve(base64String);
        };
        if (file.size > MAX_SIZE) {
          alert("file size exceeded");
          return;
        }

        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((base64Strings) => {
      setBase64Image(base64Strings);
    });
  };

  const deleteFile = (k) => {
    const newBase64ImageArray = base64Image.filter((item, key) => {
      return k !== key;
    });
    setBase64Image(newBase64ImageArray);
  };

  useEffect(() => {
    const cookie = getCookie();
    dispatch(
      loadAllCategories({
        cookie,
      })
    );
    dispatch(
      loadAllSubCategories({
        cookie,
      })
    );
    setDuplicateCategory(categories);
    setDuplicateSubCategory(subCategories);
  }, []);

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
  return (
    <div className="">
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80 ">
        <Sidebar />

        <div className=" flex flex-col overflow-y-scroll overflow-x-hidden   h-[100vh] w-[100%] lg:w-[80%] no-scroll ">
          <div className="w-[97%] mx-auto mt-2 mb-[1px] py-3 h-[50px] justify-center bg-white  rounded-md flex flex-col     shadow-md ">
            <h1 className="text-black lg:text-3xl text-2xl   pl-6 ">
              Product Details
            </h1>
          </div>
          <div className="w-[97%] mx-auto  bg-white  rounded-md flex flex-col     shadow-md ">
            <form onSubmit={addProductHandler}>
              <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
                  Name
                </label>
                <input
                  type="text"
                  value={values.name}
                  onChange={handleInputChange}
                  label="Name"
                  name="name"
                  className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                  placeholder="Title"
                />
              </div>
              <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
                  Product Description
                </label>
                <textarea
                  type="text"
                  value={values.description}
                  onChange={handleInputChange}
                  label="Description"
                  name="description"
                  className=" min-h-[250px] px-3 py-2 rounded-md border text-black border-gray-300 bg-transparent  text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                  placeholder=" Description"
                />
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center w-[95%] mx-auto">
                <div className="  mt-[20px]  flex flex-col lg:ml-4 lg:flex-row w-[40%]  ">
                  <h1 className="flex items-center text-lg text-gray-400 mr-4 ">
                    Category
                  </h1>
                  <select
                    onChange={handleCategoryChange}
                    value={MainCategory}
                    className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 "
                  >
                    <option value="">categories</option>
                    {duplicateCategory &&
                      duplicateCategory.map((item, key) => {
                        return <option value={item.Title}>{item.Title}</option>;
                      })}
                  </select>
                </div>
                <div className="  mt-[20px] flex flex-col  lg:flex-row w-[50%] ">
                  <h1 className="flex items-center text-lg w-[120px] text-gray-400 mr-4 ">
                    Sub Category
                  </h1>
                  <select
                    value={SubCategory}
                    onChange={handleSubCategoryChange}
                    className="cursor-pointer h-[45px] min-w-[140px] pl-3  bg-gray-50 rounded-md text-lg border-2 border-gray-300 "
                  >
                    <option value="">SubCategories</option>;
                    {MainCategory !== "" && duplicateSubCategory ? (
                      duplicateSubCategory
                        .filter((item, key) => item.Category === MainCategory)
                        .map((item, key) => {
                          return (
                            <option value={item.Title}>{item.Title}</option>
                          );
                        })
                    ) : (
                      <option value="subCategory">sub Category</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center w-[95%] mx-auto">
                <div className="flex flex-col  lg:flex-row w-[30%]   mt-5 ">
                  <label
                    htmlFor=""
                    className="mb-1 ml-4 mr-3 text-lg text-gray-400  lg:flex lg:h-[50px] lg:items-center "
                  >
                    Gst Price
                  </label>
                  <input
                    type="number"
                    value={values.gst_price}
                    onChange={handleInputChange}
                    label="Gst_price"
                    name="gst_price"
                    className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                    placeholder="Title"
                  />
                </div>
                <div className="flex flex-col lg:flex-row w-[30%]  mt-5 ">
                  <label
                    htmlFor=""
                    className="mb-1 ml-4 mr-3 text-lg text-gray-400 lg:flex lg:h-[50px] lg:items-center"
                  >
                    Sale Price
                  </label>
                  <input
                    type="number"
                    value={values.sale_price}
                    onChange={handleInputChange}
                    label="Sale_price"
                    name="sale_price"
                    className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                    placeholder="Title"
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-x-4 min-h-[50px] w-[95%] mx-auto items-center flex-wrap ">
                <div className="flex h-[50px] items-center">
                  <label
                    htmlFor=""
                    className="mb-1 ml-4 mr-3 text-xl text-gray-400 lg:flex lg:h-[50px] lg:items-center"
                  >
                    Is-Featured
                  </label>
                  <input
                    type="checkbox"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    value={values.is_featured}
                    onChange={handleInputChange}
                    name="is_featured"
                  />
                </div>
                <div className="flex h-[50px] items-center">
                  <label
                    htmlFor=""
                    className="mb-1 ml-4 mr-3 text-xl text-gray-400 lg:flex lg:h-[50px] lg:items-center"
                  >
                    Is-New-Arrival
                  </label>
                  <input
                    type="checkbox"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    value={values.is_new_arrival}
                    onChange={handleInputChange}
                    name="is_new_arrival"
                  />
                </div>
                <div className="flex h-[50px] items-center">
                  <label
                    htmlFor=""
                    className="mb-1 ml-4 mr-3 text-xl text-gray-400 lg:flex lg:h-[50px] lg:items-center"
                  >
                    Is-Best-Seller
                  </label>
                  <input
                    type="checkbox"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    value={values.is_best_seller}
                    onChange={handleInputChange}
                    name="is_best_seller"
                  />
                </div>
              </div>
              <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
                  Slug
                </label>
                <input
                  type="text"
                  value={values.slug}
                  onChange={handleInputChange}
                  label="Slug"
                  name="slug"
                  className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                  placeholder="Slug"
                />
              </div>
              <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={values.brand_name}
                  onChange={handleInputChange}
                  label="Brand_name"
                  name="brand_name"
                  className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                  placeholder="Slug"
                />
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center w-[95%] mx-auto">
                <div className="flex flex-col  lg:flex-row w-[30%]   mt-5 ">
                  <label
                    htmlFor=""
                    className="mb-1 ml-4 mr-3 w-[120px] text-lg text-gray-400  lg:flex lg:h-[50px] lg:items-center "
                  >
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={values.meta_tittle}
                    onChange={handleInputChange}
                    label="Name"
                    name="meta_tittle"
                    className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                    placeholder="Meta Tittle"
                  />
                </div>
                <div className="flex flex-col lg:flex-row w-[30%]  mt-5 ">
                  <label
                    htmlFor=""
                    className="mb-1 ml-4 mr-3 w-[120px] text-lg text-gray-400 lg:flex lg:h-[50px] lg:items-center"
                  >
                    Meta Keyword
                  </label>
                  <input
                    type="text"
                    value={values.meta_keyword}
                    onChange={handleInputChange}
                    label="Meta_keyword"
                    name="meta_keyword"
                    className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                    placeholder="Meta keyword"
                  />
                </div>
              </div>
              <div className="flex flex-col w-[95%]  mx-auto mt-5 ">
                <label htmlFor="" className="mb-4 text-lg text-gray-400 ">
                  Meta Description
                </label>
                <textarea
                  type="text"
                  value={values.meta_description}
                  onChange={handleInputChange}
                  label="Meta_description"
                  name="meta_description"
                  className=" min-h-[250px] px-3 py-2 rounded-md border text-black border-gray-300 bg-transparent  text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                  placeholder="Meta Description"
                />
              </div>
              <div class="  mt-5 flex items-center flex-col   justify-center   w-[95%]   lg:w-[95%] mx-auto cursor-pointer ">
                <div className="w-[100%] mb-8 ">
                  <h2 className="text-lg font-bold mt-5  mx-4 ">
                    Product Images
                  </h2>
                  <div className=" mt-5  flex overflow-x-scroll w-full gap-x-6 min-h-[225px]  ">
                    {base64Image.length !== 0 ? (
                      base64Image.map((i, key) => {
                        return (
                          <div key={key} className="mb-4">
                            <div className="w-[280px] h-[350px] border-2 border-gray-200 ">
                              <img
                                className="w-[280px] h-[350px]"
                                src={i}
                                alt="product_image"
                              />
                            </div>
                            <div
                              onClick={() => deleteFile(key)}
                              className="w-[280px] h-[40px] flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 "
                            >
                              <span>{<AiOutlineDelete size={30} />}</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="mb-4">
                        <div className="w-[250px] h-[350px] border-2 border-gray-200 ">
                          <img src="" alt="add_product_image" />
                        </div>
                        <div className="w-[250px] h-[40px] flex justify-center items-center bg-gray-200 rounded-lg mt-3 active:bg-slate-300 ">
                          <span>{<AiOutlineDelete size={30} />}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 "
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      class="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    onChange={handleFileChange}
                    multiple
                  />
                </label>
              </div>

              <div className="w-full pr-4 mt-3 h-[60px] flex items-center justify-end  ">
                <button
                  type="submit"
                  className="w-[150px] h-[45px]  bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer "
                >
                  Save & edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
