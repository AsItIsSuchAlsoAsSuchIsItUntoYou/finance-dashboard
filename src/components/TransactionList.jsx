export default function TransactionList({ transactions, onRemove }) {
  if (transactions.length === 0) return (
    <p className="text-gray-500 text-sm text-center py-6">No transactions yet.</p>
  )

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      <h2 className="text-lg font-semibold text-white px-6 py-4 border-b border-gray-800">Transactions</h2>
      <ul className="divide-y divide-gray-800">
        {transactions.map(t => (
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
                onClick={() => onRemove(t.id)}
                className="text-gray-600 hover:text-red-400 text-xs transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}