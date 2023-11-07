import { useCallback, useEffect, useState } from "react";
import { Input } from "../common/Input";
import TextArea from "../common/Textarea";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../common/Dropdown";
import { loadAllCategories } from "../../Redux/slices/CategorySlice";
import { loadAllSubCategories } from "../../Redux/slices/SubCategorySlice";
import axios from "axios";
import { getVerientsFormated } from "./utils/getVarientsFormated";
import { generateProductVariationCombination } from "./utils/generateProductVariationCombination";
import ProductImageDropzone from "./utils/productImageDropzone";
import { AiOutlineDelete } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

const EditProductPage = (props) => {
  const dispatch = useDispatch();
  const notify = (arg) => toast(`${arg}`);
  const history = useHistory();
  const location = useLocation();

  // -------------------------------------------------------------------------
  // Product Details
  // -------------------------------------------------------------------------
  const [name, setName] = useState("");
  const [brand_name, setBrand_name] = useState("");
  const [description, setDescription] = useState("");

  // categories
  const [MainCategory, setMainCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const { categories } = useSelector((state) => state.categories);
  const { subCategories } = useSelector((state) => state.subcategories);
  const subCategoriesForSelectedCategory = subCategories.filter(
    (subcat) => subcat.Category === MainCategory
  );

  // checkbox
  const [is_featured, setIs_featured] = useState(false);
  const [is_new_arrival, setis_new_arrival] = useState(false);
  const [is_best_seller, setis_best_seller] = useState(false);
  useEffect(() => {
    dispatch(loadAllCategories({ cookie: "" }));
    dispatch(loadAllSubCategories({ cookie: "" }));
  }, []);

  const [gst_percent, setGst_percent] = useState("");

  // meta
  const [meta_tittle, setMeta_tittle] = useState("");
  const [meta_keyword, setMeta_keyword] = useState("");
  const [meta_description, setMeta_description] = useState("");

  // Loading State
  const [loading, setLoading] = useState(false);

  // -------------------------------------------------------------------------
  // Variations
  // -------------------------------------------------------------------------
  const [VariationData, setVariationData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/v1/user/getVarients`)
      .then((res) => {
        const formatedVarient = getVerientsFormated(res.data.varients);
        setVariationData(formatedVarient);
      });
  }, []);

  const handleVariationChangeInChild = (childValue, parentName, state) => {
    setVariationData((varientions) => {
      for (const parent of varientions) {
        if (parent.name === parentName) {
          for (const child of parent.children) {
            if (child.value === childValue) {
              child.state = state;
            }
          }
          parent.state = parent.children.every((child) => child.state === true);
        }
      }

      return [...varientions];
    });
  };

  const handleVariationChangeInParent = (parentName, state) => {
    setVariationData((varientions) => {
      for (const parent of varientions) {
        if (parent.name === parentName) {
          for (const child of parent.children) {
            child.state = state;
          }
          parent.state = state;
        }
      }

      return [...varientions];
    });
  };

  // -------------------------------------------------------------------------
  // Variations Inputs
  // -------------------------------------------------------------------------
  const [VaraitionInputs, setVaraitionInputs] = useState([]);
  useEffect(() => {
    const newVariationInputs =
      generateProductVariationCombination(VariationData);

    // compare with previous values
    VaraitionInputs.map((variantInputObject) => {
      for (const newVariantInputObject of newVariationInputs) {
        if (
          variantInputObject[0].includes(newVariantInputObject[0]) ||
          newVariantInputObject[0].includes(variantInputObject[0])
        ) {
          newVariantInputObject[1].quantity = variantInputObject[1].quantity;
          newVariantInputObject[1].discount = variantInputObject[1].discount;
          newVariantInputObject[1].price = variantInputObject[1].price;
        }
      }
    });

    setVaraitionInputs(newVariationInputs);
  }, [VariationData]);

  const handleVariationInputOnChange = (
    combinationKey,
    attributeKey,
    value
  ) => {
    setVaraitionInputs((variations) => {
      for (const variantObject of variations) {
        if (variantObject[0] === combinationKey) {
          variantObject[1][attributeKey] = value;
        }
      }
      return [...variations];
    });
  };

  // -------------------------------------------------------------------------
  // Product Images
  // -------------------------------------------------------------------------
  const [productImages, setProductImages] = useState([]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;

          const imageNameArray = file.name.split(".");
          const extension = imageNameArray.pop();
          const name = imageNameArray.join("");
          const date = Date.now().toString();
          const imageName = name.concat(date).concat(".").concat(extension);
          resolve({
            image: base64String,
            imageName: imageName,
          });
        };
        // if (file.size > MAX_SIZE) {
        //   alert("file size exceeded");
        //   return;
        // }

        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((newImages) => {
      setProductImages((images) => images.concat(newImages));
    });

    // empty files
    e.target.value = "";
  };

  const deleteImageByIndex = (imageIndex) => {
    const newBase64ImageArray = productImages.filter(
      (image, index) => index !== imageIndex
    );
    setProductImages(newBase64ImageArray);
  };

  // -------------------------------------------------------------------------
  // Swiper
  // -------------------------------------------------------------------------
  const sliderRef = useRef(null);
  const [numberSlides, setNumberSlides] = useState(4);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setNumberSlides(4);
      } else if (window.innerWidth > 768) {
        setNumberSlides(3);
      } else if (window.innerWidth > 550) {
        setNumberSlides(2);
      } else {
        setNumberSlides(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  // -------------------------------------------------------------------------
  // Form Submit
  // -------------------------------------------------------------------------
  const handleFormSubmit = () => {
    if (
      !name.trim() ||
      !brand_name.trim() ||
      !description.trim() ||
      !MainCategory.trim() ||
      !SubCategory.trim() ||
      !gst_percent.trim() ||
      !meta_tittle.trim() ||
      !meta_keyword.trim() ||
      !meta_description.trim()
    ) {
      notify("Fill all details");
      return;
    }

    if (!VaraitionInputs.length) {
      notify("Fill product variations");
      return;
    }

    if (!productImages.length) {
      notify("Add product images");
      return;
    }

    const formatedVariantInputs = VaraitionInputs.map((variationObject) => {
      const variation = variationObject[1];
      variation.quantity = Number(variation.quantity);
      variation.discount = Number(variation.discount);
      variation.price = Number(variation.price);

      return variation;
    });

    const varients = {
      attributes: VariationData,
      variations: formatedVariantInputs,
    };

    const body = {
      name,
      brand_name,
      description,

      meta_tittle,
      meta_keyword,
      meta_description,

      gst_percent: Number(gst_percent),

      is_featured,
      is_new_arrival,
      is_best_seller,

      MainCategory,
      SubCategory,

      images: productImages,
      varients,
    };

    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/updateProduct?id=${props.match.params.id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setLoading(false);
        notify(res.data.message);
        history.push("/products");
      })
      .catch((err) => {
        setLoading(false);
        notify(err.response.data.message);
      });
  };

  // -------------------------------------------------------------------------
  // Fetch Product Data
  // -------------------------------------------------------------------------
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/user/product/${props.match.params.id}`
      )
      .then((responce) => {
        const { product } = responce.data;

        setName(product.name);
        setBrand_name(product.brand_name);
        setDescription(product.description);

        setMainCategory(product.MainCategory);
        setSubCategory(product.SubCategory);

        setIs_featured(product.is_featured);
        setis_new_arrival(product.is_new_arrival);
        setis_best_seller(product.is_best_seller);

        setMeta_tittle(product.meta_tittle);
        setMeta_keyword(product.meta_keyword);
        setMeta_description(product.meta_description);

        setGst_percent(product.gst_percent.toString());

        const formatedVariationData = VariationData.length
          ? VariationData.map((parent) => {
              for (const parentInResponse of product.varients.attributes) {
                if (parent.name === parentInResponse.name) {
                  parent.state = parentInResponse.state;

                  for (const child of parent.children) {
                    for (const childInResponse of parentInResponse.children) {
                      if (child.name === childInResponse.name) {
                        child.state = childInResponse.state;
                      }
                    }
                  }
                }
              }
              return parent;
            })
          : product.varients.attributes;
        setVariationData(formatedVariationData);

        const formatedVariationInput = product.varients.variations.map(
          (varientObject) => {
            varientObject.quantity = varientObject.quantity.toString();
            varientObject.discount = varientObject.discount.toString();
            varientObject.price = varientObject.price.toString();
            return [varientObject.combinationString.join(" - "), varientObject];
          }
        );
        setVaraitionInputs(formatedVariationInput);

        const formatedProductImages = product.images.map((image) => ({
          imageName: "",
          image,
        }));
        setProductImages(formatedProductImages);
      })
      .catch((err) => {
        notify(err.response.data.message);
      });
  }, [location]);

  return (
    <main className="w-full flex max-h-[89vh] overflow-y-auto flex-col gap-9 h-full p-5 pb-12 bg-white">
      <h2 className="text-xl font-semibold w-full border-b-2 border-gray-300 pb-3">
        Create New Product
      </h2>

      {/* 
          ---------------------------------------------------------------------------------------
          Product Images
          ---------------------------------------------------------------------------------------
      */}
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-3 items-baseline">
          <h4 className="text-lg font-semibold">Product Images</h4>
          {productImages.length ? (
            <p>
              {" "}
              - Total <strong>{productImages.length}</strong> images added
            </p>
          ) : (
            <p> - No images</p>
          )}
        </div>

        <Swiper
          ref={sliderRef}
          spaceBetween={15}
          slidesPerView={numberSlides}
          modules={[Navigation]}
          navigation={{
            prevEl: ".prev_swiper",
            nextEl: ".next_swiper",
          }}
          className="w-full flex gap-6 overflow-x-auto"
        >
          {productImages.map((imageObject, index) => (
            <SwiperSlide
              key={imageObject.imageName + index}
              className="flex flex-col gap-2 aspect-[2/3]"
            >
              <img
                src={imageObject.image}
                alt={imageObject.imageName}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => deleteImageByIndex(index)}
                className="max-w-md mx-auto w-full gap-3 hover:bg-red-200 h-10 flex justify-center items-center bg-gray-200 rounded-md mt-3 active:bg-slate-300 "
              >
                <span>Delete Image</span>
                <AiOutlineDelete className="text-[red] h-6 w-6" />
              </button>
            </SwiperSlide>
          ))}
          <SwiperSlide className="aspect-[2/3]">
            <ProductImageDropzone handleFileChange={handleFileChange} />
          </SwiperSlide>
          <button
            onClick={handlePrev}
            className="prev_swiper absolute left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-full bg-white py-2 pl-1 pr-2 opacity-40 hover:opacity-75"
          >
            <FaAngleLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="next_swiper absolute right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-full bg-white py-2 pl-2 pr-1 opacity-40 hover:opacity-75"
          >
            <FaAngleRight className="h-5 w-5" />
          </button>
        </Swiper>
      </div>

      {/* 
          ---------------------------------------------------------------------------------------
          Product Details
          ---------------------------------------------------------------------------------------
      */}
      <div className="flex max-lg:flex-col w-full gap-9">
        <div className="flex flex-col gap-3 w-full">
          <h4 className="text-lg font-semibold">Details</h4>
          <Input
            input_type="text"
            placeholder="Name"
            value={name}
            setValue={setName}
          />

          <Input
            input_type="text"
            placeholder="Brand Name"
            value={brand_name}
            setValue={setBrand_name}
          />

          <TextArea
            placeholder="Description"
            value={description}
            setValue={setDescription}
          />

          <div className="flex gap-3 max-sm:flex-col mt-4">
            <Dropdown
              options={categories.map((cat) => cat.Title)}
              placeholder="Main Category"
              value={MainCategory}
              setValue={(value) => {
                setMainCategory(value);
                setSubCategory("");
              }}
            />

            <Dropdown
              options={subCategoriesForSelectedCategory.map((cat) => cat.Title)}
              placeholder="Sub Category"
              value={SubCategory}
              setValue={setSubCategory}
            />
          </div>

          <div className="flex gap-9 mt-4 flex-wrap">
            <div className="flex items-center gap-2 [&>*]:cursor-pointer">
              <label htmlFor="isFeatured">Is Featured</label>
              <input
                id="isFeatured"
                type="checkbox"
                className="w-4 h-4 accent-blue-500"
                checked={is_featured}
                onChange={(e) => setIs_featured(e.target.checked)}
              />
            </div>
            <div className="flex items-center gap-2 [&>*]:cursor-pointer">
              <label htmlFor="isNewArrival">Is New Arrival</label>
              <input
                id="isNewArrival"
                type="checkbox"
                className="w-4 h-4 accent-blue-500"
                checked={is_new_arrival}
                onChange={(e) => setis_new_arrival(e.target.checked)}
              />
            </div>
            <div className="flex items-center gap-2 [&>*]:cursor-pointer">
              <label htmlFor="isBestSeller">Is Best Seller</label>
              <input
                id="isBestSeller"
                type="checkbox"
                className="w-4 h-4 accent-blue-500"
                checked={is_best_seller}
                onChange={(e) => setis_best_seller(e.target.checked)}
              />
            </div>
          </div>

          <Input
            input_type="number"
            placeholder="GST percentage"
            value={gst_percent}
            setValue={setGst_percent}
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h4 className="text-lg font-semibold">Meta Details</h4>
          <Input
            input_type="text"
            placeholder="Meta Title"
            value={meta_tittle}
            setValue={setMeta_tittle}
          />

          <Input
            input_type="text"
            placeholder="Meta Keywords"
            value={meta_keyword}
            setValue={setMeta_keyword}
          />

          <TextArea
            placeholder="Meta Description"
            value={meta_description}
            setValue={setMeta_description}
          />
        </div>
      </div>

      {/* 
          ---------------------------------------------------------------------------------------
          Product Variations
          ---------------------------------------------------------------------------------------
      */}
      <div className="flex flex-col gap-3 w-full">
        <h4 className="text-lg font-semibold">Product Variations</h4>
        <table>
          <tbody>
            {VariationData.map((variant, index) => (
              <tr
                key={variant.name + index}
                className="[&>*]:p-3 [&>*]:border-[1px] [&>*]:border-gray-300 border-collapse"
              >
                <td className="min-w-[6rem] align-top">
                  <div
                    key={variant.name + index}
                    className="flex items-center gap-2 [&>*]:cursor-pointer"
                  >
                    <label htmlFor={variant.name + index}>{variant.name}</label>
                    <input
                      id={variant.name + index}
                      type="checkbox"
                      className="w-4 h-4 accent-blue-500"
                      checked={variant.state}
                      onChange={() => {}}
                      onClick={(e) =>
                        handleVariationChangeInParent(
                          variant.name,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                </td>
                <td className="flex flex-wrap w-full gap-3">
                  {variant.children.map((child, index) => (
                    <div
                      key={child.value + index}
                      className="flex items-center gap-2 [&>*]:cursor-pointer"
                    >
                      <label htmlFor={child.value + index}>{child.value}</label>
                      <input
                        id={child.value + index}
                        type="checkbox"
                        className="w-4 h-4 accent-blue-500"
                        checked={child.state}
                        onChange={() => {}}
                        onClick={(e) =>
                          handleVariationChangeInChild(
                            child.value,
                            variant.name,
                            e.target.checked
                          )
                        }
                      />
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="block overflow-x-auto text-sm">
          <thead>
            <tr className="[&>*]:p-3 [&>*]:border-[1px] bg-gray-50 [&>*]:border-gray-400 border-collapse">
              <th className="text-left min-w-[20rem] w-full">Attributes</th>
              <th className="min-w-[10rem] max-w-[10rem] w-full flex-shrink-0">
                Quantity
              </th>
              <th className="min-w-[10rem] max-w-[10rem] w-full flex-shrink-0">
                Discount (%)
              </th>
              <th className="min-w-[10rem] max-w-[10rem] w-full flex-shrink-0">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {VaraitionInputs.length ? (
              VaraitionInputs.map((varientInput, index) => (
                <tr
                  key={varientInput[0] + index}
                  className="[&>*]:p-3 [&>*]:border-[1px] [&>*]:border-gray-400 border-collapse"
                >
                  <td>{varientInput[0]}</td>
                  <td>
                    <input
                      type="number"
                      className="outline-none"
                      value={varientInput[1].quantity}
                      onChange={(e) =>
                        handleVariationInputOnChange(
                          varientInput[0],
                          "quantity",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="outline-none"
                      value={varientInput[1].discount}
                      onChange={(e) =>
                        handleVariationInputOnChange(
                          varientInput[0],
                          "discount",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="outline-none"
                      value={varientInput[1].price}
                      onChange={(e) =>
                        handleVariationInputOnChange(
                          varientInput[0],
                          "price",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="[&>*]:p-3 [&>*]:border-[1px] [&>*]:border-gray-400 border-collapse">
                <td colSpan={4} className="text-center font-medium">
                  NO VARIATION SELECTED
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleFormSubmit}
        className={`rounded-md ml-auto border-[1px] border-sky-500 px-12 py-3 text-lg font-semibold hover:bg-sky-500 hover:text-white ${
          loading ? "grayscale" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </main>
  );
};

export default EditProductPage;
