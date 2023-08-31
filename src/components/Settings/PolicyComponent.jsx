import React, { useState } from "react";
import { useEffect } from "react";
import RichTextEditor from "react-rte";

const PolicyComponent = () => {
  const [val, setVal] = useState("");
  const [btnid, setBtnid] = useState("");
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  const onChange = (newEditorValue) => {
    setEditorValue(newEditorValue);
  };
  const getValue = (v) => {
    setBtnid(v.target.id);
  };
  const sendText = () => {
    console.log(val);
  };

  useEffect(() => {
    if (btnid === "HTML") {
      setVal(editorValue.toString("html"));
    }
    if (btnid === "Markdown") {
      setVal(editorValue.toString("markdown"));
    }
  }, [editorValue, btnid]);

  return (
    <div className="w-full bg-gray-50 ">
      <div className=" w-[97%] lg:max-w-[1200px] mx-auto ">
        <h1 className=" text-2xl  lg:text-3xl font-semibold my-4 ">
          &#x25cf; Privacy Policy
        </h1>
        <RichTextEditor value={editorValue} onChange={onChange} />
        <div className="flex gap-x-5   ">
          <section>
            <input
              type="radio"
              id="HTML"
              name="Grp1"
              onClick={(e) => getValue(e)}
            />
            <label className="ml-2">HTML</label>
          </section>

          <section>
            <input
              type="radio"
              id="Markdown"
              name="Grp1"
              onClick={(e) => getValue(e)}
            />
            <label className="ml-2">Markdown</label>
          </section>
        </div>
        <div className=" bg-white ">
          <textarea
            readOnly
            value={val}
            className="min-h-[200px] w-full px-3  rounded-md border text-black border-gray-300 bg-transparent  text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-300 "
          />
        </div>
        <div className="w-full h-[60px] flex items-center justify-end  ">
          <button
            onClick={() => sendText()}
            className="w-[150px] h-[45px] bg-[#4361ee] text-white rounded-md flex items-center justify-center cursor-pointer "
          >
            Save & edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyComponent;
