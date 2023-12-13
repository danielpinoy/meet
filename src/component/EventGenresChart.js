import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState, useEffect } from "react";

const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const getData = () => {
        const data = genres.map((genre, index) => {
            const filteredEvents = events.filter((event) => event.summary.includes(genre));
            return { name: genre, value: filteredEvents.length, key: `cell-${genre}-${index}` };
        });

        return data;
    };

    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#000"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central">
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };
    const colors = ["#ed1f17", "#009efa", "#f4bc2b", "#b0b0ed", "#1a1d45"];

    return (
        <div>
            <ResponsiveContainer width="99%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        fill="#8884d8"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
export default EventGenresChart;
