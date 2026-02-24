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

  const [errors, setErrors] = useState({})

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null })
    }
  }

  function validate() {
    const newErrors = {}
    if (!form.description.trim()) newErrors.description = "Description is required"
    if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = "Please enter a valid amount"
    if (!form.date) newErrors.date = "Date is required"
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onAdd({ ...form, id: uuidv4(), amount: parseFloat(form.amount) })
    setForm({ ...form, description: "", amount: "" })
    setErrors({})
  }

  const inputClass = (field) =>
    `w-full bg-gray-800 border ${errors[field] ? "border-red-500" : "border-gray-700"} text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500`

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className={inputClass("description")} />
          {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
        </div>
        <div>
          <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} className={inputClass("amount")} />
          {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount}</p>}
        </div>
        <select name="category" value={form.category} onChange={handleChange} className={inputClass("category")}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select name="type" value={form.type} onChange={handleChange} className={inputClass("type")}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <div>
          <input name="date" type="date" value={form.date} onChange={handleChange} className={inputClass("date")} />
          {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors">
          Add Transaction
        </button>
      </form>
    </div>
  )
}