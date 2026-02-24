import useTransactions from "../hooks/useTransactions"
import TransactionForm from "../components/TransactionForm"
import TransactionList from "../components/TransactionList"
import SummaryCards from "../components/SummaryCards"
import SpendingChart from "../components/SpendingChart"

export default function Dashboard() {
  const { transactions, add, remove } = useTransactions()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Finance Dashboard</h1>
      <SummaryCards transactions={transactions} />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <TransactionForm onAdd={add} />
        <SpendingChart transactions={transactions} />
      </div>
      <div className="mt-8">
        <TransactionList transactions={transactions} onRemove={remove} />
      </div>
    </div>
  )
}