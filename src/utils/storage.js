// Transaction shape:
// {
//   id: "uuid-string",
//   date: "2024-02-23",
//   amount: 45.00,
//   category: "Food",
//   description: "Groceries",
//   type: "expense" | "income"
// }

const STORAGE_KEY = "finance_transactions"

export function getTransactions() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveTransactions(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}

export function addTransaction(transaction) {
  const transactions = getTransactions()
  const updated = [transaction, ...transactions]
  saveTransactions(updated)
  return updated
}

export function editTransaction(updatedTransaction) {
  const transactions = getTransactions()
  const updated = transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
  saveTransactions(updated)
  return updated
}

export function deleteTransaction(id) {
  const transactions = getTransactions()
  const updated = transactions.filter(t => t.id !== id)
  saveTransactions(updated)
  return updated
}

export function exportToCSV(transactions) {
  const headers = ["Date", "Description", "Category", "Type", "Amount"]
  const rows = transactions.map(t => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.category,
    t.type,
    t.amount.toFixed(2)
  ])

  const csv = [headers, ...rows].map(row => row.join(",")).join("\n")
  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}