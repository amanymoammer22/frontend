import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrlApi } from "../../store/authStore";
import {  FaShoppingBag, FaTimes } from "react-icons/fa";
export default function Dashboard() {

function StatCard({ icon, value, label, color }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/60 shadow-sm px-4 py-3">
      <div className={`w-10 h-10 rounded-full grid place-items-center text-white ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold leading-tight">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ products: 0, orders: 0, pending: 0, revenue: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {

        const [statsRes, ordersRes] = await Promise.all([
          axios.get(`${backendUrlApi}api/v1/admin/stats`),
          axios.get(`${backendUrlApi}api/v1/admin/orders?limit=5&sort=-createdAt`)
        ]);
        if (!mounted) return;
        setStats({
          products: statsRes.data?.products ?? 0,
          orders: statsRes.data?.totalOrders ?? 0,
          pending: statsRes.data?.pendingOrders ?? 0,
          revenue: statsRes.data?.revenue ?? 0,
        });
        setRecent(ordersRes.data?.data ?? []);
      } catch {
        // 
        if (!mounted) return;
        setStats({ products: 1, orders: 0, pending: 0, revenue: 0 });
        setRecent([]); //     
      } finally {
        mounted = false;
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
      <div className="p-10  md:p-6 bg-[var(--bg-footer)] min-h-screen">
          <div className="rounded-xl bg-white/60 px-4 py-3 mb-5 flex justify-between items-center shadow-sm">
              <h2 className="text-lg font-semibold text-black">Dashboard</h2>
              <span className="text-sm text-gray-500">welcome, Artisan!</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard icon={<span className="text-xl">🧵</span>} value={stats.products} label="Total Products" color="bg-orange-400" />
              <StatCard
                  icon={
                      <span className="text-xl">
                          <FaShoppingBag size={20} />
                      </span>
                  }
                  value={stats.orders}
                  label="Total Orders"
                  color="bg-green-500"
              />
              <StatCard icon={<span className="text-xl">📦</span>} value={stats.pending} label="Pending Orders" color="bg-purple-500" />
              <StatCard icon={<span className="text-xl">💳</span>} value={`${stats.revenue} $`} label="Total Revenue" color="bg-sky-500" />
          </div>

          {/* Recent Orders */}
          <div className="rounded-xl bg-white/70 shadow-sm p-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                  <span className="text-lg">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                          <path
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="32"
                              d="M112.91 128A191.85 191.85 0 0 0 64 254c-1.18 106.35 85.65 193.8 192 194 106.2.2 192-85.83 192-192 0-104.54-83.55-189.61-187.5-192a4.36 4.36 0 0 0-4.5 4.37V152"></path>
                          <path d="m233.38 278.63-79-113a8.13 8.13 0 0 1 11.32-11.32l113 79a32.5 32.5 0 0 1-37.25 53.26 33.21 33.21 0 0 1-8.07-7.94z"></path>
                      </svg>
                  </span>
                  <span>Recent Orders</span>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <div className="grid grid-cols-5 gap-2 bg-gray-100 text-gray-600 text-sm font-medium px-3 py-2">
                      <div>Order ID</div>
                      <div>Customer</div>
                      <div>Amount</div>
                      <div>Status</div>
                      <div>Date</div>
                  </div>

                  {loading ? (
                      <div className="p-6 text-center text-gray-500">Loading…</div>
                  ) : recent.length === 0 ? (
                      <div className="p-6 text-center text-gray-400">No orders found</div>
                  ) : (
                      recent.map((o) => (
                          <div key={o._id} className="grid grid-cols-5 gap-2 px-3 py-2 border-t text-sm">
                              <div className="truncate">#{o.shortId || o._id.slice(-6)}</div>
                              <div className="truncate">{o.customer?.name || "—"}</div>
                              <div>${(o.total || 0).toFixed?.(2) ?? o.total}</div>
                              <div className="capitalize">{o.status || "pending"}</div>
                              <div>{new Date(o.createdAt).toLocaleDateString()}</div>
                          </div>
                      ))
                  )}
              </div>

              <div className="flex justify-center mt-4">
                  <a href="/admin/orders" className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                      view All Orders
                  </a>
              </div>
          </div>
      </div>
  );
}
