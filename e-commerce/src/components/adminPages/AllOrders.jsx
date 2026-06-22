
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api, { BASE_URL } from "../../utils/api";

const STATUS_CONFIG = {
  pending:   { label: "Pending",   bg: "#FAEEDA", color: "#854F0B", dot: "#EF9F27" },
  shipped:   { label: "Shipped",   bg: "#E6F1FB", color: "#185FA5", dot: "#378ADD" },
  delivered: { label: "Delivered", bg: "#EAF3DE", color: "#3B6D11", dot: "#639922" },
  cancelled: { label: "Cancelled", bg: "#FCEBEB", color: "#A32D2D", dot: "#E24B4A" },
};

const PAYMENT_CONFIG = {
  pending:   { label: "Pending",   bg: "#FAEEDA", color: "#854F0B", dot: "#EF9F27" },
  completed: { label: "Completed", bg: "#EAF3DE", color: "#3B6D11", dot: "#639922" },
  failed:    { label: "Failed",    bg: "#FCEBEB", color: "#A32D2D", dot: "#E24B4A" },
};

const StatusBadge = ({ status, configMap }) => {
  const cfg = configMap[status] || { label: status, bg: "#F1EFE8", color: "#5F5E5A", dot: "#888780" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500,
      background: cfg.bg, color: cfg.color,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
};

const StatusSelect = ({ value, onChange, disabled, options }) => (
  <select
    value={value}
    onChange={onChange}
    disabled={disabled}
    style={{
      border: "1px solid #d1d5db", borderRadius: 8,
      padding: "6px 10px", fontSize: 13,
      background: "#fff", color: "#111",
      cursor: disabled ? "not-allowed" : "pointer",
      outline: "none", appearance: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center",
      paddingRight: 28, minWidth: 130,
    }}
  >
    {options.map((o) => (
      <option key={o.value} value={o.value}>{o.label}</option>
    ))}
  </select>
);

const ORDER_STATUS_OPTIONS = [
  { value: "pending",   label: "Pending" },
  { value: "shipped",   label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const PAYMENT_STATUS_OPTIONS = [
  { value: "pending",   label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "failed",    label: "Failed" },
];

const SkeletonCard = () => (
  <div style={{
    background: "#fff", border: "1px solid #e5e7eb",
    borderRadius: 12, padding: 16,
    animation: "pulse 1.5s ease-in-out infinite",
  }}>
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ width: 60, height: 60, borderRadius: 8, background: "#f3f4f6" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ height: 14, width: "60%", borderRadius: 4, background: "#f3f4f6" }} />
        <div style={{ height: 12, width: "40%", borderRadius: 4, background: "#f3f4f6" }} />
        <div style={{ height: 20, width: 80, borderRadius: 20, background: "#f3f4f6" }} />
      </div>
    </div>
  </div>
);

function AllOrders() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [updatingPaymentId, setUpdatingPaymentId] = useState(null);

  const handleAllOrders = async () => {
    try {
      const res = await api.get("/api/allOrderDetailsForAdmin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.allData || [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const { data: allData = [], isLoading } = useQuery({
    queryKey: ["allOrders"],
    queryFn: handleAllOrders,
  });

  // ORDER STATUS MUTATION
  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await api.put(
        `/api/updateOrderStatus/${id}`,
        { order_status: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allOrders"]);
      setUpdatingOrderId(null);
    },
    onError: () => setUpdatingOrderId(null),
  });

  // PAYMENT STATUS MUTATION
  const updatePaymentStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await api.put(
        `/api/updatePaymentStatus/${id}`,
        { payment_status: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allOrders"]);
      setUpdatingPaymentId(null);
    },
    onError: () => setUpdatingPaymentId(null),
  });

  const handleOrderStatusChange = (order, newStatus) => {
    if (!window.confirm(`Update order #${order.id} status to "${newStatus}"?`)) return;
    setUpdatingOrderId(order.id);
    updateOrderStatusMutation.mutate({ id: order.id, status: newStatus });
  };

  const handlePaymentStatusChange = (order, newStatus) => {
    if (!window.confirm(`Update payment status of order #${order.id} to "${newStatus}"?`)) return;
    setUpdatingPaymentId(order.id);
    updatePaymentStatusMutation.mutate({ id: order.id, status: newStatus });
  };

  const filtered = allData.filter((o) => {
    const matchStatus = filterStatus === "all" || o.order_status === filterStatus;
    const matchSearch =
      searchTerm === "" ||
      String(o.product_id).includes(searchTerm) ||
      String(o.id).includes(searchTerm);
    return matchStatus && matchSearch;
  });

  const counts = allData.reduce((acc, o) => {
    acc[o.order_status] = (acc[o.order_status] || 0) + 1;
    return acc;
  }, {});

  const summaryCards = [
    { label: "All Orders", value: allData.length,        key: "all",       dot: "#888780" },
    { label: "Pending",    value: counts.pending || 0,   key: "pending",   dot: "#EF9F27" },
    { label: "Shipped",    value: counts.shipped || 0,   key: "shipped",   dot: "#378ADD" },
    { label: "Delivered",  value: counts.delivered || 0, key: "delivered", dot: "#639922" },
    { label: "Cancelled",  value: counts.cancelled || 0, key: "cancelled", dot: "#E24B4A" },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-3">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "20px 16px" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .order-card { animation: fadeIn 0.25s ease both; }
        .order-row:hover td { background: #f9fafb !important; }
        .filter-btn {
          cursor: pointer; border: 1px solid #e5e7eb; background: #fff;
          color: #6b7280; border-radius: 20px; padding: 5px 14px;
          font-size: 13px; transition: all .15s;
        }
        .filter-btn:hover { border-color: #9ca3af; color: #111; }
        .filter-btn.active { background: #111; color: #fff; border-color: #111; }
        .search-input {
          border: 1px solid #e5e7eb; border-radius: 8px;
          padding: 8px 12px 8px 36px; font-size: 14px;
          background: #fff; color: #111; width: 100%;
          box-sizing: border-box; outline: none; transition: border-color .15s;
        }
        .search-input:focus { border-color: #6b7280; }
        .summary-card {
          cursor: pointer; transition: transform .15s;
          border-radius: 10px; padding: 14px 16px;
          border: 1px solid #e5e7eb; background: #fff;
        }
        .summary-card:hover { transform: translateY(-2px); }
        .summary-card.active { border-color: #374151; background: #f9fafb; }
        @media (min-width: 768px) {
          .mobile-cards { display: none !important; }
          .desktop-table { display: block !important; }
        }
        @media (max-width: 767px) {
          .desktop-table { display: none !important; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#111827" }}>
          Orders Management
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>
          View and update all customer orders
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: 10, marginBottom: 18,
      }}>
        {summaryCards.map((s) => (
          <div
            key={s.key}
            className={`summary-card${filterStatus === s.key ? " active" : ""}`}
            onClick={() => setFilterStatus(s.key)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#6b7280" }}>{s.label}</span>
            </div>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 600, color: "#111827" }}>
              {isLoading ? "—" : s.value}
            </p>
          </div>
        ))}
      </div>

      {/* SEARCH + FILTER PILLS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 16 }}>
        <div style={{ position: "relative", flex: "1 1 200px", minWidth: 180 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search by order or product ID…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {summaryCards.map((s) => (
            <button
              key={s.key}
              className={`filter-btn${filterStatus === s.key ? " active" : ""}`}
              onClick={() => setFilterStatus(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* LOADING SKELETONS */}
      {isLoading && (
        <div style={{ display: "grid", gap: 10 }}>
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && filtered.length === 0 && (
        <div style={{
          background: "#fff", border: "1px solid #e5e7eb",
          borderRadius: 12, padding: "48px 24px",
          textAlign: "center", color: "#9ca3af", fontSize: 14,
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }}>
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          No orders found
          {(filterStatus !== "all" || searchTerm) && (
            <button
              onClick={() => { setFilterStatus("all"); setSearchTerm(""); }}
              style={{ display: "block", margin: "10px auto 0", background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: 13 }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* MOBILE CARDS */}
      {!isLoading && filtered.length > 0 && (
        <div className="mobile-cards" style={{ display: "grid", gap: 10 }}>
          {filtered.map((order, i) => (
            <div
              key={order.id}
              className="order-card"
              style={{
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: 12, padding: 16,
                animationDelay: `${i * 30}ms`,
                opacity: (updatingOrderId === order.id || updatingPaymentId === order.id) ? 0.6 : 1,
                transition: "opacity .2s",
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <img
                  src={`${BASE_URL}/${order.image_path}`}
                  alt="product"
                  style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover", flexShrink: 0, border: "1px solid #e5e7eb" }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#111827" }}>
                        Order #{order.id}
                      </p>
                      <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>
                        Product #{order.product_id} · Qty {order.quantity}
                      </p>
                    </div>
                    <StatusBadge status={order.order_status} configMap={STATUS_CONFIG} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <StatusBadge status={order.payment_status} configMap={PAYMENT_CONFIG} />
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>payment</span>
                  </div>
                  <p style={{ margin: "8px 0 0", fontSize: 15, fontWeight: 600, color: "#111827" }}>
                    ₹{order.total_price}
                  </p>
                </div>
              </div>

              {/* ORDER STATUS UPDATE */}
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "#6b7280", flexShrink: 0 }}>Order:</span>
                <StatusSelect
                  value={order.order_status}
                  disabled={updatingOrderId === order.id}
                  options={ORDER_STATUS_OPTIONS}
                  onChange={(e) => handleOrderStatusChange(order, e.target.value)}
                />
                {updatingOrderId === order.id && (
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>Saving…</span>
                )}
              </div>

              {/* PAYMENT STATUS UPDATE */}
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "#6b7280", flexShrink: 0 }}>Payment:</span>
                <StatusSelect
                  value={order.payment_status}
                  disabled={updatingPaymentId === order.id}
                  options={PAYMENT_STATUS_OPTIONS}
                  onChange={(e) => handlePaymentStatusChange(order, e.target.value)}
                />
                {updatingPaymentId === order.id && (
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>Saving…</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DESKTOP TABLE */}
      {!isLoading && filtered.length > 0 && (
        <div
          className="desktop-table"
          style={{
            background: "#fff", border: "1px solid #e5e7eb",
            borderRadius: 12, overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  {["Image", "Order", "Product", "Qty", "Price", "Total", "Order Status", "Payment Status", "Update Order", "Update Payment"].map((h) => (
                    <th key={h} style={{
                      padding: "12px 14px", textAlign: "left", fontWeight: 500,
                      fontSize: 12, color: "#6b7280", whiteSpace: "nowrap",
                      background: "#f9fafb",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => (
                  <tr
                    key={order.id}
                    className="order-row"
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      opacity: (updatingOrderId === order.id || updatingPaymentId === order.id) ? 0.6 : 1,
                      transition: "opacity .2s",
                      animation: "fadeIn .2s ease both",
                      animationDelay: `${i * 20}ms`,
                    }}
                  >
                    <td style={{ padding: "10px 14px" }}>
                      <img
                        src={`${BASE_URL}/${order.image_path}`}
                        alt=""
                        style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", border: "1px solid #e5e7eb", display: "block" }}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </td>
                    <td style={{ padding: "10px 14px", color: "#9ca3af", fontFamily: "monospace", fontSize: 12 }}>
                      #{order.id}
                    </td>
                    <td style={{ padding: "10px 14px", fontWeight: 500, color: "#111827" }}>
                      #{order.product_id}
                    </td>
                    <td style={{ padding: "10px 14px", color: "#6b7280" }}>
                      {order.quantity}
                    </td>
                    <td style={{ padding: "10px 14px", color: "#6b7280" }}>
                      ₹{order.price}
                    </td>
                    <td style={{ padding: "10px 14px", fontWeight: 600, color: "#111827" }}>
                      ₹{order.total_price}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <StatusBadge status={order.order_status} configMap={STATUS_CONFIG} />
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <StatusBadge status={order.payment_status} configMap={PAYMENT_CONFIG} />
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <StatusSelect
                          value={order.order_status}
                          disabled={updatingOrderId === order.id}
                          options={ORDER_STATUS_OPTIONS}
                          onChange={(e) => handleOrderStatusChange(order, e.target.value)}
                        />
                        {updatingOrderId === order.id && (
                          <span style={{ fontSize: 11, color: "#9ca3af" }}>Saving…</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <StatusSelect
                          value={order.payment_status}
                          disabled={updatingPaymentId === order.id}
                          options={PAYMENT_STATUS_OPTIONS}
                          onChange={(e) => handlePaymentStatusChange(order, e.target.value)}
                        />
                        {updatingPaymentId === order.id && (
                          <span style={{ fontSize: 11, color: "#9ca3af" }}>Saving…</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{
            padding: "10px 14px", borderTop: "1px solid #e5e7eb",
            fontSize: 12, color: "#9ca3af", background: "#f9fafb",
          }}>
            Showing {filtered.length} of {allData.length} orders
          </div>
        </div>
      )}
    </div>
  );
}

export default AllOrders;
// // import React from "react";
// // import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // import api,{BASE_URL} from "../../utils/api";

// // function AllOrders() {
// //   const token = localStorage.getItem("token");
// //   const queryClient = useQueryClient();

// //   // FETCH ORDERS
// //   const handleAllOrders = async () => {
// //     try {
// //       const res = await api.get("/api/allOrderDetailsForAdmin", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       console.log("orders",res.data.allData)
// //       return res.data.allData || [];
// //     } catch (err) {
// //       console.log(err);
// //       return [];
// //     }
// //   };

// //   const { data: allData = [], isLoading } = useQuery({
// //     queryKey: ["allOrders"],
// //     queryFn: handleAllOrders,
// //     staleTime: 1000 * 60 * 5,
// //     cacheTime: 1000 * 60 * 10,
// //   });

// //   // UPDATE ORDER STATUS
// //   const updateStatusMutation = useMutation({
// //     mutationFn: async ({ id, status }) => {
// //       const res = await api.put(
// //         `/api/updateOrderStatus/${id}`,
// //         { order_status: status },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       return res.data;
// //     },
// //     onSuccess: () => {
// //       queryClient.invalidateQueries(["allOrders"]);
// //     },
// //   });

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "pending":
// //         return "bg-yellow-100 text-yellow-700";
// //       case "shipped":
// //         return "bg-blue-100 text-blue-700";
// //       case "delivered":
// //         return "bg-green-100 text-green-700";
// //       case "cancelled":
// //         return "bg-red-100 text-red-700";
// //       default:
// //         return "bg-gray-100 text-gray-700";
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="p-10 text-center text-lg font-semibold">
// //         Loading Orders...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-3 sm:p-5 md:p-8 bg-gray-100 min-h-screen">
// //       <h1 className="text-2xl font-bold mb-6">All Orders</h1>

// //       {/* MOBILE CARD VIEW */}
// //       <div className="grid gap-4 md:hidden">
// //         {allData.map((order) => (
// //           <div key={order.id} className="bg-white p-4 rounded-xl shadow">
            
// //             <div className="flex items-center gap-3">
// //               <img
// //                 src={`${BASE_URL}/${order.image_path}`}
// //                 alt="product"
// //                 className="w-14 h-14 object-cover rounded-lg"
// //               />

// //               <div>
// //                 <h2 className="font-semibold text-sm">
// //                   Product ID: {order.product_id}
// //                 </h2>
// //                 <p className="text-xs text-gray-500">
// //                   Qty: {order.quantity}
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="mt-3 flex justify-between">
// //               <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.order_status)}`}>
// //                 {order.order_status}
// //               </span>

// //               <select
// //                 value={order.order_status}
// //                 onChange={(e) => {
// //                   const ok = window.confirm("Update order status?");
// //                   if (!ok) return;

// //                   updateStatusMutation.mutate({
// //                     id: order.id,
// //                     status: e.target.value,
// //                   });
// //                 }}
// //                 className="border text-xs px-2 py-1 rounded"
// //               >
// //                 <option value="pending">Pending</option>
// //                 <option value="shipped">Shipped</option>
// //                 <option value="delivered">Delivered</option>
// //                 <option value="cancelled">Cancelled</option>
// //               </select>
// //             </div>

// //             <div className="mt-2 text-sm font-semibold">
// //               Total: ₹{order.total_price}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* DESKTOP TABLE VIEW */}
// //       <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
// //         <table className="w-full text-sm">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="p-3 text-left">Image</th>
// //               <th className="p-3 text-left">Product</th>
// //               <th className="p-3 text-left">Qty</th>
// //               <th className="p-3 text-left">Price</th>
// //               <th className="p-3 text-left">Total</th>
// //               <th className="p-3 text-left">Status</th>
// //               <th className="p-3 text-left">Action</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {allData.map((order) => (
// //               <tr key={order.id} className="border-b">
// //                 <td className="p-3">
// //                   <img
// //                     src={`${BASE_URL}/${order.image_path}`}
// //                     className="w-12 h-12 object-cover rounded"
// //                   />
// //                 </td>

// //                 <td className="p-3 font-medium">
// //                   Product #{order.product_id}
// //                 </td>

// //                 <td className="p-3">{order.quantity}</td>

// //                 <td className="p-3">₹{order.price}</td>

// //                 <td className="p-3 font-semibold">
// //                   ₹{order.total_price}
// //                 </td>

// //                 <td className="p-3">
// //                   <span
// //                     className={`px-2 py-1 rounded text-xs ${getStatusColor(
// //                       order.order_status
// //                     )}`}
// //                   >
// //                     {order.order_status}
// //                   </span>
// //                 </td>

// //                 <td className="p-3">
// //                   <select
// //                     value={order.order_status}
// //                     onChange={(e) => {
// //                       const ok = window.confirm("Update order status?");
// //                       if (!ok) return;

// //                       updateStatusMutation.mutate({
// //                         id: order.id,
// //                         status: e.target.value,
// //                       });
// //                     }}
// //                     className="border px-2 py-1 rounded"
// //                   >
// //                     <option value="pending">Pending</option>
// //                     <option value="shipped">Shipped</option>
// //                     <option value="delivered">Delivered</option>
// //                     <option value="cancelled">Cancelled</option>
// //                   </select>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AllOrders;


// import React, { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import api, { BASE_URL } from "../../utils/api";

// const STATUS_CONFIG = {
//   pending:   { label: "Pending",   bg: "#FAEEDA", color: "#854F0B", dot: "#EF9F27" },
//   shipped:   { label: "Shipped",   bg: "#E6F1FB", color: "#185FA5", dot: "#378ADD" },
//   delivered: { label: "Delivered", bg: "#EAF3DE", color: "#3B6D11", dot: "#639922" },
//   cancelled: { label: "Cancelled", bg: "#FCEBEB", color: "#A32D2D", dot: "#E24B4A" },
// };

// const StatusBadge = ({ status }) => {
//   const cfg = STATUS_CONFIG[status] || { label: status, bg: "#F1EFE8", color: "#5F5E5A", dot: "#888780" };
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 6,
//       padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500,
//       background: cfg.bg, color: cfg.color,
//     }}>
//       <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
//       {cfg.label}
//     </span>
//   );
// };

// const StatusSelect = ({ value, onChange, disabled }) => (
//   <select
//     value={value}
//     onChange={onChange}
//     disabled={disabled}
//     style={{
//       border: "1px solid #d1d5db",
//       borderRadius: 8,
//       padding: "6px 10px",
//       fontSize: 13,
//       background: "#fff",
//       color: "#111",
//       cursor: disabled ? "not-allowed" : "pointer",
//       outline: "none",
//       appearance: "none",
//       backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "right 8px center",
//       paddingRight: 28,
//       minWidth: 130,
//     }}
//   >
//     <option value="pending">Pending</option>
//     <option value="shipped">Shipped</option>
//     <option value="delivered">Delivered</option>
//     <option value="cancelled">Cancelled</option>
//   </select>
// );

// const SkeletonCard = () => (
//   <div style={{
//     background: "#fff",
//     border: "1px solid #e5e7eb",
//     borderRadius: 12, padding: 16,
//     animation: "pulse 1.5s ease-in-out infinite",
//   }}>
//     <div style={{ display: "flex", gap: 12 }}>
//       <div style={{ width: 60, height: 60, borderRadius: 8, background: "#f3f4f6" }} />
//       <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
//         <div style={{ height: 14, width: "60%", borderRadius: 4, background: "#f3f4f6" }} />
//         <div style={{ height: 12, width: "40%", borderRadius: 4, background: "#f3f4f6" }} />
//         <div style={{ height: 20, width: 80, borderRadius: 20, background: "#f3f4f6" }} />
//       </div>
//     </div>
//   </div>
// );

// function AllOrders() {
//   const token = localStorage.getItem("token");
//   const queryClient = useQueryClient();
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [updatingId, setUpdatingId] = useState(null);

//   const handleAllOrders = async () => {
//     try {
//       const res = await api.get("/api/allOrderDetailsForAdmin", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.data.allData || [];
//     } catch (err) {
//       console.log(err);
//       return [];
//     }
//   };

//   const { data: allData = [], isLoading } = useQuery({
//     queryKey: ["allOrders"],
//     queryFn: handleAllOrders,
//   });

//   const updateStatusMutation = useMutation({
//     mutationFn: async ({ id, status }) => {
//       const res = await api.put(
//         `/api/updateOrderStatus/${id}`,
//         { order_status: status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["allOrders"]);
//       setUpdatingId(null);
//     },
//     onError: () => setUpdatingId(null),
//   });

//   const handleStatusChange = (order, newStatus) => {
//     if (!window.confirm(`Update order #${order.id} status to "${newStatus}"?`)) return;
//     setUpdatingId(order.id);
//     updateStatusMutation.mutate({ id: order.id, status: newStatus });
//   };

//   const filtered = allData.filter((o) => {
//     const matchStatus = filterStatus === "all" || o.order_status === filterStatus;
//     const matchSearch =
//       searchTerm === "" ||
//       String(o.product_id).includes(searchTerm) ||
//       String(o.id).includes(searchTerm);
//     return matchStatus && matchSearch;
//   });

//   const counts = allData.reduce((acc, o) => {
//     acc[o.order_status] = (acc[o.order_status] || 0) + 1;
//     return acc;
//   }, {});

//   const summaryCards = [
//     { label: "All Orders", value: allData.length,        key: "all",       dot: "#888780" },
//     { label: "Pending",    value: counts.pending || 0,   key: "pending",   dot: "#EF9F27" },
//     { label: "Shipped",    value: counts.shipped || 0,   key: "shipped",   dot: "#378ADD" },
//     { label: "Delivered",  value: counts.delivered || 0, key: "delivered", dot: "#639922" },
//     { label: "Cancelled",  value: counts.cancelled || 0, key: "cancelled", dot: "#E24B4A" },
//   ];


//   if(isLoading){
//   return (
//     <div className="flex flex-col items-center justify-center h-[70vh] gap-3">  
//       <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
//       <p className="text-gray-400 text-sm">Loading your orders...</p>
//     </div>
//   )
// }

//   return (
//     <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "20px 16px" }}>
//       <style>{`
//         @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
//         @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
//         .order-card { animation: fadeIn 0.25s ease both; }
//         .order-row:hover td { background: #f9fafb !important; }
//         .filter-btn {
//           cursor: pointer; border: 1px solid #e5e7eb; background: #fff;
//           color: #6b7280; border-radius: 20px; padding: 5px 14px;
//           font-size: 13px; transition: all .15s;
//         }
//         .filter-btn:hover { border-color: #9ca3af; color: #111; }
//         .filter-btn.active { background: #111; color: #fff; border-color: #111; }
//         .search-input {
//           border: 1px solid #e5e7eb; border-radius: 8px;
//           padding: 8px 12px 8px 36px; font-size: 14px;
//           background: #fff; color: #111; width: 100%;
//           box-sizing: border-box; outline: none; transition: border-color .15s;
//         }
//         .search-input:focus { border-color: #6b7280; }
//         .summary-card {
//           cursor: pointer; transition: transform .15s;
//           border-radius: 10px; padding: 14px 16px;
//           border: 1px solid #e5e7eb; background: #fff;
//         }
//         .summary-card:hover { transform: translateY(-2px); }
//         .summary-card.active { border-color: #374151; background: #f9fafb; }
//         @media (min-width: 768px) {
//           .mobile-cards { display: none !important; }
//           .desktop-table { display: block !important; }
//         }
//         @media (max-width: 767px) {
//           .desktop-table { display: none !important; }
//         }
//       `}</style>

//       {/* HEADER */}
//       <div style={{ marginBottom: 20 }}>
//         <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#111827" }}>
//           Orders Management
//         </h1>
//         <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>
//           View and update all customer orders
//         </p>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
//         gap: 10, marginBottom: 18,
//       }}>
//         {summaryCards.map((s) => (
//           <div
//             key={s.key}
//             className={`summary-card${filterStatus === s.key ? " active" : ""}`}
//             onClick={() => setFilterStatus(s.key)}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
//               <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
//               <span style={{ fontSize: 12, color: "#6b7280" }}>{s.label}</span>
//             </div>
//             <p style={{ margin: 0, fontSize: 24, fontWeight: 600, color: "#111827" }}>
//               {isLoading ? "—" : s.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* SEARCH + FILTER PILLS */}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 16 }}>
//         <div style={{ position: "relative", flex: "1 1 200px", minWidth: 180 }}>
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
//             style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
//             <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
//           </svg>
//           <input
//             className="search-input"
//             type="text"
//             placeholder="Search by order or product ID…"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//           {summaryCards.map((s) => (
//             <button
//               key={s.key}
//               className={`filter-btn${filterStatus === s.key ? " active" : ""}`}
//               onClick={() => setFilterStatus(s.key)}
//             >
//               {s.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* LOADING SKELETONS */}
//       {isLoading && (
//         <div style={{ display: "grid", gap: 10 }}>
//           {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
//         </div>
//       )}

//       {/* EMPTY STATE */}
//       {!isLoading && filtered.length === 0 && (
//         <div style={{
//           background: "#fff", border: "1px solid #e5e7eb",
//           borderRadius: 12, padding: "48px 24px",
//           textAlign: "center", color: "#9ca3af", fontSize: 14,
//         }}>
//           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
//             style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }}>
//             <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//           </svg>
//           No orders found
//           {(filterStatus !== "all" || searchTerm) && (
//             <button
//               onClick={() => { setFilterStatus("all"); setSearchTerm(""); }}
//               style={{ display: "block", margin: "10px auto 0", background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: 13 }}
//             >
//               Clear filters
//             </button>
//           )}
//         </div>
//       )}

//       {/* MOBILE CARDS */}
//       {!isLoading && filtered.length > 0 && (
//         <div className="mobile-cards" style={{ display: "grid", gap: 10 }}>
//           {filtered.map((order, i) => (
//             <div
//               key={order.id}
//               className="order-card"
//               style={{
//                 background: "#fff", border: "1px solid #e5e7eb",
//                 borderRadius: 12, padding: 16,
//                 animationDelay: `${i * 30}ms`,
//                 opacity: updatingId === order.id ? 0.6 : 1,
//                 transition: "opacity .2s",
//               }}
//             >
//               <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
//                 <img
//                   src={`${BASE_URL}/${order.image_path}`}
//                   alt="product"
//                   style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover", flexShrink: 0, border: "1px solid #e5e7eb" }}
//                   onError={(e) => { e.target.style.display = "none"; }}
//                 />
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
//                     <div>
//                       <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#111827" }}>
//                         Order #{order.id}
//                       </p>
//                       <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>
//                         Product #{order.product_id} · Qty {order.quantity}
//                       </p>
//                     </div>
//                     <StatusBadge status={order.order_status} />
//                   </div>
//                   <p style={{ margin: "8px 0 0", fontSize: 15, fontWeight: 600, color: "#111827" }}>
//                     ₹{order.total_price}
//                   </p>
//                 </div>
//               </div>
//               <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
//                 <span style={{ fontSize: 12, color: "#6b7280", flexShrink: 0 }}>Update status:</span>
//                 <StatusSelect
//                   value={order.order_status}
//                   disabled={updatingId === order.id}
//                   onChange={(e) => handleStatusChange(order, e.target.value)}
//                 />
//                 {updatingId === order.id && (
//                   <span style={{ fontSize: 12, color: "#9ca3af" }}>Saving…</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* DESKTOP TABLE */}
//       {!isLoading && filtered.length > 0 && (
//         <div
//           className="desktop-table"
//           style={{
//             background: "#fff", border: "1px solid #e5e7eb",
//             borderRadius: 12, overflow: "hidden",
//           }}
//         >
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
//               <thead>
//                 <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
//                   {["Image", "Order", "Product", "Qty", "Price", "Total", "Status", "Update"].map((h) => (
//                     <th key={h} style={{
//                       padding: "12px 14px", textAlign: "left", fontWeight: 500,
//                       fontSize: 12, color: "#6b7280", whiteSpace: "nowrap",
//                       background: "#f9fafb",
//                     }}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((order, i) => (
//                   <tr
//                     key={order.id}
//                     className="order-row"
//                     style={{
//                       borderBottom: "1px solid #f3f4f6",
//                       opacity: updatingId === order.id ? 0.6 : 1,
//                       transition: "opacity .2s",
//                       animation: "fadeIn .2s ease both",
//                       animationDelay: `${i * 20}ms`,
//                     }}
//                   >
//                     <td style={{ padding: "10px 14px" }}>
//                       <img
//                         src={`${BASE_URL}/${order.image_path}`}
//                         alt=""
//                         style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", border: "1px solid #e5e7eb", display: "block" }}
//                         onError={(e) => { e.target.style.display = "none"; }}
//                       />
//                     </td>
//                     <td style={{ padding: "10px 14px", color: "#9ca3af", fontFamily: "monospace", fontSize: 12 }}>
//                       #{order.id}
//                     </td>
//                     <td style={{ padding: "10px 14px", fontWeight: 500, color: "#111827" }}>
//                       #{order.product_id}
//                     </td>
//                     <td style={{ padding: "10px 14px", color: "#6b7280" }}>
//                       {order.quantity}
//                     </td>
//                     <td style={{ padding: "10px 14px", color: "#6b7280" }}>
//                       ₹{order.price}
//                     </td>
//                     <td style={{ padding: "10px 14px", fontWeight: 600, color: "#111827" }}>
//                       ₹{order.total_price}
//                     </td>
//                     <td style={{ padding: "10px 14px" }}>
//                       <StatusBadge status={order.order_status} />
//                     </td>
//                     <td style={{ padding: "10px 14px" }}>
//                       <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                         <StatusSelect
//                           value={order.order_status}
//                           disabled={updatingId === order.id}
//                           onChange={(e) => handleStatusChange(order, e.target.value)}
//                         />
//                         {updatingId === order.id && (
//                           <span style={{ fontSize: 11, color: "#9ca3af" }}>Saving…</span>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div style={{
//             padding: "10px 14px", borderTop: "1px solid #e5e7eb",
//             fontSize: 12, color: "#9ca3af", background: "#f9fafb",
//           }}>
//             Showing {filtered.length} of {allData.length} orders
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AllOrders;