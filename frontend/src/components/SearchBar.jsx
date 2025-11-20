import { memo, useState } from "react";
import CategoryFilter from "./CategoryFilter";

function SearchBar({ onSearch, initialLoadDone, onLoad, onSelect }) {
  const [value, setValue] = useState("");

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch(e.target.value);
          }}
        />

        {initialLoadDone && <CategoryFilter onSelect={onSelect} />}

        {!initialLoadDone && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer"
            onClick={onLoad}
          >
            Load
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(SearchBar);
