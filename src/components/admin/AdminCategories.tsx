import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const { categories } = useStore();
  const [catList, setCatList] = useState(categories);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const newCat = {
      id: catList.length + 1,
      name: newCatName,
      slug: newCatSlug || newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: 'Handcrafted luxury jewelry collection.',
      image: categories[0]?.image || '',
      count: 0,
      status: 'active' as const
    };
    setCatList([...catList, newCat]);
    setNewCatName('');
    setNewCatSlug('');
  };

  const handleDelete = (id: number) => {
    setCatList(catList.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 font-sans text-stone-200">
      <div className="pb-4 border-b border-[#2C2C2C]">
        <h2 className="font-serif text-2xl text-white">Collections & Categories</h2>
        <p className="text-xs text-stone-400">Organize and curate jewelry departments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Form: Add Category */}
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-5">
          <h3 className="font-serif text-lg text-white mb-4">Add New Category</h3>
          <form onSubmit={handleAdd} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-400 mb-1">Category Name</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => {
                  setNewCatName(e.target.value);
                  setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                }}
                placeholder="e.g. Brooches & Pins"
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Slug URL</label>
              <input
                type="text"
                required
                value={newCatSlug}
                onChange={(e) => setNewCatSlug(e.target.value)}
                placeholder="e.g. brooches-pins"
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white font-mono focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#B89B5E] text-[#111111] font-semibold hover:bg-[#D8C59B] transition-colors cursor-pointer"
            >
              Add Category
            </button>
          </form>
        </div>

        {/* Right List */}
        <div className="md:col-span-2 bg-[#1C1C1C] border border-[#2D2D2D] p-5">
          <h3 className="font-serif text-lg text-white mb-4">Existing Categories</h3>
          <div className="divide-y divide-[#2A2A2A]">
            {catList.map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif text-base text-white block">{c.name}</span>
                  <span className="text-[10px] text-stone-400 font-mono">/{c.slug} · {c.count} pieces</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-emerald-950/60 text-emerald-400 text-[10px] uppercase font-semibold border border-emerald-800">
                    {c.status}
                  </span>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-1 hover:text-red-400 text-stone-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
