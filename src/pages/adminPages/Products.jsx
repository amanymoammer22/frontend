import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrlApi } from "../../store/authStore";
import { FaEdit, FaShoppingBag, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import ProductItem from "./ProductItem";
import AddProduct from "./AddProduct";
export default function Products() {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [editProduct, setEditProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);


    const fetchProducts = async (currentPage = 1) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append("page", currentPage);
            params.append("limit", 8);
            const res = await axios.get(`${backendUrlApi}api/v1/products?${params.toString()}`);
           setProducts(res.data.data); 
        //    console.log(res.data.data);
          setPages(res.data.paginationResult?.numberOfPages || 1);
          setPage(currentPage);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);
  
  const onDelete = async (id) => {
      const ok = window.confirm("Are you sure you want to delete this product?");
      if (!ok) return;

      try {
          await axios.delete(`${backendUrlApi}api/v1/products/${id}`);
          setProducts((prev) => prev.filter((p) => p._id !== id));
          toast.success("✅ Product deleted successfully!");
      } catch (error) {
          console.error(error);
          toast.error("❌ Failed to delete! Please check the server.");
      }
  };

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  return (
      <div className="p-4 md:p-6 bg-[#f6e5cf] min-h-screen">
          {/* Header + Add */}
          <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Manage Products</h2>

              <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg shadow-sm">
                  + Add Product
              </button>
          </div>

          {/* Card */}
          <div className="rounded-2xl bg-white/70 shadow-sm p-8 md:p-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                  <span>
                      <FaShoppingBag />
                  </span>
                  <span>Products List</span>
              </div>

              {/* Table */}
              <div className="overflow-hidden overflow-x-auto rounded-xl border border-gray-200 bg-white">
                  <div className="min-w-[600px] grid grid-cols-[50px_120px_80px_100px_100px_100px] sm:grid-cols-6 gap-2 bg-gray-100 text-gray-600 text-sm font-medium px-3 py-2">
                      <div className="col-span-1">ID</div>
                      <div className="col-span-2">Image</div>
                      <div className="col-span-1">Price</div>
                      <div className="col-span-1  ">Created</div>
                      <div className="col-span-1 text-center">Actions</div>
                  </div>

                  {loading ? (
                      <div className="p-6 text-center text-gray-500">Loading…</div>
                  ) : products.length === 0 ? (
                      <div className="p-6 text-center text-gray-400">No products found</div>
                  ) : (
                      products.map((p, index) => (
                          <div key={p._id} className="grid  grid-cols-[50px_120px_80px_100px_100px_100px] sm:grid-cols-6  gap-2 px-3 py-2 border-t min-h-[50px] text-sm items-center">
                              <div className="col-span-1"> {(page - 1) * 8 + (index + 1)}</div>

                              <div className="col-span-2 flex items-center gap-3 truncate">
                                  <img
                                      src={p.imageCover.startsWith("./") ? `${backendUrlApi}${p.imageCover}` : `${backendUrlApi}/product/${p.imageCover}`}
                                      alt="product"
                                      className="w-14 h-14 rounded-lg object-cover border"
                                  />
                                  <div className="truncate text-gray-700">{p.title || "—"}</div>
                              </div>

                              <div className="col-span-1">{(p.price ?? 0).toFixed(2)}$</div>
                              <div className="col-span-1">{fmtDate(p.createdAt || Date.now())}</div>

                              <div className="col-span-1 flex justify-center gap-4">
                                  <button
                                      title="Edit"
                                      onClick={() => setEditProduct(p)} //
                                      className="p-2 rounded-md bg-blue-600/10 text-blue-600 hover:bg-blue-600/20">
                                      <FaEdit size={20} />
                                  </button>
                                  {editProduct && <ProductItem product={editProduct} setProducts={setProducts} onClose={() => setEditProduct(null)} />}

                                  <button title="Delete" onClick={() => onDelete(p._id)} className="p-2 rounded-md bg-rose-600/10 text-rose-600 hover:bg-rose-600/20">
                                      <FaTrashAlt size={16} />
                                  </button>
                              </div>

                              {showAddModal && <AddProduct onClose={() => setShowAddModal(false)} onProductAdded={(newProduct) => setProducts((prev) => [...prev, newProduct])} />}
                          </div>
                      ))
                  )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                  <button onClick={() => fetchProducts(Math.max(1, page - 1))} disabled={page <= 1} className="px-3 py-1 rounded border disabled:opacity-50 bg-white hover:bg-gray-50">
                      Prev
                  </button>
                  <span className="px-3 py-1 text-sm text-gray-600">
                      Page {page} of {pages}
                  </span>
                  <button onClick={() => fetchProducts(Math.min(pages, page + 1))} disabled={page >= pages} className="px-3 py-1 rounded border disabled:opacity-50 bg-white hover:bg-gray-50">
                      Next
                  </button>
              </div>
          </div>
      </div>
  );
}

