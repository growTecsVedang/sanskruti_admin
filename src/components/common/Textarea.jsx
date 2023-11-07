const TextArea = ({ placeholder, value, setValue }) => {
  return (
    <div className="group relative w-full rounded-md bg-white">
      <label
        htmlFor={placeholder}
        className={`absolute left-3 -translate-y-1/2 bg-gradient-to-b from-transparent via-transparent via-45% to-white to-50% px-2 text-gray-500 transition-all delay-300 ease-in-out group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-black ${
          !!value ? "top-0 text-xs" : "top-6 text-sm"
        }`}
      >
        {placeholder}
      </label>
      <textarea
        id={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="peer min-h-[10rem] max-h-[20rem] w-full resize-y rounded-md border-[1px] border-gray-400 bg-transparent px-3 py-3 outline-none outline-offset-0 hover:outline hover:outline-4 hover:outline-gray-200 focus:border-black"
      />
    </div>
  );
};

export default TextArea;
