import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearState, signUpUser } from "../Redux/slices/UserSlice";
import OtpInput from "otp-input-react";
import { VscVerified } from "react-icons/vsc";

const SignUpOne = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { message, type } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [Mobile_No, setMobile_No] = useState(0);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(" ");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(false);
  const [emailotp, setEmailotp] = useState(false);
  const [numberotp, setNumberotp] = useState(false);
  const [emailotpverify, setEmailotpverify] = useState(false);
  const [numberotpverify, setNumberotpverify] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    if (
      username.trim() !== "" &&
      phone.trim() !== "" &&
      password.trim() !== ""
    ) {
      dispatch(
        signUpUser({
          username,
          Mobile_No,
          email,
          password,
        })
      );
    }
  }

  useEffect(() => {
    setMobile_No(Number(phone));
  }, [phone]);

  useEffect(() => {
    const notify = (arg) => toast(`${arg}`);
    if (message && type) {
      if (type === "success") {
        notify(message);
        dispatch(clearState());
        history.push("/");
      } else {
        notify(message);
        dispatch(clearState());
        setPhone("");
      }
    }
  }, [dispatch, message, type, history]);

  return (
    <section className="mx-auto bg-white  md:w-full h-[100vh] flex flex-col items-center justify-center">
      <div className="flex-col flex sm:flex-row w-full sm:justify-center">
        {/* <div className="sm:w-[360px] hidden sm:block sm:h-[640px] ">
          <img
            src="https://res.cloudinary.com/dqyvomyqy/image/upload/v1685627565/pexels-evg-kowalievska-1148957_yvciqy.jpg"
            alt=""
            className="object-fill h-[640px] "
          />
        </div> */}
        <div className=" sm:w-[460px] bg-gray-300   flex justify-center  border-2 border-gray-300 rounded-md ">
          <div className="w-[95%] sm:w-[440px] min-h-full ">
            <h2 className="text-3xl mb-2 text-center font-bold leading-tight text-black ">
              Sign Up
            </h2>
            <div className=" text-base text-gray-600 ">
              Already have an account?
              <div className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700">
                <Link to="/">Sign In</Link>
              </div>
            </div>
            <form action="#" method="POST" className="mt-4">
              <div className="space-y-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900 "
                  >
                    UserName
                  </label>
                  <div className="mt-1">
                    <input
                      className="flex h-[35px] w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-offset-gray-900"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Enter username"
                      id="name"
                    ></input>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900 "
                  >
                    Phone No
                  </label>
                  <div className="mt-1 flex items-center gap-x-2 ">
                    <input
                      className="flex h-[35px] w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-offset-gray-900"
                      onChange={(e) => setPhone(e.target.value)}
                      type="number"
                      value={phone}
                      placeholder="Enter Your Phone No"
                    ></input>
                    <div
                      onClick={() => setNumberotp(true)}
                      className=" cursor-pointer inline-flex w-[160px] px-2 items-center justify-center rounded-md bg-indigo-600  py-[3px] text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                    >
                      Send OTP
                    </div>
                  </div>
                </div>

                {numberotp ? (
                  <div>
                    <div className="flex items-center gap-x-2 ml-1 ">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="opt-container my-3  "
                      ></OtpInput>
                      <div
                        onClick={() => setNumberotp(true)}
                        className=" cursor-pointer inline-flex w-[100px] px-2  h-[40px] items-center justify-center rounded-md bg-indigo-600   text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                      >
                        Resend
                      </div>
                    </div>
                    <div
                      onClick={() => setNumberotp(true)}
                      className=" ml-1 cursor-pointer inline-flex w-[100px] px-2  h-[35px] items-center justify-center rounded-md bg-indigo-600   text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                    >
                      Verify
                      <VscVerified
                        className={
                          numberotpverify
                            ? "ml-2 text-green-400  "
                            : "ml-2 text-black "
                        }
                        size={25}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className=" ">
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <div className="mt-1 flex items-center gap-x-2">
                    <input
                      className="flex h-[35px] w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-offset-gray-900"
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      value={email}
                      placeholder="Enter Your Email"
                    ></input>
                    <div
                      onClick={() => setEmailotp(true)}
                      className=" cursor-pointer inline-flex w-[160px] px-2 items-center justify-center rounded-md bg-indigo-600  py-[3px] text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                    >
                      Send OTP
                    </div>
                  </div>
                </div>
                {emailotp ? (
                  <div>
                    <div className="flex items-center gap-x-2 ml-1 ">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="opt-container my-3  "
                      ></OtpInput>
                      <div
                        onClick={() => setNumberotp(true)}
                        className=" cursor-pointer inline-flex w-[100px] px-2  h-[40px] items-center justify-center rounded-md bg-indigo-600   text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                      >
                        Resend
                      </div>
                    </div>
                    <div
                      onClick={() => setNumberotp(true)}
                      className=" ml-1 cursor-pointer inline-flex w-[100px] px-2  h-[35px] items-center justify-center rounded-md bg-indigo-600   text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                    >
                      Verify
                      <VscVerified
                        className={
                          numberotpverify
                            ? "ml-2 text-green-400  "
                            : "ml-2 text-black "
                        }
                        size={25}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-[35px] w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-offset-gray-900"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Your Password"
                      id="password"
                    ></input>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                    className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-[6px] text-base font-semibold leading-7 text-white hover:bg-indigo-500 mb-3 "
                  >
                    Sign Up
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpOne;
