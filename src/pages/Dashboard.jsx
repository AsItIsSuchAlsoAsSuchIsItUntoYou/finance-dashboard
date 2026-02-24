import useTransactions from "../hooks/useTransactions"
import TransactionForm from "../components/TransactionForm"
import TransactionList from "../components/TransactionList"
import SummaryCards from "../components/SummaryCards"
import SpendingChart from "../components/SpendingChart"

export default function Dashboard() {
  const { transactions, add, remove } = useTransactions()

  return (
    <div>
      <h1>Finance Dashboard</h1>
      <SummaryCards transactions={transactions} />
      <TransactionForm onAdd={add} />
      <SpendingChart transactions={transactions} />
      <TransactionList transactions={transactions} onRemove={remove} />
    </div>
  )
}