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

export function deleteTransaction(id) {
  const transactions = getTransactions()
  const updated = transactions.filter(t => t.id !== id)
  saveTransactions(updated)
  return updated
}