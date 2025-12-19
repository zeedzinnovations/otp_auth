import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaFileInvoiceDollar,
  FaCog,
  FaShieldAlt,
  FaUserPlus,
  FaDatabase,
  FaSignOutAlt,
} from "react-icons/fa";

function SidebarItem({ icon: Icon, label, active, onClick }) {
  const base = active
    ? "flex items-center gap-3 p-3 rounded-lg bg-white text-[#00713E] font-semibold cursor-pointer"
    : "flex items-center gap-3 p-3 rounded-lg text-white hover:bg-white hover:text-[#00713E] transition cursor-pointer";

  return (
    <li className={base} onClick={onClick}>
      <Icon />
      <span>{label}</span>
    </li>
  );
}

export default function Admin() {
  const user =
    JSON.parse(localStorage.getItem("user")) || { name: "Guest", role: null };

  const role = user.role;
  const isSuper = role === "superadmin";
  const isAdmin = role === "admin" || isSuper;

  const [activeView, setActiveView] = useState("dashboard");
  const [otpList, setOtpList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

 const API = import.meta.env.VITE_APP_BACKEND_URL;

  // Fetch OTPs
  useEffect(() => {
    async function fetchOTPs() {
      try {
        const res = await fetch(`${API}/otps`);
        const data = await res.json();
        setOtpList(data);
      } catch (err) {
        console.error("Error fetching OTPs", err);
      }
    }

    if (activeView === "otp") {
      fetchOTPs();
      const interval = setInterval(fetchOTPs, 10000);
      return () => clearInterval(interval);
    }
  }, [activeView, API]);

  // Filter OTP list
  const filteredOTPList = otpList.filter((otp) =>
    String(otp.phone_number).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FFFFFF" }}>
      
      
      <aside
        className="w-72 p-6 flex flex-col justify-between"
        style={{ backgroundColor: "#00713E", color: "#FFFFFF" }}
      >
        <div>
          <nav className="mt-4">
            <ul className="space-y-2">
              <SidebarItem
                icon={FaTachometerAlt}
                label="Dashboard"
                active={activeView === "dashboard"}
                onClick={() => setActiveView("dashboard")}
              />

              <SidebarItem
                icon={FaBoxOpen}
                label="Products"
                active={activeView === "products"}
                onClick={() => setActiveView("products")}
              />

              <SidebarItem
                icon={FaShoppingCart}
                label="Orders"
                active={activeView === "orders"}
                onClick={() => setActiveView("orders")}
              />

              <SidebarItem
                icon={FaUsers}
                label="Customers"
                active={activeView === "customers"}
                onClick={() => setActiveView("customers")}
              />

              <SidebarItem
                icon={FaChartBar}
                label="OTP LIST"
                active={activeView === "otp"}
                onClick={() => setActiveView("otp")}
              />

              <SidebarItem
                icon={FaFileInvoiceDollar}
                label="Invoices"
                active={activeView === "invoices"}
                onClick={() => setActiveView("invoices")}
              />

              <SidebarItem
                icon={FaCog}
                label="Settings"
                active={activeView === "settings"}
                onClick={() => setActiveView("settings")}
              />
            </ul>

            {isAdmin && (
              <>
                <hr className="my-4 border-white/30" />
                <ul className="space-y-2">
                  <SidebarItem
                    icon={FaBoxOpen}
                    label="Inventory Mgmt"
                    active={activeView === "inventory"}
                    onClick={() => setActiveView("inventory")}
                  />

                  <SidebarItem
                    icon={FaChartBar}
                    label="Sales Reports"
                    active={activeView === "sales"}
                    onClick={() => setActiveView("sales")}
                  />
                </ul>
              </>
            )}

            {isSuper && (
              <>
                <hr className="my-4 border-white/30" />
                <ul className="space-y-2">
                  <SidebarItem
                    icon={FaUserPlus}
                    label="Manage Admins"
                    active={activeView === "manageAdmins"}
                    onClick={() => setActiveView("manageAdmins")}
                  />

                  <SidebarItem
                    icon={FaShieldAlt}
                    label="Security Logs"
                    active={activeView === "security"}
                    onClick={() => setActiveView("security")}
                  />

                  <SidebarItem
                    icon={FaDatabase}
                    label="Backup / Restore"
                    active={activeView === "backup"}
                    onClick={() => setActiveView("backup")}
                  />
                </ul>
              </>
            )}
          </nav>
        </div>

        {/* User info & logout */}
        <div>
          <div className="flex items-center gap-3 p-3 rounded-md bg-white text-[#00713E]">
            <div>
              <div className="font-semibold">{user.name || "No Name"}</div>
              <div className="text-sm">{role || "No role"}</div>
            </div>
          </div>

          <button
            className="mt-4 w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-white text-white hover:bg-white hover:text-[#00713E] transition"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* Dashboard */}
        {activeView === "dashboard" && (
          <h1 className="text-3xl font-bold" style={{ color: "#00713E" }}>
            Dashboard Overview
          </h1>
        )}

        {/* OTP LIST */}
        {activeView === "otp" && (
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#00713E" }}>
              OTP List
            </h2>

            <input
              type="text"
              placeholder="Search by phone number..."
              className="mb-4 px-4 py-2 border-2 rounded-lg outline-none w-full max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">Phone Number</th>
                    <th className="px-4 py-2 border">OTP</th>
                    <th className="px-4 py-2 border">Created At</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOTPList.map((otp, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">{otp.phone_number}</td>
                      <td className="px-4 py-2 border">{otp.otp}</td>
                      <td className="px-4 py-2 border">
                        {new Date(otp.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}

                  {filteredOTPList.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        No OTPs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

       
        {activeView !== "otp" && activeView !== "dashboard" && (
          <h1 className="text-3xl font-bold" style={{ color: "#00713E" }}>
            {activeView} view
          </h1>
        )}
      </main>
    </div>
  );
}