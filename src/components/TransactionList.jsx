import { useState } from "react"

const CATEGORIES = ["All", "Food", "Rent", "Transport", "Entertainment", "Health", "Income", "Other"]

export default function TransactionList({ transactions, onRemove, onEdit }) {  const [filterCategory, setFilterCategory] = useState("All")
  const [filterType, setFilterType] = useState("All")
  const [sortBy, setSortBy] = useState("date-desc")

  const selectClass = "bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"

  const filtered = transactions
    .filter(t => filterCategory === "All" || t.category === filterCategory)
    .filter(t => filterType === "All" || t.type === filterType)
    .sort((a, b) => {
      if (sortBy === "date-desc") return b.date.localeCompare(a.date)
      if (sortBy === "date-asc") return a.date.localeCompare(b.date)
      if (sortBy === "amount-desc") return b.amount - a.amount
      if (sortBy === "amount-asc") return a.amount - b.amount
      return 0
    })

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">Transactions</h2>
        <div className="flex flex-wrap gap-2">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={selectClass}>
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={selectClass}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClass}>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">
          {transactions.length === 0 ? "No transactions yet." : "No transactions match your filters."}
        </p>
      ) : (
        <ul className="divide-y divide-gray-800">
          {filtered.map(t => (
            <li key={t.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-800 transition-colors">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-100">{t.description}</span>
                <span className="text-xs text-gray-500">{t.category} · {t.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-semibold ${t.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
                    {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                </span>
                <button
                    onClick={() => onEdit(t)}
                    className="text-gray-600 hover:text-indigo-400 text-xs transition-colors"
                >
                    Edit
                </button>
                <button
                    onClick={() => onRemove(t.id)}
                    className="text-gray-600 hover:text-red-400 text-xs transition-colors"
                >
                    Delete
                </button>
            </div>
            </li>
          ))}
        </ul>
      )}

      {transactions.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            Showing {filtered.length} of {transactions.length} transactions
          </p>
        </div>
      )}
    </div>
  )
}