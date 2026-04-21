import React, { useEffect, useState } from "react";
import Navbar from "./user/Navbar";
import axios from "axios";

const Issues = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        // Fetch global issues or assigned issues placeholder
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <h2 style={{ color: "#f0f6fc", fontSize: "24px", fontWeight: "400" }}>Issues</h2>
                <div style={{ padding: "40px", backgroundColor: "#0d1117", border: "1px solid #30363d", borderRadius: "6px", textAlign: "center" }}>
                    <h3 style={{ color: "#8b949e", fontWeight: "600", fontSize: "18px" }}>No open issues</h3>
                    <p style={{ color: "#8b949e", fontSize: "14px", marginTop: "10px" }}>There are no open issues assigned to you across all repositories.</p>
                </div>
            </div>
        </>
    );
};

export default Issues;
