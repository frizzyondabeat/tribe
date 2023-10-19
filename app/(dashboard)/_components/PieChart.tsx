import React from 'react';
import {Cell, Pie, PieChart} from "recharts";

const data = [
    {name: 'Admin', value: 400},
    {name: 'User', value: 300},
]

const COLORS = ["#FFBB28", "#FF8042"];
const PieChartModel = () => {
    return (
        <PieChart width={400} height={350}>
            <Pie dataKey={"value"} data={data} cx={200} cy={200} outerRadius={80} paddingAngle={5} fill="#8884d8" label>
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                }
            </Pie>
        </PieChart>
    );
};

export default PieChartModel;