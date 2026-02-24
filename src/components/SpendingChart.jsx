import { useState } from "react"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = ["#6366f1", "#22d3ee", "#f59e0b", "#f43f5e", "#a78bfa", "#34d399", "#fb923c"]

const RANGES = ["All Time", "This Week", "This Month", "This Quarter", "This Year"]

function getStartDate(range) {
  const now = new Date()
  if (range === "All Time") return null

  if (range === "This Week") {
    const day = now.getDay()
    const diff = now.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(now.getFullYear(), now.getMonth(), diff)
  }
  if (range === "This Month") {
    return new Date(now.getFullYear(), now.getMonth(), 1)
  }
  if (range === "This Quarter") {
    const quarter = Math.floor(now.getMonth() / 3)
    return new Date(now.getFullYear(), quarter * 3, 1)
  }
  if (range === "This Year") {
    return new Date(now.getFullYear(), 0, 1)
  }
  return null
}

export default function SpendingChart({ transactions }) {
  const [range, setRange] = useState("This Month")

  const startDate = getStartDate(range)

  const filtered = transactions.filter(t => {
    if (!startDate) return true
    const [year, month, day] = t.date.split("-").map(Number)
    const txDate = new Date(year, month - 1, day)
    return txDate >= startDate
  })

  const expenses = filtered.filter(t => t.type === "expense")

  const data = expenses.reduce((acc, t) => {
    const existing = acc.find(item => item.name === t.category)
    if (existing) existing.value += t.amount
    else acc.push({ name: t.category, value: t.amount })
    return acc
  }, [])

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Spending by Category</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
        >
          {RANGES.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No expense data for this period.</p>
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