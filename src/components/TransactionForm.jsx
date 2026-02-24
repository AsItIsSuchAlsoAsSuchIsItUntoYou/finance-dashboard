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
    onAdd({
      ...form,
      id: uuidv4(),
      amount: parseFloat(form.amount)
    })
    setForm({ ...form, description: "", amount: "" })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} />
      <select name="category" value={form.category} onChange={handleChange}>
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <button type="submit">Add Transaction</button>
    </form>
  )
}