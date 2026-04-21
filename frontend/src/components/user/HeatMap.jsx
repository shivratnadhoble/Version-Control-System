import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

const generateActivityData = (startDate, endDate) => {
    const data = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    while (currentDate <= end) {
        // Skewing towards 0 to make it realistic
        const isActivity = Math.random() > 0.4;
        const count = isActivity ? Math.floor(Math.random() * 45) + 5 : 0;
        data.push({
            date: currentDate.toISOString().split("T")[0],
            count: count,
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
};

const HeatMapProfile = () => {
    const [activityData, setActivityData] = useState([]);
    const [startDate, setStartDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 5);
        
        setStartDate(sixMonthsAgo.toISOString().split("T")[0]);
        
        const data = generateActivityData(sixMonthsAgo, today);
        setActivityData(data);
    }, []);

    if (!startDate) return null;

    return (
        <div style={{ backgroundColor: "#0d1117", padding: "20px", borderRadius: "6px", border: "1px solid #30363d", marginTop: "20px" }}>
            <h4 style={{ color: "#c9d1d9", marginBottom: "15px", fontWeight: "400", fontSize: "16px" }}>
                304 contributions in the last half year
            </h4>
            <HeatMap
                value={activityData}
                weekLabels={["","Mon","","Wed","","Fri",""]}
                startDate={new Date(startDate)}
                rectSize={14}
                space={4}
                rectProps={{ rx: 2 }}
                panelColors={{
                    0: "#161b22",
                    10: "#0e4429",
                    20: "#006d32",
                    30: "#26a641",
                    40: "#39d353"
                }}
                style={{ color: "#8b949e", fontSize: "12px" }}
            />
        </div>
    );
};

export default HeatMapProfile;