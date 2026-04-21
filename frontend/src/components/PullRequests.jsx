import React from "react";
import Navbar from "./user/Navbar";

const PullRequests = () => {
    return (
        <>
            <Navbar />
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <h2 style={{ color: "#f0f6fc", fontSize: "24px", fontWeight: "400" }}>Pull Requests</h2>
                <div style={{ padding: "40px", backgroundColor: "#0d1117", border: "1px solid #30363d", borderRadius: "6px", textAlign: "center" }}>
                    <h3 style={{ color: "#8b949e", fontWeight: "600", fontSize: "18px" }}>No Pull Requests found</h3>
                    <p style={{ color: "#8b949e", fontSize: "14px", marginTop: "10px" }}>When you have created or been assigned to a pull request, it will appear here.</p>
                </div>
            </div>
        </>
    );
};

export default PullRequests;
