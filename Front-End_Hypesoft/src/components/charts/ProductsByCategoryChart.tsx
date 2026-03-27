import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

type Props = {
  data: {
    categoria: string
    Quantidade: number
  }[]
}

export default function ProductsByCategoryChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={440}>
      <BarChart data={data}>
        <XAxis tick={{ fontSize: 16 }} dataKey="categoria"/>
        <YAxis domain={[0, 30]} tick={{ fontSize: 20 }} tickCount={7}/> 
        <Tooltip contentStyle={{ fontSize: "20px" }}  cursor={false}  />

        <Bar
            dataKey="Quantidade"
            fill="#7c3aed"
            radius={[8, 8, 8, 8]}
            barSize={110}
            isAnimationActive={true}
            animationDuration={1800}
            activeBar={{ fill: "#6d28d9" }}
            tabIndex={-1}
            style={{ outline: "none" }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}