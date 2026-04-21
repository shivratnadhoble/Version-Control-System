import React, { useState, useEffect } from "react";
import Navbar from "./user/Navbar";

const Codespaces = () => {
    const [codespaces, setCodespaces] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [repoName, setRepoName] = useState("");
    const [branch, setBranch] = useState("main");
    const [machine, setMachine] = useState("2-core");

    // Load saved codespaces from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("codespaces");
        if (saved) setCodespaces(JSON.parse(saved));
    }, []);

    // Persist codespaces to localStorage
    useEffect(() => {
        localStorage.setItem("codespaces", JSON.stringify(codespaces));
    }, [codespaces]);

    const handleCreate = () => {
        if (!repoName.trim()) return;
        const newCodespace = {
            id: Date.now(),
            name: repoName.trim(),
            branch,
            machine,
            status: "Active",
            createdAt: new Date().toISOString(),
            lastUsed: new Date().toISOString(),
        };
        setCodespaces([newCodespace, ...codespaces]);
        setShowModal(false);
        setRepoName("");
        setBranch("main");
        setMachine("2-core");
    };

    const handleStop = (id) => {
        setCodespaces(codespaces.map(cs =>
            cs.id === id ? { ...cs, status: cs.status === "Active" ? "Stopped" : "Active", lastUsed: new Date().toISOString() } : cs
        ));
    };

    const handleDelete = (id) => {
        setCodespaces(codespaces.filter(cs => cs.id !== id));
    };

    const getTimeSince = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return "just now";
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    const machineSpecs = {
        "2-core": { label: "2-core", cpu: "2 cores", ram: "4 GB RAM", storage: "32 GB" },
        "4-core": { label: "4-core", cpu: "4 cores", ram: "8 GB RAM", storage: "32 GB" },
        "8-core": { label: "8-core", cpu: "8 cores", ram: "16 GB RAM", storage: "64 GB" },
        "16-core": { label: "16-core", cpu: "16 cores", ram: "32 GB RAM", storage: "128 GB" },
    };

    return (
        <>
            <Navbar />
            <div style={{ backgroundColor: "#0d1117", minHeight: "100vh", paddingBottom: "60px" }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 20px" }}>

                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid #30363d", paddingBottom: "16px" }}>
                        <h2 style={{ color: "#f0f6fc", fontSize: "24px", fontWeight: "400", margin: 0 }}>Your codespaces</h2>
                        <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#238636", color: "white", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", transition: "background-color 0.15s ease" }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2ea043"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#238636"}>
                            New codespace
                        </button>
                    </div>

                    {/* Empty State */}
                    {codespaces.length === 0 && (
                        <div style={{ padding: "80px 40px", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "6px", textAlign: "center" }}>
                            <div style={{ fontSize: "48px", marginBottom: "16px" }}>💻</div>
                            <h3 style={{ color: "#c9d1d9", fontWeight: "600", fontSize: "20px", marginBottom: "10px" }}>Blazing fast cloud developer environments</h3>
                            <p style={{ color: "#8b949e", fontSize: "14px", maxWidth: "460px", margin: "0 auto 24px auto", lineHeight: "1.5" }}>
                                Visual Studio Code backed by high performance virtual machines that start in seconds. Create one to get started.
                            </p>
                            <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#238636", color: "white", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
                                Create codespace
                            </button>
                        </div>
                    )}

                    {/* Codespaces List */}
                    {codespaces.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                            {codespaces.map((cs) => (
                                <div key={cs.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", backgroundColor: "#161b22", borderBottom: "1px solid #30363d", borderLeft: "1px solid #30363d", borderRight: "1px solid #30363d", transition: "background-color 0.15s ease" }}
                                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1c2129"}
                                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#161b22"}>
                                    {/* Left: Info */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: cs.status === "Active" ? "#3fb950" : "#8b949e", boxShadow: cs.status === "Active" ? "0 0 6px #3fb950" : "none" }}></div>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                                <span style={{ color: "#58a6ff", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>{cs.name}</span>
                                                <span style={{ color: "#8b949e", fontSize: "12px", padding: "1px 6px", border: "1px solid #30363d", borderRadius: "12px" }}>{cs.status}</span>
                                            </div>
                                            <div style={{ display: "flex", gap: "12px", color: "#8b949e", fontSize: "12px" }}>
                                                <span>🌿 {cs.branch}</span>
                                                <span>⚙️ {machineSpecs[cs.machine]?.cpu}, {machineSpecs[cs.machine]?.ram}</span>
                                                <span>Last used {getTimeSince(cs.lastUsed)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Actions */}
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button onClick={() => handleStop(cs.id)} style={{ padding: "4px 12px", fontSize: "12px", backgroundColor: "transparent", border: "1px solid #30363d", borderRadius: "6px", color: "#c9d1d9", cursor: "pointer", transition: "border-color 0.15s ease" }}
                                            onMouseEnter={(e) => e.currentTarget.style.borderColor = "#8b949e"}
                                            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#30363d"}>
                                            {cs.status === "Active" ? "Stop" : "Start"}
                                        </button>
                                        <button onClick={() => handleDelete(cs.id)} style={{ padding: "4px 12px", fontSize: "12px", backgroundColor: "transparent", border: "1px solid #30363d", borderRadius: "6px", color: "#f85149", cursor: "pointer", transition: "border-color 0.15s ease" }}
                                            onMouseEnter={(e) => e.currentTarget.style.borderColor = "#f85149"}
                                            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#30363d"}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}
                     onClick={() => setShowModal(false)}>
                    <div style={{ width: "540px", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "12px", padding: "32px", boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }}
                         onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ color: "#f0f6fc", fontSize: "20px", marginBottom: "24px", fontWeight: "600" }}>Create a new codespace</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                            {/* Repository */}
                            <div>
                                <label style={{ display: "block", color: "#c9d1d9", fontSize: "14px", marginBottom: "6px", fontWeight: "600" }}>Repository</label>
                                <input type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} placeholder="owner/repository"
                                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#0d1117", border: "1px solid #30363d", borderRadius: "6px", color: "#c9d1d9", fontSize: "14px", boxSizing: "border-box" }} />
                            </div>

                            {/* Branch */}
                            <div>
                                <label style={{ display: "block", color: "#c9d1d9", fontSize: "14px", marginBottom: "6px", fontWeight: "600" }}>Branch</label>
                                <select value={branch} onChange={(e) => setBranch(e.target.value)}
                                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#0d1117", border: "1px solid #30363d", borderRadius: "6px", color: "#c9d1d9", fontSize: "14px", boxSizing: "border-box" }}>
                                    <option value="main">main</option>
                                    <option value="develop">develop</option>
                                    <option value="staging">staging</option>
                                    <option value="feature">feature</option>
                                </select>
                            </div>

                            {/* Machine Type */}
                            <div>
                                <label style={{ display: "block", color: "#c9d1d9", fontSize: "14px", marginBottom: "10px", fontWeight: "600" }}>Machine type</label>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {Object.entries(machineSpecs).map(([key, spec]) => (
                                        <label key={key} onClick={() => setMachine(key)}
                                            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", backgroundColor: machine === key ? "#0d1117" : "transparent", border: machine === key ? "2px solid #58a6ff" : "1px solid #30363d", borderRadius: "6px", cursor: "pointer", transition: "border-color 0.15s ease" }}>
                                            <input type="radio" name="machine" checked={machine === key} onChange={() => setMachine(key)} style={{ accentColor: "#58a6ff" }} />
                                            <div>
                                                <span style={{ color: "#f0f6fc", fontWeight: "600", fontSize: "14px" }}>{spec.label}</span>
                                                <span style={{ color: "#8b949e", fontSize: "12px", marginLeft: "8px" }}>{spec.cpu} · {spec.ram} · {spec.storage}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "28px", borderTop: "1px solid #30363d", paddingTop: "20px" }}>
                            <button onClick={() => setShowModal(false)} style={{ padding: "8px 16px", backgroundColor: "transparent", border: "1px solid #30363d", borderRadius: "6px", color: "#c9d1d9", cursor: "pointer", fontSize: "14px" }}>
                                Cancel
                            </button>
                            <button onClick={handleCreate} disabled={!repoName.trim()} style={{ padding: "8px 16px", backgroundColor: repoName.trim() ? "#238636" : "#1a2a1a", border: "none", borderRadius: "6px", color: repoName.trim() ? "white" : "#3fb950", cursor: repoName.trim() ? "pointer" : "not-allowed", fontSize: "14px", fontWeight: "600" }}>
                                Create codespace
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Codespaces;
