import React from 'react';
import { Pencil, Plus, Search } from 'lucide-react';
import { cn } from '../lib/cn';

export default function CategoriesPage({ categories, onAddClick, onEdit }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-sm text-gray-400 mt-1">{categories.length} categories found</p>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-[#2a6aff] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus size={18} strokeWidth={3} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat.id}
              className={cn(
                'bg-white rounded-xl shadow-sm border overflow-hidden group cursor-pointer transition-all duration-300',
                cat.active ? 'border-[#2a6aff] ring-1 ring-[#2a6aff]' : 'border-gray-100'
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 sharp-img"
                />
                <div
                  className={cn(
                    'absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity duration-300',
                    cat.showEdit ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  )}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(cat);
                    }}
                    className="bg-white text-[#2a6aff] px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-2xl hover:bg-gray-50 transition-all scale-95 group-hover:scale-100 border border-gray-100"
                  >
                    <Pencil size={16} strokeWidth={3} className="text-[#2a6aff]" />
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-5 border-t border-gray-50">
                <h3 className="font-bold text-gray-800 text-base">{cat.name}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{cat.items} items</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No categories found</h3>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your search query to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}

