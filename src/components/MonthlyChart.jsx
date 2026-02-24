import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const PERIODS = ["Day", "Week", "Month", "Quarter", "Year"]

function getWeekNumber(dateStr) {
  const date = new Date(dateStr + "T12:00:00")
  const start = new Date(date.getFullYear(), 0, 1)
  return Math.ceil(((date - start) / 86400000 + start.getDay() + 1) / 7)
}

function groupTransactions(transactions, period) {
  return transactions.reduce((acc, t) => {
    const [year, month, day] = t.date.split("-")
    let key, label

    if (period === "Day") {
      key = t.date
      label = `${MONTH_NAMES[parseInt(month) - 1]} ${parseInt(day)}, ${year}`
    } else if (period === "Week") {
      const week = getWeekNumber(t.date)
      key = `${year}-W${String(week).padStart(2, "0")}`
      label = `W${week} ${year}`
    } else if (period === "Month") {
      key = `${year}-${month}`
      label = `${MONTH_NAMES[parseInt(month) - 1]} ${year}`
    } else if (period === "Quarter") {
      const quarter = Math.ceil(parseInt(month) / 3)
      key = `${year}-Q${quarter}`
      label = `Q${quarter} ${year}`
    } else if (period === "Year") {
      key = year
      label = year
    }

    const existing = acc.find(item => item.key === key)
    if (existing) {
      if (t.type === "income") existing.income += t.amount
      else existing.expenses += t.amount
    } else {
      acc.push({
        key,
        label,
        income: t.type === "income" ? t.amount : 0,
        expenses: t.type === "expense" ? t.amount : 0
      })
    }

    return acc
  }, [])
}

export default function MonthlyChart({ transactions }) {
  const [period, setPeriod] = useState("Month")

  const data = groupTransactions(transactions, period).sort((a, b) => a.key.localeCompare(b.key))

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Income vs Expenses by {period}</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
        >
          {PERIODS.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No data to display yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} barCategoryGap="30%">
            <XAxis dataKey="label" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              formatter={(value) => `$${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: "#374151", border: "1px solid #6b7280", borderRadius: "8px", color: "#f9fafb" }}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Legend wrapperStyle={{ color: "#9ca3af", fontSize: "12px" }} />
            <Bar dataKey="income" name="Income" fill="#34d399" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}