import { memo } from "react";

function CategoryFilter({ onSelect }) {
  return (
    <div className="flex gap-2 border border-gray-300 rounded-md p-2">
      <button
        onClick={() => onSelect("all")}
        className="cursor-pointer border-r pr-2 hover:text-blue-500"
      >
        All
      </button>
      <button
        onClick={() => onSelect("electronics")}
        className="cursor-pointer hover:text-blue-500"
      >
        Electronics
      </button>
      <button
        onClick={() => onSelect("furniture")}
        className="cursor-pointer hover:text-blue-500"
      >
        Furniture
      </button>
      <button
        onClick={() => onSelect("grocery")}
        className="cursor-pointer hover:text-blue-500"
      >
        Grocery
      </button>
    </div>
  );
}

export default memo(CategoryFilter);
