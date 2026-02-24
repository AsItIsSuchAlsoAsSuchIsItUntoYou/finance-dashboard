import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6B6B", "#43AA8B"]

export default function SpendingChart({ transactions }) {
  const expenses = transactions.filter(t => t.type === "expense")

  const data = expenses.reduce((acc, t) => {
    const existing = acc.find(item => item.name === t.category)
    if (existing) {
      existing.value += t.amount
    } else {
      acc.push({ name: t.category, value: t.amount })
    }
    return acc
  }, [])

  if (data.length === 0) return <p>No expense data to display.</p>

  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
      <Legend />
    </PieChart>
  )
}