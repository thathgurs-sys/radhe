import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AlertTriangle, Plus, Minus } from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const { products, updateProduct, settings } = useStore();

  const handleAdjustStock = (productId: number, delta: number) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      updateProduct(productId, { stock: Math.max(0, prod.stock + delta) });
    }
  };

  return (
    <div className="space-y-6 font-sans text-stone-200">
      <div className="pb-4 border-b border-[#2C2C2C]">
        <h2 className="font-serif text-2xl text-white">Stock & Inventory Management</h2>
        <p className="text-xs text-stone-400">Monitor stock levels, safety thresholds, and restock units</p>
      </div>

      <div className="bg-[#1C1C1C] border border-[#2D2D2D] overflow-x-auto">
        <table className="w-full text-left text-xs text-stone-300">
          <thead className="bg-[#151515] text-[10px] uppercase tracking-wider text-stone-400 border-b border-[#2C2C2C]">
            <tr>
              <th className="py-3 px-4">Jewelry Piece</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Threshold</th>
              <th className="py-3 px-4">Current Stock</th>
              <th className="py-3 px-4">Stock Health</th>
              <th className="py-3 px-4 text-right">Quick Restock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {products.map((p) => {
              const isLow = p.stock <= p.lowStockThreshold;
              return (
                <tr key={p.id} className="hover:bg-[#222222]/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-9 h-9 object-cover border border-stone-800" />
                      <div>
                        <span className="font-medium text-white block">{p.name}</span>
                        <span className="text-[10px] text-stone-400">{p.material}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-400">{p.sku}</td>
                  <td className="py-3 px-4 text-stone-400">{p.categoryName}</td>
                  <td className="py-3 px-4 font-mono">{p.lowStockThreshold} units</td>
                  <td className="py-3 px-4 font-mono font-bold text-white text-sm">{p.stock}</td>
                  <td className="py-3 px-4">
                    {isLow ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-950/70 text-amber-300 border border-amber-800 text-[10px] font-semibold">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Low Stock</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[10px]">
                        Optimal
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center border border-[#3A3A3A] bg-[#141414]">
                      <button
                        onClick={() => handleAdjustStock(p.id, -1)}
                        className="px-2.5 py-1 text-stone-400 hover:text-white cursor-pointer"
                        title="Reduce 1"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono text-stone-200">{p.stock}</span>
                      <button
                        onClick={() => handleAdjustStock(p.id, 5)}
                        className="px-2.5 py-1 text-[#B89B5E] hover:text-white cursor-pointer"
                        title="Add +5"
                      >
                        +5
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
