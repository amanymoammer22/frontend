
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrlApi } from "../../store/authStore";
export default function AddItem() {


  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrlApi}api/v1/admin/items?sort=-createdAt`);
      setItems(res.data?.data || []);
    } catch (e) {
      console.error(e);
      // بيانات تجريبية لو API مش جاهزة
      setItems([
        {
          _id: "1",
          description: "Traditional accessories",
          price: 30,
          productsCount: 1,
          createdAt: "2025-08-30T00:00:00.000Z",
        },
        {
          _id: "2",
          description: "Hand-embroidered tops",
          price: 10,
          productsCount: 0,
          createdAt: "2025-08-30T00:00:00.000Z",
        },
        {
          _id: "3",
          description: "Embroidered home decoration",
          price: 40,
          productsCount: 3,
          createdAt: "2025-08-30T00:00:00.000Z",
        },
        {
          _id: "4",
          description: "Traditional Palestinian dress",
          price: 55,
          productsCount: 0,
          createdAt: "2025-08-30T00:00:00.000Z",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  const onDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await axios.delete(`${backendUrlApi}api/v1/admin/items/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch {
      alert("Failed to delete item");
    }
  };

  return (
      <div className="p-4 md:p-6 bg-[#f6e5cf] min-h-screen">
          <div className="rounded-xl bg-white/60 px-4 py-3 mb-4 text-gray-700 shadow-sm">
              <h2 className="text-lg font-semibold">Manage Items</h2>
          </div>

          <div className="rounded-2xl bg-white/70 shadow-sm p-3 md:p-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                  <span>📋</span>
                  <span>Items List</span>
              </div>

              <div className="overflow-hidden overflow-x-auto rounded-xl border border-gray-200 bg-white">
                  <div className="grid sm:grid-cols-6  grid-cols-[50px_120px_80px_100px_100px_100px] gap-2 bg-gray-100 text-gray-600 text-sm font-medium px-3 py-2">
                      <div>ID</div>
                      <div>Description</div>
                      <div>Price</div>
                      <div>Products</div>
                      <div>Created</div>
                      <div className="text-center">Actions</div>
                  </div>

                  {loading ? (
                      <div className="p-6 text-center text-gray-500">Loading…</div>
                  ) : items.length === 0 ? (
                      <div className="p-6 text-center text-gray-400">No items found</div>
                  ) : (
                      items.map((it, i) => (
                          <div key={it._id} className="grid sm:grid-cols-6  grid-cols-[50px_120px_80px_100px_100px_100px] gap-2 px-3 py-2 border-t text-sm items-center">
                              <div>#{i + 1}</div>
                              <div>{it.description}</div>
                              <div>{(it.price ?? 0).toFixed(2)}$</div>
                              <div>
                                  <span className="px-2 py-1 bg-sky-500 text-white text-xs rounded-full">{it.productsCount} Products</span>
                              </div>
                              <div>{fmtDate(it.createdAt || Date.now())}</div>
                              <div className="flex justify-center gap-2">
                                  <a href={`/admin/items/${it._id}`} className="p-2 rounded-md bg-blue-600/10 text-blue-600 hover:bg-blue-600/20" title="Edit">
                                      ✏️
                                  </a>
                                  <button onClick={() => onDelete(it._id)} className="p-2 rounded-md bg-rose-600/10 text-rose-600 hover:bg-rose-600/20" title="Delete">
                                      🗑️
                                  </button>
                              </div>
                          </div>
                      ))
                  )}
              </div>
          </div>
      </div>
  );
}
