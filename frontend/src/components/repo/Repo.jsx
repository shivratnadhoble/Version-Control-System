import React, { useState, useEffect } from "react";
import Navbar from "../user/Navbar";
import API_URL from "../../api";

const Repo = () => {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await fetch(`${API_URL}/repo/user/${userId}`);
                const data = await response.json();
                setRepositories(data.repositories || []);
            } catch (err) {
                console.error("Error while fetching repositories: ", err);
                setRepositories([]);
            }
        };

        fetchRepositories();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
                <h2 style={{ color: "#c9d1d9", fontSize: "24px", borderBottom: "1px solid #30363d", paddingBottom: "12px", marginBottom: "24px" }}>
                    Repositories
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {repositories.length === 0 ? (
                        <p style={{ color: "#8b949e", fontStyle: "italic" }}>No repositories found. Create one to get started!</p>
                    ) : (
                        repositories.map((repo) => (
                            <div key={repo._id} style={{ padding: "24px", backgroundColor: "#0d1117", border: "1px solid #30363d", borderRadius: "6px" }}>
                                <h3 style={{ margin: "0 0 8px 0", color: "#58a6ff", fontSize: "20px", fontWeight: "600", cursor: "pointer" }}>
                                    {repo.name} 
                                    <span style={{ marginLeft: "10px", fontSize: "12px", color: "#8b949e", border: "1px solid #30363d", borderRadius: "20px", padding: "2px 8px", position: "relative", top: "-2px" }}>
                                        {repo.visibility ? "Public" : "Private"}
                                    </span>
                                </h3>
                                <p style={{ color: "#8b949e", margin: 0, fontSize: "14px" }}>
                                    {repo.description || "No description provided."}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Repo;
