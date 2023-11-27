import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import { Input } from "../common/Input";

const EditCouponForm = (props) => {
  const notify = (arg) => toast(`${arg}`);

  const [name, setName] = useState("");
  const [minpurchase, setMinpurchase] = useState("");
  const [code, setCode] = useState("");
  const [codePrev, setCodePrev] = useState("");
  const [value, setValue] = useState("");
  const [ctype, setCtype] = useState("");
  const [disType, setDisType] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const couponSubmitHandler = (e) => {
    e.preventDefault();

    if (
      name.trim() !== "" &&
      code.trim() !== "" &&
      ctype.trim() !== "" &&
      disType.trim() !== "" &&
      value.trim() !== "" &&
      minpurchase.trim() !== "" &&
      date.trim() !== ""
    ) {
      setLoading(true);

      const newDate = new Date(date);
      newDate.setHours(23);
      newDate.setMinutes(59);
      newDate.setSeconds(59);

      const url = `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/coupons`;
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .put(
          url,
          {
            previousCode: codePrev,
            name,
            code,
            type: ctype,
            discountType: disType,
            value: Number(value),
            minPurchase: Number(minpurchase),
            expirationDate: newDate,
          },
          {
            headers,
            withCredentials: true,
          }
        )
        .then((res) => {
          setLoading(false);
          notify(res.data.message);
          props.history.push("/coupons");
        })
        .catch((err) => {
          notify(err.response.data.message || "Something went wrong");
          setLoading(false);
        });
    } else {
      notify("Please fill all the fields");
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/v1/admin/couponDetail?id=${props.match.params.id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        const response = res.data.coupon;
        setName(response.name);
        setCode(response.code);
        setCodePrev(response.code);
        setCtype(response.type);
        setDisType(response.discountType);
        setValue(response.value.toString());
        setMinpurchase(response.minPurchase.toString());
        const originalDate = response.expirationDate;
        const formattedDate = moment(originalDate).format("YYYY-MM-DD");
        setDate(formattedDate);
      })
      .catch((err) => {
        notify(err.response.data.message || "Something went wrong");
      });
  }, [props]);

  return (
    <div className="p-5 max-h-[89vh] h-full min-h-[89vh] overflow-y-auto w-full">
      <main className="w-full flex flex-col gap-9 p-5 pb-12 bg-white rounded-md max-w-4xl">
        <h2 className="text-xl font-semibold w-full border-b-2 border-gray-300 pb-3">
          Edit Coupon
        </h2>

        <form className="flex flex-col gap-6" onSubmit={couponSubmitHandler}>
          <Input
            input_type={"text"}
            placeholder={"Coupon name"}
            value={name}
            setValue={setName}
          />

          <div className="flex max-md:flex-col gap-4">
            <Input
              input_type={"text"}
              placeholder={"Coupon code (Max length of 6 characters)"}
              value={code}
              setValue={(value) => value.length <= 6 && setCode(value)}
            />
            <div className="group relative h-10 w-full rounded-md bg-white">
              <label
                htmlFor="type"
                className={`absolute left-3 -translate-y-1/2 bg-gradient-to-b from-transparent via-transparent via-45% to-white to-50% px-2 text-gray-500 transition-all delay-300 ease-in-out group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-black ${
                  !!ctype ? "top-0 text-xs" : "top-1/2 text-sm"
                }`}
              >
                Coupon type
              </label>
              <select
                name="type"
                id="type"
                onChange={(e) => setCtype(e.target.value)}
                className="peer h-full w-full rounded-md border-[1px] border-gray-400 bg-transparent px-3 outline-none outline-offset-0 hover:outline hover:outline-4 hover:outline-gray-200 focus:border-black"
                defaultValue={ctype}
                value={ctype}
              >
                <option value="" selected hidden></option>
                <option value="oneTime">For OneTime Use</option>
                <option value="multiple">For Multiple Time's Use</option>
              </select>
            </div>
          </div>

          <h3>Discount Parameters</h3>
          <div className="flex max-md:flex-col gap-4">
            <Input
              input_type={"number"}
              placeholder={`Discount Value ${
                disType === "percentage"
                  ? "(%)"
                  : disType === "price"
                  ? "(Rs)"
                  : ""
              }`}
              value={value}
              setValue={setValue}
            />

            <div className="group relative h-10 w-full rounded-md bg-white">
              <label
                htmlFor="discountType"
                className={`absolute left-3 -translate-y-1/2 bg-gradient-to-b from-transparent via-transparent via-45% to-white to-50% px-2 text-gray-500 transition-all delay-300 ease-in-out group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-black ${
                  !!disType ? "top-0 text-xs" : "top-1/2 text-sm"
                }`}
              >
                Discount Type
              </label>
              <select
                name="discountType"
                id="discountType"
                onChange={(e) => setDisType(e.target.value)}
                className="peer h-full w-full rounded-md border-[1px] border-gray-400 bg-transparent px-3 outline-none outline-offset-0 hover:outline hover:outline-4 hover:outline-gray-200 focus:border-black"
                defaultValue={disType}
                value={disType}
              >
                <option value="" selected hidden></option>
                <option value="percentage">Percentage</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>

          <div className="flex max-md:flex-col gap-4">
            <Input
              input_type={"number"}
              placeholder={"Minimum Purchase"}
              value={minpurchase}
              setValue={setMinpurchase}
            />

            <div className="group relative h-10 w-full rounded-md bg-white">
              <label
                htmlFor="expiryDate"
                className={`absolute left-3 -translate-y-1/2 bg-gradient-to-b from-transparent via-transparent via-45% to-white to-50% px-2 text-gray-500 transition-all delay-300 ease-in-out group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-black ${
                  !!date ? "top-0 text-xs" : "top-1/2 text-sm bg-white"
                }`}
              >
                Expiration Date
              </label>
              <input
                type="date"
                name="expiryDate"
                id="expiryDate"
                onChange={(e) => setDate(e.target.value)}
                className="peer h-full w-full rounded-md border-[1px] border-gray-400 bg-transparent px-3 outline-none outline-offset-0 hover:outline hover:outline-4 hover:outline-gray-200 focus:border-black"
                value={date}
              />
            </div>
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

export default EditCouponForm;
