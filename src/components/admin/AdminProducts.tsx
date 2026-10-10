import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { Plus, Edit2, Trash2, Search, Check, X, Eye } from 'lucide-react';
import heroImage from '../../assets/images/hero_diamond_pendant_1791612732695.jpg';

export const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, settings } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [price, setPrice] = useState(10000);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState(10);
  const [material, setMaterial] = useState('18K Yellow Gold');
  const [weight, setWeight] = useState('3.5g');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);

  const filtered = products.filter((p) => {
    if (selectedCat !== 'all' && p.categoryId !== Number(selectedCat)) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setSku(`ELN-${Math.floor(100 + Math.random() * 900)}`);
    setCategoryId(categories[0]?.id || 1);
    setPrice(9500);
    setSalePrice(undefined);
    setStock(10);
    setMaterial('18K Yellow Gold');
    setWeight('3.2g');
    setDescription('Handcrafted fine jewelry with ethically sourced stones and hallmarked gold.');
    setIsFeatured(false);
    setIsBestseller(false);
    setIsNewArrival(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setSku(p.sku);
    setCategoryId(p.categoryId);
    setPrice(p.price);
    setSalePrice(p.salePrice);
    setStock(p.stock);
    setMaterial(p.material);
    setWeight(p.weight);
    setDescription(p.description);
    setIsFeatured(p.isFeatured);
    setIsBestseller(p.isBestseller);
    setIsNewArrival(p.isNewArrival);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === Number(categoryId));

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        sku,
        categoryId: Number(categoryId),
        categoryName: cat?.name || 'Jewelry',
        price: Number(price),
        salePrice: salePrice ? Number(salePrice) : undefined,
        stock: Number(stock),
        material,
        weight,
        description,
        isFeatured,
        isBestseller,
        isNewArrival
      });
    } else {
      addProduct({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        sku,
        categoryId: Number(categoryId),
        categoryName: cat?.name || 'Jewelry',
        shortDescription: description.substring(0, 80) + '...',
        description,
        price: Number(price),
        salePrice: salePrice ? Number(salePrice) : undefined,
        stock: Number(stock),
        lowStockThreshold: 3,
        material,
        weight,
        image: heroImage,
        isFeatured,
        isBestseller,
        isNewArrival,
        status: 'active',
        rating: 5.0,
        reviewCount: 1
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans text-stone-200">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2C2C2C]">
        <div>
          <h2 className="font-serif text-2xl text-white">Product Catalog Management</h2>
          <p className="text-xs text-stone-400">Total {products.length} jewelry creations in inventory</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#B89B5E] text-[#111111] text-xs uppercase tracking-wider font-semibold hover:bg-[#D8C59B] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1C1C1C] p-4 border border-[#2D2D2D]">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search name, SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-400">Category:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-1.5 text-xs bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-[#1C1C1C] border border-[#2D2D2D] overflow-x-auto">
        <table className="w-full text-left text-xs text-stone-300">
          <thead className="bg-[#151515] text-[10px] uppercase tracking-wider text-stone-400 border-b border-[#2C2C2C]">
            <tr>
              <th className="py-3 px-4">Piece</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Flags</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-[#222222]/50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 object-cover border border-stone-800" />
                    <div>
                      <span className="font-serif text-sm text-white block">{p.name}</span>
                      <span className="text-[10px] text-stone-400">{p.material}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-stone-300">{p.sku}</td>
                <td className="py-3 px-4 text-stone-400">{p.categoryName}</td>
                <td className="py-3 px-4">
                  <span className="font-serif text-white tabular-nums">
                    {settings.currencySymbol}{(p.salePrice || p.price).toLocaleString('en-IN')}
                  </span>
                  {p.salePrice && (
                    <span className="text-[10px] text-stone-500 line-through block">
                      {settings.currencySymbol}{p.price.toLocaleString('en-IN')}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 font-mono">
                  <span className={`px-2 py-0.5 text-[10px] ${p.stock <= p.lowStockThreshold ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'text-emerald-400'}`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-1">
                    {p.isFeatured && <span className="px-1.5 py-0.5 bg-[#2B2B2B] text-[9px] text-[#B89B5E]">Featured</span>}
                    {p.isBestseller && <span className="px-1.5 py-0.5 bg-[#2B2B2B] text-[9px] text-stone-300">Bestseller</span>}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => updateProduct(p.id, { status: p.status === 'active' ? 'inactive' : 'active' })}
                    className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold cursor-pointer ${
                      p.status === 'active' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {p.status}
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 hover:text-[#B89B5E] text-stone-400 transition-colors cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                          deleteProduct(p.id);
                        }
                      }}
                      className="p-1.5 hover:text-red-400 text-stone-400 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1C1C] border border-[#333333] max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#2C2C2C]">
              <h3 className="font-serif text-2xl text-white">
                {editingProduct ? 'Edit Jewelry Piece' : 'Add New Jewelry Creation'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white font-mono focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Retail Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Sale Price (₹ Optional)</label>
                  <input
                    type="number"
                    value={salePrice || ''}
                    onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Leave empty if none"
                    className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Metal / Material</label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Approx. Weight</label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-[#B89B5E]"
                  />
                  <span>Featured Product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="accent-[#B89B5E]"
                  />
                  <span>Bestseller</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="accent-[#B89B5E]"
                  />
                  <span>New Arrival</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#2C2C2C]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#383838] text-stone-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#B89B5E] text-[#111111] font-semibold hover:bg-[#D8C59B] cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
