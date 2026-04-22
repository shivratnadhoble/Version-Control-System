import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../user/Navbar";
import API_URL from "../../api";

const CreateRepo = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userId = localStorage.getItem("userId");
            await axios.post(`${API_URL}/repo/create`, {
                name,
                description,
                visibility,
                owner: userId,
                issues: [],
                content: [],
            });
            navigate("/");
        } catch (err) {
            console.error("Error creating repository", err);
            alert("Failed to create repository: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                <div style={{ width: "700px", padding: "32px", backgroundColor: "#0d1117", border: "1px solid #30363d", borderRadius: "8px" }}>
                    <h2 style={{ color: "#f0f6fc", borderBottom: "1px solid #30363d", paddingBottom: "16px", marginBottom: "24px", fontWeight: "400" }}>Create a new repository</h2>
                    <p style={{ color: "#8b949e", marginBottom: "20px" }}>A repository contains all project files, including the revision history. Already have a project repository elsewhere?</p>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                            <label style={{ display: "block", color: "#f0f6fc", marginBottom: "8px", fontWeight: "600" }}>Repository name <span style={{ color: "#f85149" }}>*</span></label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: "300px", padding: "6px 12px", backgroundColor: "#010409", border: "1px solid #30363d", borderRadius: "6px", color: "#c9d1d9" }}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: "block", color: "#f0f6fc", marginBottom: "8px", fontWeight: "600" }}>Description <span style={{ color: "#8b949e", fontWeight: "normal" }}>(optional)</span></label>
                            <input 
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ width: "100%", padding: "6px 12px", backgroundColor: "#010409", border: "1px solid #30363d", borderRadius: "6px", color: "#c9d1d9" }}
                            />
                        </div>

                        <div style={{ borderTop: "1px solid #30363d", paddingTop: "20px", marginTop: "10px" }}>
                            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", marginBottom: "15px" }}>
                                <input type="radio" name="visibility" checked={visibility} onChange={() => setVisibility(true)} style={{ marginTop: "4px" }} />
                                <div>
                                    <h4 style={{ color: "#f0f6fc", margin: "0 0 4px 0" }}>Public</h4>
                                    <p style={{ color: "#8b949e", margin: 0, fontSize: "12px" }}>Anyone on the internet can see this repository. You choose who can commit.</p>
                                </div>
                            </label>

                            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                                <input type="radio" name="visibility" checked={!visibility} onChange={() => setVisibility(false)} style={{ marginTop: "4px" }} />
                                <div>
                                    <h4 style={{ color: "#f0f6fc", margin: "0 0 4px 0" }}>Private</h4>
                                    <p style={{ color: "#8b949e", margin: 0, fontSize: "12px" }}>You choose who can see and commit to this repository.</p>
                                </div>
                            </label>
                        </div>

                        <div style={{ borderTop: "1px solid #30363d", paddingTop: "20px", marginTop: "10px" }}>
                            <button 
                                type="submit" 
                                disabled={loading}
                                style={{ backgroundColor: "#238636", color: "#ffffff", padding: "6px 16px", borderRadius: "6px", border: "1px solid rgba(240,246,252,0.1)", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer" }}>
                                {loading ? "Creating..." : "Create repository"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateRepo;
