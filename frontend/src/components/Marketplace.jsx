import React from "react";
import Navbar from "./user/Navbar";

const Marketplace = () => {
    const packages = [
        {
            name: "Slack",
            description: "Bring your code to the conversations you care about with the Slack and GitHub integration.",
            category: "Chat",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1024px-Slack_icon_2019.svg.png"
        },
        {
             name: "Vercel",
             description: "Vercel is the optimal workflow for frontend teams. All-in-one: Static and Serverless deployment.",
             category: "Deployment",
             logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png"
        },
        {
             name: "CircleCI",
             description: "Automate your development process quickly, safely, and at scale.",
             category: "Continuous Integration",
             logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Circleci-logo-stacked-fb.png/512px-Circleci-logo-stacked-fb.png"
        },
        {
             name: "Sentry",
             description: "Sentry provides self-hosted and cloud-based error monitoring that helps all software teams.",
             category: "Monitoring",
             logo: "https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_3cf21ccae80dd3f954378f44be645c3d/sentry.png"
        },
        {
            name: "Codecov",
            description: "Highly integrated tools to group, merge, archive and compare coverage reports.",
            category: "Code Quality",
            logo: "https://avatars.githubusercontent.com/u/8226205?s=200&v=4"
        },
        {
            name: "Jira",
            description: "Connect GitHub to Jira to keep your projects and repos in sync and your team aligned.",
            category: "Project Management",
            logo: "https://logowik.com/content/uploads/images/jira3693.jpg"
        }
    ];

    return (
        <>
            <Navbar />
            <div style={{ backgroundColor: "#0d1117", minHeight: "100vh", paddingBottom: "60px" }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 20px", display: "flex", flexDirection: "column", gap: "30px", alignItems: "center", textAlign: "center" }}>
                    <h1 style={{ color: "#f0f6fc", fontSize: "36px", fontWeight: "600", marginTop: "40px" }}>Extend GitHub</h1>
                    <p style={{ color: "#8b949e", fontSize: "18px", maxWidth: "600px" }}>
                        Find tools to improve your workflow. Explore apps, actions, and integrations from the GitHub community.
                    </p>
                    <input 
                        type="text" 
                        placeholder="Search for apps and actions" 
                        style={{ width: "400px", padding: "12px 16px", borderRadius: "6px", backgroundColor: "#161b22", border: "1px solid #30363d", color: "white", fontSize: "16px", marginBottom: "40px" }}
                    />
                </div>

                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
                    <h3 style={{ color: "#c9d1d9", fontSize: "20px", borderBottom: "1px solid #30363d", paddingBottom: "10px", marginBottom: "20px" }}>Recommended for you</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
                        {packages.map((pkg, index) => (
                            <div key={index} style={{ display: "flex", gap: "16px", padding: "20px", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "6px", alignItems: "flex-start", cursor: "pointer", transition: "border-color 0.2s ease" }}
                                 onMouseEnter={(e) => e.currentTarget.style.borderColor = "#8b949e"}
                                 onMouseLeave={(e) => e.currentTarget.style.borderColor = "#30363d"}>
                                <div style={{ width: "64px", height: "64px", flexShrink: 0, backgroundColor: "#fff", borderRadius: "8px", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                                    <img src={pkg.logo} alt={pkg.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                                </div>
                                <div style={{ textAlign: "left" }}>
                                    <h4 style={{ color: "#58a6ff", fontSize: "16px", margin: "0 0 4px 0", fontWeight: "600" }}>{pkg.name}</h4>
                                    <p style={{ color: "#8b949e", fontSize: "12px", margin: "0 0 8px 0" }}>{pkg.category}</p>
                                    <p style={{ color: "#c9d1d9", fontSize: "13px", margin: 0, lineHeight: "1.4" }}>
                                        {pkg.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Marketplace;
