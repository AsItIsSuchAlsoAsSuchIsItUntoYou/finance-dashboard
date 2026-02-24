export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const net = income - expenses

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
        <p className="text-sm text-gray-400 mb-1">Income</p>
        <p className="text-2xl font-semibold text-emerald-400">${income.toFixed(2)}</p>
      </div>
      <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
        <p className="text-sm text-gray-400 mb-1">Expenses</p>
        <p className="text-2xl font-semibold text-red-400">${expenses.toFixed(2)}</p>
      </div>
      <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
        <p className="text-sm text-gray-400 mb-1">Net</p>
        <p className={`text-2xl font-semibold ${net >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          ${net.toFixed(2)}
        </p>
      </div>
    </div>
  )
}