"use client";

import { useState, useEffect } from "react";

const sidebarItems = [
  { id: "general", label: "General" },
  { id: "billing", label: "Billing" },
  { id: "invoices", label: "Invoices" },
  { id: "members", label: "Members" },
  { id: "access-groups", label: "Access Groups" },
  { id: "log-drains", label: "Log Drains" },
  { id: "security-privacy", label: "Security & Privacy" },
  { id: "deployment-protection", label: "Deployment Protection" },
  { id: "secure-compute", label: "Secure Compute" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="w-[370px] md:md:w-[600px]">
            <p style={{ color: "#666", marginBottom: "16px" }}>
              This is your team&apos;s URL namespace on Vercel. Within it, your
              team can inspect their projects, check out any recent activity, or
              configure settings to their liking.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#666", marginRight: "8px" }}>
                vercel.com/
              </span>
              <input
                type="text"
                placeholder="your-team-name"
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "200px",
                }}
              />
            </div>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Please use 48 characters at maximum.
            </p>

            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "32px",
                marginBottom: "16px",
              }}
            >
              Team Avatar
            </h2>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              This is your team&apos;s avatar. Click on the avatar to upload a
              custom one from your files.
            </p>
            <div
              style={{
                width: "80px",
                height: "80px",
                background:
                  "linear-gradient(to bottom right, #10B981, #3B82F6)",
                borderRadius: "50%",
              }}
            ></div>

            <button
              style={{
                marginTop: "32px",
                padding: "8px 16px",
                backgroundColor: "#3B82F6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        );
      case "billing":
        return (
          <div className="w-[370px] md:md:w-[600px]">
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Billing
            </h2>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              Manage your billing information and subscription details here.
            </p>
            {/* Add more billing content here */}
          </div>
        );
      case "invoices":
        return (
          <div className="w-[370px] md:md:w-[600px]">
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Invoices
            </h2>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              View and download your past invoices.
            </p>
            {/* Add more invoices content here */}
          </div>
        );
      // Add more cases for other tabs
      default:
        return <div className="w-[370px] md:md:w-[600px]">Select a tab</div>;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      {isMobile && (
        <button
          onClick={toggleSidebar}
          style={{
            padding: "10px",
            backgroundColor: "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "10px",
          }}
        >
          {sidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
      )}
      <div
        style={{
          width: isMobile ? "100%" : "250px",
          backgroundColor: "white",
          borderRight: "1px solid #e5e7eb",
          padding: "20px",
          display: isMobile && !sidebarOpen ? "none" : "block",
        }}
      >
        <nav>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {sidebarItems.map((item) => (
              <li key={item.id} style={{ marginBottom: "8px" }}>
                <button
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 16px",
                    backgroundColor:
                      activeTab === item.id ? "#e5e7eb" : "transparent",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        style={{
          flex: 1,
          padding: "32px",
          minHeight: isMobile ? "auto" : "100vh",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}
