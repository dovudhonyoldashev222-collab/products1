import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function ProductFormPage({
  mode,
  product,
  description,
  imageUrl,
  discountPrice,
  categories,
  onChangeProduct,
  onChangeDescription,
  onChangeImageUrl,
  onChangeDiscountPrice,
  onChangeCategories,
  onBack,
  onSubmit,
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ChevronLeft size={18} />
        Back
      </button>

      <h1 className="text-2xl font-bold text-gray-800">{mode === 'edit' ? 'Edit Product' : 'Add Product'}</h1>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Information</h3>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                required
                type="text"
                value={product.name}
                onChange={(e) => onChangeProduct({ ...product, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                placeholder="Summer T-Shirt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
              <textarea
                value={description}
                onChange={(e) => onChangeDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm min-h-[120px] resize-none"
                placeholder="Product description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Images URL</label>
              <div className="w-full px-4 py-2.5 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => onChangeImageUrl(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  required
                  type="text"
                  value={product.price}
                  onChange={(e) =>
                    onChangeProduct({
                      ...product,
                      price: e.target.value.startsWith('$') ? e.target.value : '$' + e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Price</label>
                <input
                  type="text"
                  value={discountPrice}
                  onChange={(e) => onChangeDiscountPrice(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  placeholder="Price at Discount"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Categories</h3>
          </div>

          <div className="p-6 space-y-3">
            {Object.keys(categories).map((k) => (
              <label key={k} className="flex items-center gap-3 text-sm text-gray-700 select-none">
                <input
                  type="checkbox"
                  checked={categories[k]}
                  onChange={(e) => onChangeCategories({ ...categories, [k]: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20"
                />
                {k}
              </label>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[#2a6aff] text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            {mode === 'edit' ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

