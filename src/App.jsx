import React, { useState } from 'react';
import { Folder, Home, Menu, Plus, Search, Tag, X } from 'lucide-react';

import DeleteModal from './components/DeleteModal';
import CategoriesPage from './pages/CategoriesPage';
import DashboardPage from './pages/DashboardPage';
import ProductFormPage from './pages/ProductFormPage';
import ProductsPage from './pages/ProductsPage';

import { cn } from './lib/cn';
import { logoImg, profileImg, img5 } from './data/images';
import { barData, categoriesSeed, lineData, productsSeed, topProductsData } from './data/seed';

function App() {
  const [selectedIds, setSelectedIds] = useState([1, 2, 3, 4]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const itemsPerPage = 5;

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Hoodies',
    inventory: '',
    color: 'White',
    price: '',
    rating: '5.0',
    votes: '0 Votes',
    image: img5,
    inStock: true
  });
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductImageUrl, setNewProductImageUrl] = useState('');
  const [newProductDiscountPrice, setNewProductDiscountPrice] = useState('');
  const [newProductCategories, setNewProductCategories] = useState({
    Women: false,
    Men: false,
    "T-Shirt": false,
    Hoodie: false,
    Dress: false,
  });
  const [newCategory, setNewCategory] = useState({
    name: '',
    items: 0,
    image: img5
  });
  const [allProducts, setAllProducts] = useState(productsSeed);
  const [allCategories, setAllCategories] = useState(categoriesSeed);

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = allCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const selectedCount = selectedIds.length;
  const allVisibleSelected =
    paginatedProducts.length > 0 && paginatedProducts.every((p) => selectedIds.includes(p.id));
  const someVisibleSelected =
    paginatedProducts.some((p) => selectedIds.includes(p.id)) && !allVisibleSelected;

  const toggleSelectAllVisible = () => {
    const visibleIds = paginatedProducts.map((p) => p.id);
    if (visibleIds.length === 0) return;

    if (visibleIds.every((id) => selectedIds.includes(id))) {
      setSelectedIds(selectedIds.filter((id) => !visibleIds.includes(id)));
      return;
    }

    const next = new Set([...selectedIds, ...visibleIds]);
    setSelectedIds(Array.from(next));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const safeImage =
      typeof newProductImageUrl === 'string' && newProductImageUrl.trim().length > 0
        ? newProductImageUrl.trim()
        : newProduct.image;

    if (editingProductId) {
      setAllProducts(allProducts.map((p) => (p.id === editingProductId ? { ...p, ...newProduct, image: safeImage } : p)));
    } else {
      const id = allProducts.length + 1;
      setAllProducts([...allProducts, { ...newProduct, id, image: safeImage }]);
    }
    setIsAddingProduct(false);
    setEditingProductId(null);
    setNewProduct({
      name: '',
      category: 'Hoodies',
      inventory: '',
      color: 'White',
      price: '',
      rating: '5.0',
      votes: '0 Votes',
      image: img5,
      inStock: true
    });
    setNewProductDescription('');
    setNewProductImageUrl('');
    setNewProductDiscountPrice('');
    setNewProductCategories({
      Women: false,
      Men: false,
      "T-Shirt": false,
      Hoodie: false,
      Dress: false,
    });
  };

  const openEditSelected = () => {
    if (selectedIds.length === 0) return;
    const id = selectedIds[0];
    const product = allProducts.find((p) => p.id === id);
    if (!product) return;

    setEditingProductId(id);
    setIsAddingProduct(true);
    setNewProduct({
      name: product.name ?? '',
      category: product.category ?? 'Hoodies',
      inventory: product.inventory ?? '',
      color: product.color ?? 'White',
      price: product.price ?? '',
      rating: product.rating ?? '5.0',
      votes: product.votes ?? '0 Votes',
      image: product.image ?? img5,
      inStock: product.inStock ?? true,
    });
    setNewProductDescription('');
    setNewProductImageUrl('');
    setNewProductDiscountPrice('');
    setNewProductCategories({
      Women: false,
      Men: false,
      "T-Shirt": false,
      Hoodie: false,
      Dress: false,
    });
  };

  const openDeleteModal = () => {
    if (selectedIds.length === 0) return;
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const confirmDeleteSelected = () => {
    if (selectedIds.length === 0) {
      setIsDeleteModalOpen(false);
      return;
    }

    const nextProducts = allProducts.filter((p) => !selectedIds.includes(p.id));
    setAllProducts(nextProducts);
    setSelectedIds([]);
    setIsDeleteModalOpen(false);

    const nextFilteredCount = nextProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).length;
    const nextTotalPages = Math.max(1, Math.ceil(nextFilteredCount / itemsPerPage));
    setCurrentPage((prev) => Math.min(prev, nextTotalPages));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setAllCategories(allCategories.map(cat => cat.id === editingCategory.id ? { ...newCategory, id: cat.id } : cat));
      setEditingCategory(null);
    } else {
      const id = allCategories.length + 1;
      setAllCategories([...allCategories, { ...newCategory, id }]);
    }
    setIsAddingCategory(false);
    setNewCategory({
      name: '',
      items: 0,
      image: img5
    });
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      items: category.items,
      image: category.image
    });
    setIsAddingCategory(true);
  };

  return (
    <div className="flex min-h-screen bg-[#f4f6f9] relative overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 transform lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logoImg} alt="Modernize Logo" className="w-full h-full object-contain sharp-img" />
            </div>
            <span className="text-xl font-bold text-gray-800">Modernize</span>
          </div>
          <button className="lg:hidden p-2 text-gray-500" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <button
            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold rounded-lg transition-all duration-200",
              activeTab === 'dashboard' ? "text-white bg-[#2a6aff] shadow-lg shadow-blue-100" : "text-gray-500 hover:bg-blue-50 hover:text-[#2a6aff]"
            )}
          >
            <Home size={18} />
            Dashboard
          </button>

          <button
            onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold rounded-lg transition-all duration-200",
              activeTab === 'products' ? "text-white bg-[#2a6aff] shadow-lg shadow-blue-100" : "text-gray-500 hover:bg-blue-50 hover:text-[#2a6aff]"
            )}
          >
            <Tag size={18} />
            Products
          </button>
          <button
            onClick={() => { setActiveTab('categories'); setIsSidebarOpen(false); }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold rounded-lg transition-all duration-200",
              activeTab === 'categories' ? "text-white bg-[#2a6aff] shadow-lg shadow-blue-100" : "text-gray-500 hover:bg-blue-50 hover:text-[#2a6aff]"
            )}
          >
            <Folder size={18} />
            Categories
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full min-w-0 bg-[#f4f6f9]">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center sticky top-0 z-40">
          <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <button
                className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={20} />
              </button>
              <div className="relative w-full max-w-xs lg:max-w-md group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5d87ff] transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#5d87ff] focus:ring-4 focus:ring-blue-500/10 transition-all text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 hidden sm:inline-block">Julia Roberts</span>
              <div className="relative group cursor-pointer">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-[#5d87ff] transition-all sharp-img"
                />
                <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area with Wrapper */}
        <div className="w-full max-w-[1600px] mx-auto p-4 lg:p-8">
          {activeTab === 'dashboard' && (
            <DashboardPage lineData={lineData} barData={barData} topProductsData={topProductsData} />
          )}

          {activeTab === 'products' && (
            <>
              {!isAddingProduct ? (
                <ProductsPage
                  paginatedProducts={paginatedProducts}
                  filteredCount={filteredProducts.length}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  selectedIds={selectedIds}
                  allVisibleSelected={allVisibleSelected}
                  someVisibleSelected={someVisibleSelected}
                  onToggleSelectAllVisible={toggleSelectAllVisible}
                  onToggleSelect={toggleSelect}
                  onChangePage={setCurrentPage}
                  onAddProduct={() => { setIsAddingProduct(true); setEditingProductId(null); }}
                  onEditSelected={openEditSelected}
                  onDeleteSelected={openDeleteModal}
                />
              ) : (
                <ProductFormPage
                  mode={editingProductId ? 'edit' : 'add'}
                  product={newProduct}
                  description={newProductDescription}
                  imageUrl={newProductImageUrl}
                  discountPrice={newProductDiscountPrice}
                  categories={newProductCategories}
                  onChangeProduct={setNewProduct}
                  onChangeDescription={setNewProductDescription}
                  onChangeImageUrl={setNewProductImageUrl}
                  onChangeDiscountPrice={setNewProductDiscountPrice}
                  onChangeCategories={setNewProductCategories}
                  onBack={() => { setIsAddingProduct(false); setEditingProductId(null); }}
                  onSubmit={handleAddProduct}
                />
              )}

              <DeleteModal
                open={isDeleteModalOpen}
                selectedCount={selectedCount}
                onCancel={closeDeleteModal}
                onConfirm={confirmDeleteSelected}
              />
            </>
          )}

          {activeTab === 'categories' && (
            <>
              <CategoriesPage
                categories={filteredCategories}
                onAddClick={() => {
                  setEditingCategory(null);
                  setNewCategory({ name: '', items: 0, image: img5 });
                  setIsAddingCategory(true);
                }}
                onEdit={handleEditClick}
              />

              {isAddingCategory && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                  <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-800">
                        {editingCategory ? 'Edit Category' : 'Add New Category'}
                      </h3>
                      <button
                        onClick={() => setIsAddingCategory(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Plus size="20" className="rotate-45" />
                      </button>
                    </div>
                    <form onSubmit={handleAddCategory} className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                        <input
                          required
                          type="text"
                          value={newCategory.name}
                          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                          placeholder="e.g. Winter Collection"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Items Count</label>
                        <input
                          required
                          type="number"
                          value={newCategory.items}
                          onChange={(e) => setNewCategory({ ...newCategory, items: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setIsAddingCategory(false)}
                          className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-4 py-2 bg-[#5d87ff] text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all shadow-md shadow-blue-100"
                        >
                          {editingCategory ? 'Update Category' : 'Save Category'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
