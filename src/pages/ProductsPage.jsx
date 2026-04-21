import React from 'react';
import { Check, ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { cn } from '../lib/cn';

export default function ProductsPage({
  paginatedProducts,
  filteredCount,
  currentPage,
  totalPages,
  selectedIds,
  allVisibleSelected,
  someVisibleSelected,
  onToggleSelectAllVisible,
  onToggleSelect,
  onChangePage,
  onAddProduct,
  onEditSelected,
  onDeleteSelected,
}) {
  const selectedCount = selectedIds.length;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your inventory items</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2.5 rounded-lg text-sm font-bold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Export
          </button>
          <button
            onClick={onAddProduct}
            className="inline-flex items-center gap-2 bg-[#2a6aff] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus size={18} strokeWidth={3} />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-1 bg-[#5d87ff]"></div>
        <div className="px-6 py-4 flex items-center justify-end gap-2 border-b border-gray-100">
          <button
            type="button"
            onClick={onEditSelected}
            disabled={selectedCount === 0}
            className={cn(
              'w-10 h-10 inline-flex items-center justify-center rounded-lg border transition-colors',
              selectedCount === 0
                ? 'border-gray-200 text-gray-300 bg-white cursor-not-allowed'
                : 'border-gray-200 text-gray-500 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
            )}
            title={selectedCount === 0 ? 'Select a product to edit' : 'Edit selected'}
          >
            <Pencil size={18} />
          </button>
          <button
            type="button"
            onClick={onDeleteSelected}
            disabled={selectedCount === 0}
            className={cn(
              'w-10 h-10 inline-flex items-center justify-center rounded-lg border transition-colors',
              selectedCount === 0
                ? 'border-gray-200 text-gray-300 bg-white cursor-not-allowed'
                : 'border-gray-200 text-gray-500 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200'
            )}
            title={selectedCount === 0 ? 'Select products to delete' : 'Delete selected'}
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 w-12">
                  <div
                    onClick={onToggleSelectAllVisible}
                    className={cn(
                      'w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer transition-all duration-200',
                      allVisibleSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-200 hover:border-blue-400'
                    )}
                    title="Select all on this page"
                  >
                    {allVisibleSelected && <Check size={14} className="text-white" />}
                    {someVisibleSelected && !allVisibleSelected && <div className="w-3 h-0.5 bg-blue-600 rounded" />}
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Inventory</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Color</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={cn(
                      'border-b border-gray-50 hover:bg-gray-50 transition-all duration-200 group',
                      selectedIds.includes(product.id) && 'bg-blue-50/30'
                    )}
                  >
                    <td className="px-6 py-4">
                      <div
                        onClick={() => onToggleSelect(product.id)}
                        className={cn(
                          'w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110',
                          selectedIds.includes(product.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-200'
                        )}
                      >
                        {selectedIds.includes(product.id) && <Check size={14} className="text-white" />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-xl object-cover shadow-sm border border-gray-100 sharp-img"
                        />
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'text-xs font-semibold px-2 py-1 rounded border',
                          product.inStock
                            ? product.id === 1
                              ? 'bg-purple-50 text-purple-600 border-purple-200'
                              : 'bg-green-50 text-green-600 border-green-200'
                            : 'bg-gray-100 text-gray-400 border-gray-200'
                        )}
                      >
                        {product.inventory}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.color}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">{product.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-800">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.votes.split(' ')[0]} Votes)</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                      <Search size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">No products found</h3>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your search query to find what you're looking for.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button
              onClick={() => onChangePage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onChangePage(page)}
                  className={cn(
                    'w-8 h-8 text-sm font-medium rounded-lg transition-all duration-200 flex-shrink-0 hover:scale-110 active:scale-90',
                    currentPage === page
                      ? 'text-white bg-[#5d87ff] shadow-md shadow-blue-100'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-[#5d87ff]'
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => onChangePage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="text-sm text-gray-500 whitespace-nowrap">{filteredCount} Results</div>
        </div>
      </div>
    </>
  );
}

