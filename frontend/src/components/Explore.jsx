import React from "react";
import Navbar from "./user/Navbar";

const Explore = () => {
    const trendingRepos = [
        { name: "kamranahmedse/developer-roadmap", description: "Interactive roadmaps, guides and other educational content to help developers grow in their careers.", lang: "TypeScript", stars: "250K", color: "#3178c6" },
        { name: "tensorflow/tensorflow", description: "An Open Source Machine Learning Framework for Everyone", lang: "C++", stars: "175K", color: "#f34b7d" },
        { name: "vercel/next.js", description: "The React Framework", lang: "JavaScript", stars: "110K", color: "#f1e05a" },
        { name: "facebook/react", description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.", lang: "JavaScript", stars: "210K", color: "#f1e05a" }
    ];

    const collections = [
        { title: "Machine Learning", description: "Repositories that are pioneering the field of artificial intelligence.", icon: "🧠" },
        { title: "Learn to Code", description: "Awesome resources for jumping into development.", icon: "📚" },
        { title: "Web Gaming", description: "Engines and tools for building games on the web.", icon: "🎮" }
    ];

    return (
        <>
            <Navbar />
            <div style={{ backgroundColor: "#0d1117", minHeight: "100vh", paddingBottom: "60px" }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 20px" }}>
                    <h1 style={{ color: "#f0f6fc", fontSize: "32px", fontWeight: "600", borderBottom: "1px solid #30363d", paddingBottom: "16px", marginBottom: "30px" }}>Explore</h1>
                    
                    <div style={{ display: "flex", gap: "30px", flexDirection: "row" }}>
                        <div style={{ flex: 2 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                <h2 style={{ color: "#c9d1d9", fontSize: "20px", fontWeight: "600", margin: 0 }}>Trending Repositories</h2>
                                <span style={{ color: "#58a6ff", fontSize: "14px", cursor: "pointer" }}>See more</span>
                            </div>
                            
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {trendingRepos.map((repo, i) => (
                                    <div key={i} style={{ padding: "24px", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "6px", transition: "border-color 0.2s ease", cursor: "pointer" }}
                                         onMouseEnter={(e) => e.currentTarget.style.borderColor = "#8b949e"}
                                         onMouseLeave={(e) => e.currentTarget.style.borderColor = "#30363d"}>
                                        <h3 style={{ margin: "0 0 8px 0", color: "#58a6ff", fontSize: "20px", fontWeight: "600" }}>
                                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" fill="currentColor" style={{ marginRight: "8px", position: "relative", top: "2px" }}>
                                                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2Zm3.75 0a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2Z"></path>
                                            </svg>
                                            {repo.name}
                                        </h3>
                                        <p style={{ color: "#8b949e", margin: "0 0 16px 0", fontSize: "14px", lineHeight: "1.5" }}>
                                            {repo.description}
                                        </p>
                                        <div style={{ display: "flex", gap: "16px", color: "#8b949e", fontSize: "12px", alignItems: "center" }}>
                                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                                <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: repo.color, display: "inline-block" }}></span>
                                                {repo.lang}
                                            </span>
                                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                                <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
                                                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
                                                </svg>
                                                {repo.stars}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                            <div style={{ paddingBottom: "10px", borderBottom: "1px solid #30363d" }}>
                                <h2 style={{ color: "#c9d1d9", fontSize: "20px", fontWeight: "600", margin: 0 }}>Collections</h2>
                            </div>
                            
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {collections.map((coll, i) => (
                                    <div key={i} style={{ padding: "20px", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "6px", cursor: "pointer", transition: "transform 0.2s ease" }}
                                         onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                                         onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                            <span style={{ fontSize: "24px" }}>{coll.icon}</span>
                                            <h3 style={{ margin: 0, color: "#f0f6fc", fontSize: "16px", fontWeight: "600" }}>{coll.title}</h3>
                                        </div>
                                        <p style={{ color: "#8b949e", fontSize: "13px", margin: 0, lineHeight: "1.4" }}>
                                            {coll.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Explore;
