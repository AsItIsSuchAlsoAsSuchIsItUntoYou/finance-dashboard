import { useState, useRef } from "react"
import useTransactions from "../hooks/useTransactions"
import TransactionForm from "../components/TransactionForm"
import TransactionList from "../components/TransactionList"
import SummaryCards from "../components/SummaryCards"
import SpendingChart from "../components/SpendingChart"
import MonthlyChart from "../components/MonthlyChart"

export default function Dashboard() {
  const { transactions, add, edit, remove } = useTransactions()
  const [editingTransaction, setEditingTransaction] = useState(null)
  const formRef = useRef(null)

  function handleEdit(transaction) {
    setEditingTransaction(transaction)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Finance Dashboard</h1>
      <SummaryCards transactions={transactions} />
      <div ref={formRef} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <TransactionForm
          onAdd={add}
          onEdit={(t) => { edit(t); setEditingTransaction(null) }}
          editingTransaction={editingTransaction}
          onCancelEdit={() => setEditingTransaction(null)}
        />
        <SpendingChart transactions={transactions} />
      </div>
      <div className="mt-6">
        <MonthlyChart transactions={transactions} />
      </div>
      <div className="mt-6">
        <TransactionList
          transactions={transactions}
          onRemove={remove}
          onEdit={handleEdit}
        />
      </div>
    </div>
  )
}