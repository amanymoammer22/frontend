import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrlApi } from "../../store/authStore";
export default function Orders() {

const STATUS = ["pending", "processing", "shipped", "delivered", "cancelled"];

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [status, setStatus] = useState(""); // all
  const [q, setQ] = useState("");

  const limit = 10;

  const fetchOrders = async (p = 1, s = status, query = q) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("page", p);
      params.set("limit", limit);
      params.set("sort", "-createdAt");
      if (s) params.set("status", s);
      if (query) params.set("search", query);

      const res = await axios.get(`${backendUrlApi}api/v1/admin/orders?${params}`);
      setOrders(res.data?.data || []);
      setPages(res.data?.paginationResult?.numberOfPages || 1);
      setPage(p);
    } catch (e) {
      console.error(e);
      // بيانات تجريبية لو API مش جاهزة
      setOrders([]);
      setPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    fetchOrders(1);
  };

  const nextStatus = (s) => {
    const i = STATUS.indexOf(s);
    if (i < 0 || i >= STATUS.length - 2) return s; 
    return STATUS[i + 1];
    // pending -> processing -> shipped -> delivered
  };

  const updateStatus = async (id, current) => {
    const to = nextStatus(current);
    if (to === current) return;
    if (!confirm(`Move status from "${current}" to "${to}"?`)) return;
    try {
      await axios.patch(`${backendUrlApi}api/v1/admin/orders/${id}/status`, { status: to });
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: to } : o)));
    } catch {
      alert("Failed to update status");
    }
  };

  const cancelOrder = async (id) => {
    if (!confirm("Cancel this order?")) return;
    try {
      await axios.patch(`${backendUrlApi}api/v1/admin/orders/${id}/status`, { status: "cancelled" });
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: "cancelled" } : o)));
    } catch {
      alert("Failed to cancel order");
    }
  };

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });

  const empty = !loading && orders.length === 0;

  return (
      <div className="p-4 md:p-6 bg-[#f6e5cf] min-h-screen">
          <div className="rounded-xl bg-white/60 px-4 py-3 mb-4 text-gray-700 shadow-sm">
              <h2 className="text-lg font-semibold">Manage Orders</h2>
          </div>

          {/* Filters */}
          <form onSubmit={onSearch} className="flex flex-wrap items-center gap-2 mb-3">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by customer/email/phone…" className="flex-1 min-w-[220px] bg-white rounded-lg px-3 py-2 border" />
              <select
                  value={status}
                  onChange={(e) => {
                      setStatus(e.target.value);
                      fetchOrders(1, e.target.value, q);
                  }}
                  className="bg-white rounded-lg px-3 py-2 border">
                  <option value="">All statuses</option>
                  {STATUS.map((s) => (
                      <option key={s} value={s}>
                          {s}
                      </option>
                  ))}
              </select>
              <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                  Apply
              </button>
          </form>

          {/* Card */}
          <div className="rounded-2xl bg-white/70 shadow-sm p-3 md:p-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                  <span>🛒</span>
                  <span>Orders List</span>
              </div>

              <div className="overflow-hidden overflow-x-auto rounded-xl border border-gray-200 bg-white">
                  <div className="min-w-[900px] grid grid-cols-9 gap-2 bg-gray-100 text-gray-600 text-sm font-medium px-3 py-2">
                      <div>Order ID</div>
                      <div>Customer</div>
                      <div>Email</div>
                      <div>Phone</div>
                      <div className="text-center">Items</div>
                      <div className="text-right">Total</div>
                      <div>Status</div>
                      <div>Date</div>
                      <div className="text-center">Action</div>
                  </div>

                  {loading ? (
                      <div className="p-6 text-center text-gray-500">Loading…</div>
                  ) : empty ? (
                      <div className="p-10 text-center text-gray-400">
                          <div className="text-4xl mb-2">🛒</div>
                          No Orders Found
                      </div>
                  ) : (
                      orders.map((o) => (
                          <div key={o._id} className="grid grid-cols-9 gap-2 px-3 py-2 border-t text-sm items-center">
                              <div className="truncate">#{o.shortId || o._id?.slice(-6)}</div>
                              <div className="truncate">{o.customer?.name || "—"}</div>
                              <div className="truncate">{o.customer?.email || "—"}</div>
                              <div className="truncate">{o.customer?.phone || "—"}</div>
                              <div className="text-center">{o.items?.length ?? 0}</div>
                              <div className="text-right">${(o.total ?? 0).toFixed(2)}</div>
                              <div className="capitalize">{o.status || "pending"}</div>
                              <div>{fmtDate(o.createdAt || Date.now())}</div>
                              <div className="flex justify-center gap-2">
                                  <a href={`/admin/orders/${o._id}`} className="px-2 py-1 rounded-md bg-blue-600/10 text-blue-600 hover:bg-blue-600/20" title="View">
                                      🔍
                                  </a>
                                  <button
                                      onClick={() => updateStatus(o._id, o.status)}
                                      disabled={["delivered", "cancelled"].includes(o.status)}
                                      className="px-2 py-1 rounded-md bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600/20 disabled:opacity-40"
                                      title="Advance status">
                                      ✅
                                  </button>
                                  <button
                                      onClick={() => cancelOrder(o._id)}
                                      disabled={o.status === "cancelled"}
                                      className="px-2 py-1 rounded-md bg-rose-600/10 text-rose-600 hover:bg-rose-600/20 disabled:opacity-40"
                                      title="Cancel">
                                      🗑️
                                  </button>
                              </div>
                          </div>
                      ))
                  )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                  <button onClick={() => fetchOrders(Math.max(1, page - 1))} disabled={page <= 1} className="px-3 py-1 rounded border disabled:opacity-50 bg-white hover:bg-gray-50">
                      Prev
                  </button>
                  <span className="px-3 py-1 text-sm text-gray-600">
                      Page {page} of {pages}
                  </span>
                  <button onClick={() => fetchOrders(Math.min(pages, page + 1))} disabled={page >= pages} className="px-3 py-1 rounded border disabled:opacity-50 bg-white hover:bg-gray-50">
                      Next
                  </button>
              </div>
          </div>
      </div>
  );
}

