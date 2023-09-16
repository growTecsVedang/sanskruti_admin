import React, { useState } from "react";
import { useEffect } from "react";
import RichTextEditor from "react-rte";
import {
  clearState,
  markdownDetails,
  updatemd,
} from "../../Redux/slices/MarkDownSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const TermsAndCondition = () => {
  const dispatch = useDispatch();
  const [val, setVal] = useState("");
  const { message, type, loading, md } = useSelector((state) => state.markdown);
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  const onChange = (newEditorValue) => {
    setEditorValue(newEditorValue);
  };

  const sendText = (e) => {
    e.preventDefault();
    console.log(val);
    if (val !== "") {
      dispatch(
        updatemd({
          body: {
            status: "present",
            termsAndConditions: val,
          },
        })
      );
    }
  };

  useEffect(() => {
    setVal(editorValue.toString("markdown"));
  }, [editorValue]);

  useEffect(() => {
    console.log(md);
    setEditorValue(
      RichTextEditor.createValueFromString(md.toString() || " ", "markdown")
    );
    setVal(md);
  }, [md]);

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
    dispatch(
      markdownDetails({
        field: "termsAndConditions",
      })
    );
  }, [dispatch, type, message]);

  return (
    <div className="w-full overflow-y-scroll h-[89vh] bg-gray-50 ">
      <div className="bg-white rounded-md w-full flex flex-col p-5">
        <h1 className=" text-2xl  lg:text-3xl font-semibold my-4 ">
          Terms & Conditions
        </h1>
        <RichTextEditor value={editorValue} onChange={onChange} />
        <div className=" bg-white mt-3">
          <textarea
            readOnly
            value={val}
            className="min-h-[200px] w-full px-3  rounded-md border text-black border-gray-300 bg-transparent  text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-300 "
          />
        </div>
        <div className="w-full h-[60px] flex items-center justify-end  ">
          <button
            onClick={(e) => sendText(e)}
            className="w-[150px] h-[45px] bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer "
          >
            Save & edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
