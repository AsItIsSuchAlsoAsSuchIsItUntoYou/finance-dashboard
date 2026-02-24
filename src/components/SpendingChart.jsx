import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = ["#6366f1", "#22d3ee", "#f59e0b", "#f43f5e", "#a78bfa", "#34d399", "#fb923c"]

export default function SpendingChart({ transactions }) {
  const expenses = transactions.filter(t => t.type === "expense")

  const data = expenses.reduce((acc, t) => {
    const existing = acc.find(item => item.name === t.category)
    if (existing) existing.value += t.amount
    else acc.push({ name: t.category, value: t.amount })
    return acc
  }, [])

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-4">Spending by Category</h2>
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No expense data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
  formatter={(value) => `$${value.toFixed(2)}`}
  contentStyle={{ backgroundColor: "#374151", border: "1px solid #6b7280", borderRadius: "8px", color: "#f9fafb" }}
/>
            <Legend wrapperStyle={{ color: "#9ca3af", fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}