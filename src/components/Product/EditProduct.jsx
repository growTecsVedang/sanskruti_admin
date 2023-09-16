import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteProductImage,
} from "../../Redux/slices/ProductSlice";
import { updateProduct } from "../../Redux/slices/ProductSlice";
import {
  generateCombinations,
  generateResponse,
  takeObj,
} from "../../helper/combinations";
const MAX_SIZE = 400 * 1024;
const EditProduct = (props) => {
  const dispatch = useDispatch();
  const initialValues = {
    id: "",
    name: "",
    description: "",
    gst_percent: 0,
    brand_name: "",
    is_featured: false,
    is_new_arrival: false,
    is_best_seller: false,
    varients: {},
    meta_tittle: "",
    meta_description: "",
    meta_keyword: "",
  };
  const attributes = [
    {
      name: "",
      state: false,
      childern: [
        {
          state: false,
          value: "",
        },
      ],
    },
  ];

  const finalAttributes = [];
  const result = [finalAttributes];

  const arrayOfArray = [
    {
      Title: "",
      values: [],
    },
  ];
  const [combinations, setCombinations] = useState([]);
  const [dynamicArray, setDynamicArray] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [res, setRes] = useState(result);
  const [count, setCount] = useState(0);
  const [atr, setAtr] = useState(attributes);
  const [fatr, setFatr] = useState(finalAttributes);
  const [aoa, setAoa] = useState(arrayOfArray);
  const [MainCategory, setMainCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [duplicateCategory, setDuplicateCategory] = useState([]);
  const [duplicateSubCategory, setDuplicateSubCategory] = useState([]);
  const { subCategories } = useSelector((state) => state.subcategories);
  const { categories } = useSelector((state) => state.categories);
  const { varients } = useSelector((state) => state.varients);
  const { products, message, type, loading } = useSelector(
    (state) => state.products
  );
  const [quantity, setQuantity] = useState(0);
  const [price, setprice] = useState(0);
  const [images, setImages] = useState([{}]);
  const [imagePreview, setImagePreview] = useState([{}]);

  const handleAttributeNameChange = (e) => {
    const { name, value } = e.target;
    const updatedArray = atr.map((item) => {
      if (item.name === name) {
        if (value === "false") {
          return {
            ...item,
            state: true,
            childern: item.childern.map((item) => {
              return {
                ...item,
                state: true,
              };
            }),
          };
        } else {
          return {
            ...item,
            state: false,
            childern: item.childern.map((item) => {
              return {
                ...item,
                state: false,
              };
            }),
          };
        }
      }
      return item;
    });
    setAtr(updatedArray);
  };

  useEffect(() => {
    setImagePreview([...imagePreview, ...images]);
  }, [images]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          const name = file.name.split(".")[0];
          const extension = file.name.split(".")[1];
          const date = Date.now().toString();
          const imageName = name.concat(date).concat(".").concat(extension);
          resolve({
            image: base64String,
            imageName: imageName,
          });
        };
        if (file.size > MAX_SIZE) {
          alert("file size exceeded");
          return;
        }

        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((base64Strings) => {
      setImages(base64Strings);
    });
  };

  const deleteFile = (k) => {
    if (imagePreview[k].image.length < 100) {
      dispatch(
        deleteProductImage({
          id: values.id,
          name: imagePreview[k].image,
        })
      );
    }
    const newBase64ImageArray = imagePreview.filter((item, key) => {
      return k !== key;
    });
    setImagePreview(newBase64ImageArray);
  };

  const handleAttributeChildrenNameChange = (e, parent) => {
    const { name, value } = e.target;
    const updatedArray = atr.map((item) => {
      if (parent === item.name) {
        return {
          ...item,
          state: false,
          childern: item.childern.map((i) => {
            if (i.value === name) {
              if (value === "false") {
                return {
                  ...i,
                  state: true,
                };
              } else {
                return {
                  ...i,
                  state: false,
                };
              }
            }
            return i;
          }),
        };
      }
      return item;
    });
    setAtr(updatedArray);
  };

  useEffect(() => {
    products.forEach((item) => {
      if (item._id === props.match.params.id) {
        setValues({
          id: item._id,
          name: item.name,
          description: item.description,
          gst_percent: item.gst_percent,
          brand_name: item.brand_name,
          is_featured: item.is_featured,
          is_new_arrival: item.is_new_arrival,
          is_best_seller: item.is_best_seller,
          varients: item.varients,
          meta_tittle: item.meta_tittle,
          meta_description: item.meta_description,
          meta_keyword: item.meta_keyword,
        });
        const array = item.images.map((i) => {
          const obj = {
            image: i,
            imageName: "",
          };
          return obj;
        });
        setImagePreview(array);
        setMainCategory(item.MainCategory);
        setSubCategory(item.SubCategory);
      }
    });
    setDuplicateCategory(categories);
    setDuplicateSubCategory(subCategories);

    const keys = [];
    varients.forEach((i, key) => {
      keys.push(varients[key].varientName || null);
    });
    setFatr([...keys, "quantity", "discount", "price"]);
  }, []);

  useEffect(() => {
    if (varients && count < varients.length) {
      setAoa([
        ...aoa,
        {
          Title: varients[count].varientName,
          value: [],
        },
      ]);
      setAtr([
        ...atr,
        {
          name: varients[count].varientName,
          state: false,
          childern: varients[count].value.map((i, key) => {
            return {
              state: false,
              value: i,
            };
          }),
        },
      ]);
      setCount(count + 1);
    }
  }, [count]);

  useEffect(() => {
    setRes(generateResponse(combinations, fatr));
  }, [combinations, fatr]);

  useEffect(() => {
    setDynamicArray(takeObj({ ...atr }));
  }, [atr]);

  useEffect(() => {
    setCombinations(generateCombinations(...dynamicArray));
  }, [dynamicArray]);

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

  const handleChangePrice = (event) => {
    const { name } = event.target;
    const newInputValues = [...res];
    newInputValues[name].price = Number(event.target.value);
    setRes(newInputValues);
  };

  const handleChangeDiscount = (event) => {
    const { name } = event.target;
    console.log(name);
    const newInputValues = [...res];
    newInputValues[name].discount = Number(event.target.value);
    setRes(newInputValues);
  };

  const handleChangeQuantity = (index, event) => {
    const newInputValues = [...res];
    newInputValues[index].quantity = Number(event.target.value);
    setRes(newInputValues);
  };

  const handleInputChange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { name, value } = e.target;
    console.log(typeof value);
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
  };
  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };
  const updateProductHandler = (e) => {
    e.preventDefault();
    let body = {
      name: values.name,
      description: values.description,
      gst_percent: Number(values.gst_percent),
      brand_name: values.brand_name,
      is_featured: values.is_featured,
      is_new_arrival: values.is_new_arrival,
      is_best_seller: values.is_best_seller,
      meta_tittle: values.meta_tittle,
      meta_keyword: values.meta_keyword,
      meta_description: values.meta_description,
      MainCategory,
      SubCategory,
      varients:
        res.length > 0
          ? {
              attributes: atr,
              variations: res,
            }
          : values.varients,
      images: imagePreview,
    };
    dispatch(
      updateProduct({
        id: values.id,
        body,
      })
    );
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

  console.log(values.varients);
  console.log(res);
  return (
    <div className=" flex flex-col overflow-y-scroll overflow-x-hidden   h-[89vh] w-[100%] lg:w-[80%] no-scroll ">
      <div className="w-[97%] mx-auto mt-2 mb-[1px] py-3 h-[50px] justify-center bg-white  rounded-md flex flex-col     shadow-md ">
        <h1 className="text-black lg:text-3xl text-2xl   pl-6 ">
          Product Details
        </h1>
      </div>
      <div className="w-[97%] mx-auto  bg-white  rounded-md flex flex-col     shadow-md ">
        <form onSubmit={updateProductHandler}>
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
                      return <option value={item.Title}>{item.Title}</option>;
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
                Gst
              </label>
              <input
                type="number"
                value={values.gst_percent}
                onChange={handleInputChange}
                label="Gst_percent"
                name="gst_percent"
                className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
                placeholder="Gst in %"
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
                checked={values.is_featured}
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
                checked={values.is_new_arrival}
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
                checked={values.is_best_seller}
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
              Brand Name
            </label>
            <input
              type="text"
              value={values.brand_name}
              onChange={handleInputChange}
              label="Brand_name"
              name="brand_name"
              className=" h-[50px] pl-3 rounded-md border text-black border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  "
              placeholder="Brand-name"
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

          <div className="w-[95%] my-5 min-h-[200px]  mx-auto">
            <label
              htmlFor=""
              className="ml-4 mr-3 w-[120px] text-2xl  text-gray-400 lg:flex lg:h-[50px] lg:items-center"
            >
              Varients
            </label>
            <div className=" min-h-[100px] mt-2 mb-10  ">
              <div className="w-full h-[50px] bg-slate-700 text-white opacity-75 flex text-lg  sm:text-xl  items-center  font-semibold  justify-between  ">
                <h1 className="ml-5 w-[30%] flex-grow  ">Attributes</h1>
                <div className="flex gap-1  sm:gap-x-5 w-[70%] justify-end  ">
                  <div className="sm:mr-5 mr-2 ">Quantity</div>
                  <div className="sm:mr-5 mr-2 ">Discount</div>
                  <div className="sm:mr-5 mr-2  sm:w-[80px] w-[70px]  flex  ">
                    Price
                  </div>
                </div>
              </div>
              {values.varients.variations !== undefined &&
              values.varients.variations.length > 0 ? (
                values.varients.variations.map((item, key) => {
                  return (
                    <div className="w-full min-h-[50px] bg-gray-100 opacity-75 flex  text-xl  items-center  font-semibold  justify-between  ">
                      <section className="flex flex-wrap ml-5 text-xl my-2 w-[50%]  min-h-[30px]  ">
                        {item.combinationString &&
                          item.combinationString.map((i, key) => {
                            var a = item.combinationString.length;
                            return (
                              <div className="mx-1">
                                {i}
                                <span
                                  className={
                                    a - key === 1 ? "hidden" : "visible mx-1"
                                  }
                                >
                                  +
                                </span>
                              </div>
                            );
                          })}
                      </section>
                      <div className="flex  gap-1  sm:gap-x-5 w-[50%] justify-end  ">
                        <input
                          type="number"
                          key={key}
                          readOnly
                          value={item.quantity}
                          className="sm:mr-5 border-2 text-center w-[70px] mr-2 sm:w-[80px] border-black   "
                        />

                        <input
                          type="number"
                          name={key}
                          value={item.discount}
                          readOnly
                          className="sm:mr-5 w-[70px] text-center  mr-2  sm:w-[80px] border-black border-2 "
                        />
                        <input
                          type="number"
                          name={key}
                          value={item.price}
                          readOnly
                          className="sm:mr-5 w-[70px] text-center  mr-2  sm:w-[80px] border-black border-2 "
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1 className="text-center h-[40px] flex justify-center items-center font-medium ">
                  No rows
                </h1>
              )}
            </div>

            <h1 className="text-black lg:text-xl text-xl font-semibold  pl-3">
              Product Inventory
            </h1>
            <hr className="w-full  h-[2px] " />
            <div className="w-full min-h-[150px] my-3 ">
              {atr &&
                atr
                  .filter((item, key) => key !== 0)
                  .map((item, key) => {
                    return (
                      <div className="flex bg-gray-100 text-lg ">
                        <div className="min-w-[140px] min-h-[50px]  flex items-center  ">
                          <div className="ml-1">
                            <input
                              type="checkbox"
                              onChange={handleAttributeNameChange}
                              checked={item.state}
                              value={item.state}
                              name={item.name}
                              className="w-[18px] h-[18px] "
                            ></input>
                            <span className="ml-2 font-semibold text-xl ">
                              {item.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow  gap-x-3 gap-1  flex-wrap  w-full overflow-x-hidden  min-h-[50px]  flex items-center ">
                          {item.childern &&
                            item.childern.map((i, key) => {
                              return (
                                <div className=" h-[40px] flex items-center ">
                                  <input
                                    type="checkbox"
                                    name={i.value}
                                    value={i.state}
                                    checked={i.state}
                                    onChange={(e) =>
                                      handleAttributeChildrenNameChange(
                                        e,
                                        item.name
                                      )
                                    }
                                    className="w-[18px] h-[18px] "
                                  ></input>
                                  <span className="ml-2">{i.value}</span>
                                </div>
                              );
                            })}
                          <hr className="w-full text-black   h-[3px] " />
                        </div>
                      </div>
                    );
                  })}
            </div>
            <div className=" min-h-[100px] ">
              <div className="w-full h-[50px] bg-blue-200 opacity-75 flex text-lg  sm:text-xl  items-center  font-semibold  justify-between  ">
                <h1 className="ml-5 w-[30%] flex-grow  ">Attributes</h1>
                <div className="flex gap-1  sm:gap-x-5 w-[70%] justify-end  ">
                  <div className="sm:mr-5 mr-2 ">Quantity</div>
                  <div className="sm:mr-5 mr-2 ">Discount</div>
                  <div className="sm:mr-5 mr-2  sm:w-[80px] w-[70px]  flex  ">
                    Price
                  </div>
                </div>
              </div>
              {res.length > 0 ? (
                res.map((item, key) => {
                  return (
                    <div className="w-full min-h-[50px] bg-gray-100 opacity-75 flex  text-xl  items-center  font-semibold  justify-between  ">
                      <section className="flex flex-wrap ml-5 text-xl my-2 w-[50%]  min-h-[30px]  ">
                        {item.combinationString &&
                          item.combinationString.map((i, key) => {
                            var a = item.combinationString.length;
                            return (
                              <div className="mx-1">
                                {i}
                                <span
                                  className={
                                    a - key === 1 ? "hidden" : "visible mx-1"
                                  }
                                >
                                  +
                                </span>
                              </div>
                            );
                          })}
                      </section>
                      <div className="flex  gap-1  sm:gap-x-5 w-[50%] justify-end  ">
                        <input
                          type="number"
                          key={key}
                          onChange={(event) => handleChangeQuantity(key, event)}
                          className="sm:mr-5 border-2 text-center w-[70px] mr-2 sm:w-[80px] border-black   "
                        />
                        <input
                          type="number"
                          name={key}
                          onChange={(event) => handleChangeDiscount(event)}
                          className="sm:mr-5 w-[70px] text-center  mr-2  sm:w-[80px] border-black border-2 "
                        />
                        <input
                          type="number"
                          name={key}
                          placeholder=""
                          onChange={(event) => handleChangePrice(event)}
                          className="sm:mr-5 w-[70px] text-center  mr-2  sm:w-[80px] border-black border-2 "
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1 className="text-center h-[40px] flex justify-center items-center font-medium ">
                  No rows
                </h1>
              )}
            </div>
          </div>
          <div class="  mt-5 flex items-center flex-col   justify-center   w-[95%]   lg:w-[95%] mx-auto cursor-pointer ">
            <div className="w-[100%] mb-8 ">
              <h2 className="text-lg font-bold mt-5  mx-4 ">Product Images</h2>
              <div className=" mt-5  flex overflow-x-scroll w-full gap-x-6 min-h-[225px]  ">
                {imagePreview.length !== 0 ? (
                  imagePreview.map((i, key) => {
                    return (
                      <div key={key} className="mb-4">
                        <div className="w-[280px] h-[350px] border-2 border-gray-200 ">
                          <img
                            className="w-[280px] h-[350px]"
                            src={i.image}
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
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
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
            {!loading ? (
              <button
                type="submit"
                className="text-white w-[140px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex justify-center items-center"
              >
                Save & edit
              </button>
            ) : (
              <button
                disabled
                type="button"
                class="text-white bg-blue-700 w-[140px] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Updating...
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
