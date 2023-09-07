export const Input = ({ input_type, placeholder, value, setValue }) => {
  return (
    <div className="relative h-10 w-full">
      <input
        type={input_type}
        className="peer h-full w-full rounded-md border-[1px] border-gray-400 bg-transparent px-3 outline-none outline-offset-0 hover:outline hover:outline-4 hover:outline-gray-200 focus:border-black"
        id={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label
        htmlFor={placeholder}
        className={[
          "absolute left-3 -translate-y-1/2 bg-white px-2 text-gray-500 transition-all delay-300 ease-in-out peer-focus:top-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-black",
          !!value ? "top-0 text-xs" : "top-1/2 text-sm",
        ].join(" ")}
      >
        {placeholder}
      </label>
    </div>
  );
};
