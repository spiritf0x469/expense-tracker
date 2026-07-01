import { PieChart,Pie,Cell,Tooltip,ResponsiveContainer } from "recharts"
export default function Analytics({data}){
    const piedata=Object.entries(data.categories).map(([name,value])=>({
        name,value
    }))
    const colors=[
        "#facc15",
        "#3b82f6",
        "#10b981",
        "#ef4444",
        "#a855f7",
        "#f97316"
    ]
    return(
        <div className="analytics-card">
            <h2>📊 Analytics</h2>
            <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                    <Pie data={piedata} dataKey="value" nameKey="name" outerRadius={110}>
                        {piedata.map((entry,index)=>(
                            <Cell key={index} fill={colors[index%colors.length]}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}