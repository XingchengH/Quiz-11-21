import { memo } from "react";

function ProductList({ products }) {
  return (
    <div className="w-full p-2 ">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex bg-white p-6 rounded-lg shadow-md my-2 overflow-y-auto"
        >
          <h2 className="text-xl font-bold flex-1">{product.name}</h2>
          <p className="text-gray-700 flex-2">Category: {product.category}</p>
          <p className="text-gray-900 font-semibold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default memo(ProductList);
