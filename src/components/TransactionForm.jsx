import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

const CATEGORIES = ["Food", "Rent", "Transport", "Entertainment", "Health", "Income", "Other"]

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().split("T")[0]
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.description || !form.amount) return
    onAdd({ ...form, id: uuidv4(), amount: parseFloat(form.amount) })
    setForm({ ...form, description: "", amount: "" })
  }

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className={inputClass} />
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} className={inputClass} />
        <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input name="date" type="date" value={form.date} onChange={handleChange} className={inputClass} />
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors">
          Add Transaction
        </button>
      </form>
    </div>
  )
}