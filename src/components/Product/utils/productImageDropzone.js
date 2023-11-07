const ProductImageDropzone = ({ handleFileChange }) => {
  return (
    <label
      for="dropzone-file"
      className="flex group flex-col items-center h-full justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:border-sky-500 hover:bg-sky-50"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <svg
          aria-hidden="true"
          className="w-16 h-16 mb-6 text-gray-500 group-hover:text-sky-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="text-sm text-gray-500 group-hover:text-sky-400">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-500 group-hover:text-sky-400">
          JPEG, PNG, JPG
        </p>
        <p className="text-xs font-semibold text-gray-500 group-hover:text-sky-400">
          ( MAX SIZE: 5MB )
        </p>
      </div>
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        multiple
      />
    </label>
  );
};

export default ProductImageDropzone;
