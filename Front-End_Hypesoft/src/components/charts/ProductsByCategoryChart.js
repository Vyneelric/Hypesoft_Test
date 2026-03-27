import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
export default function ProductsByCategoryChart({ data }) {
    return (_jsx(ResponsiveContainer, { width: "100%", height: 440, children: _jsxs(BarChart, { data: data, children: [_jsx(XAxis, { tick: { fontSize: 16 }, dataKey: "categoria" }), _jsx(YAxis, { domain: [0, 30], tick: { fontSize: 20 }, tickCount: 7 }), _jsx(Tooltip, { contentStyle: { fontSize: "20px" }, cursor: false }), _jsx(Bar, { dataKey: "Quantidade", fill: "#7c3aed", radius: [8, 8, 8, 8], barSize: 110, isAnimationActive: true, animationDuration: 1800, activeBar: { fill: "#6d28d9" }, tabIndex: -1, style: { outline: "none" } })] }) }));
}
